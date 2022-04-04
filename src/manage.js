import * as PIXI from 'pixi.js'
import {Point} from "pixi.js";
import easing from "@/easing";
import util from "@/util";
import {MotionBlurFilter} from "@pixi/filter-motion-blur";
import random from "@/random";

class Manager {
    REMOVAL_BUFFER = 100 // The buffer zone for sprite removal to prevent sprites from being deleted before they are entirely out of view.
    MAX_BASELINE_SCALE = 0.65; // Maximum scaling constant for sprites.
    MAX_SPRITE_COUNT = 200; // The maximum number of sprites that should be rendered at once.
    EASING_FUNCTION = easing.outQuint(); // The easing function that controls movement & scaling easing.
    MOTION_BLUR_KERNEL_SIZE = 3; // Controls motion blur quality.
    MOTION_BLUR_SCALE = 8; // The maximum scale motion blur can be in either X or Y.
    VELOCITY_SCALE = 7;
    EDGE_BUFFER = 0.15;
    MIN_RADIUS = 30;

    constructor(app, sectionCount) {
        this.app = app;

        this.sectionCount = sectionCount;
        // A list of containers with separate sections of items relegated by their angle.
        this.sections = util.generateSections(sectionCount).map((sectionData) => {
            const container = new PIXI.Container();
            let blurX = sectionData.velocityPoint.x * this.MOTION_BLUR_SCALE,
                blurY = sectionData.velocityPoint.y * this.MOTION_BLUR_SCALE;
            container.filters = [new MotionBlurFilter([blurX, blurY], this.MOTION_BLUR_KERNEL_SIZE)]
            app.stage.addChild(container);
            return container;
        });

        this.sectionSprites = Array.from(Array(sectionCount), () => new Array(0))

        // Section Constants
        this.BASE_ANGLE_DEG = 360 / this.sectionCount;
        this.BASE_ANGLE_RAD = (Math.PI * 2) / this.sectionCount;

        // Geometric Constants
        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;
        this.LEFT = -this.WIDTH / 2;
        this.RIGHT = this.WIDTH / 2;
        this.TOP = -this.HEIGHT / 2;
        this.BOTTOM = this.HEIGHT / 2;

        // Position Constants
        this.POSITIONS = {
            topLeft: new Point(-this.WIDTH / 2, this.HEIGHT / 2),
            topRight: new Point(this.WIDTH / 2, this.HEIGHT / 2),
            bottomLeft: new Point(-this.WIDTH / 2, -this.HEIGHT / 2),
            bottomRight: new Point(this.WIDTH / 2, -this.HEIGHT / 2),
            center: new Point(0, 0)
        }

        // A list of texture names for the emojis to be used.
        this.emojiList = ["heart_with_arrow",
            "heart_with_ribbon",
            "heavy_heart_exclamation_mark_ornament",
            "revolving_hearts",
            "sparkles",
            "sparkling_heart"];

        // Load all textures into memory
        this.textures = this.emojiList.map(
            (emoji_name) => PIXI.Texture.from(require(`./assets/emojis/${emoji_name}.png`))
        );

        // Buffer size constants
        this.BUFFER_LEFT = this.LEFT - this.REMOVAL_BUFFER;
        this.BUFFER_RIGHT = this.RIGHT + this.REMOVAL_BUFFER;
        this.BUFFER_TOP = this.TOP - this.REMOVAL_BUFFER;
        this.BUFFER_BOTTOM = this.BOTTOM + this.REMOVAL_BUFFER;

        this.MAX_DISTANCE = util.getDistance(this.POSITIONS.topLeft, this.POSITIONS.center);
        this.total_sprites = 0;

        // Generation Constants
        this.MAX_RADIUS = Math.min(this.app.screen.width, this.app.screen.height) * (1 - this.EDGE_BUFFER);
    }

    /**
     * Generate a new point and automatically add it to the container.
     */
    generatePoint() {
        // Generation initial data on the point
        let point = random.pointInCircle(new Point(0, 0), this.MIN_RADIUS, this.MAX_RADIUS);
        let sprite = new PIXI.Sprite(random.choice(this.textures));

        // Place the sprite at the point
        sprite.anchor.set(0.5, 0.5);
        sprite.x = point.x;
        sprite.y = point.y;

        // Set scale
        // let distanceFromCenter = this.getDistance(commonPositions.center, point);
        // sprite.baselineScale = this.uniform(0.45, 0.65);
        sprite.baselineScale = random.uniform(0.05, 0.12)
        sprite.scale.set(0, 0)

        // Get the correct section & velocity for the sprite
        const angleFromCenter = util.getAngle(0, 0, point.x, point.y) * Math.PI / 180;
        const sectionIndex = Math.floor(angleFromCenter / this.BASE_ANGLE_RAD);
        const velocity = this.VELOCITY_SCALE * random.uniform(0.8, 1.2);
        sprite.velocityX = Math.cos(angleFromCenter) * velocity;
        sprite.velocityY = Math.sin(angleFromCenter) * velocity * -1;

        // console.log({sprite.velocityX})
        // console.log({sprite.velocityX, sprite.velocityY})

        // Add it to the section & section list
        this.sections[sectionIndex].addChild(sprite);
        this.sectionSprites[sectionIndex].push(sprite);
        this.total_sprites++;

        return sprite;
    }

    /*
        Return true if the Sprite is outside the boundaries of the Canvas (plus whatever buffer is specified).
     */
    outside(sprite) {
        return sprite.x < this.BUFFER_LEFT ||
            sprite.x > this.BUFFER_RIGHT ||
            sprite.y > this.BUFFER_BOTTOM ||
            sprite.y < this.BUFFER_TOP;
    }

    /**
     * Ticking function for Manager object.
     * @param delta The time (in seconds) that passed between now and the last tick() call.
     */
    tick = (delta) => {
        // Iterate through each section
        for (const [sectionIndex, section] of this.sections.entries()) {
            // Iterate through all sprites moving in that section
            for (const [spriteIndex, sprite] of this.sectionSprites[sectionIndex].entries()) {
                let distanceScale = util.getDistanceSimple(0, 0, sprite.x, sprite.y) / this.MAX_DISTANCE;

                // distanceScale = Math.max(1, distanceScale + 0.3);
                let easeValue = this.EASING_FUNCTION(distanceScale);

                if (sprite.baselineScale < this.MAX_BASELINE_SCALE)
                    sprite.baselineScale = Math.min(this.MAX_BASELINE_SCALE, sprite.baselineScale + (0.1 * delta * 0.25));

                let scale = sprite.baselineScale * Math.log(distanceScale + 1)
                sprite.scale.set(scale, scale);

                sprite.x += sprite.velocityX * delta * easeValue;
                sprite.y += sprite.velocityY * delta * easeValue;

                // Remove sprites outside view
                if (this.outside(sprite)) {
                    this.sectionSprites[sectionIndex].splice(spriteIndex, 1);
                    section.removeChild(sprite);
                    this.total_sprites--;
                    sprite.destroy();
                }
            }
        }

        // Generate one sprite on each tick if needed.
        if (this.total_sprites < this.MAX_SPRITE_COUNT) {
            this.generatePoint();
        }
    }
}

export default Manager;