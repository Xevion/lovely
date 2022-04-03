import * as PIXI from 'pixi.js'
import {Point} from "pixi.js";

class Manager {
    REMOVAL_BUFFER = 100 // The buffer zone for sprite removal to prevent sprites from being deleted before they are entirely out of view.
    MAX_BASELINE_SCALE = 0.65; // Maximum scaling constant for sprites.
    MAX_SPRITE_COUNT = 200; // The maximum number of sprites that should be rendered at once.

    constructor(app, sections) {
        this.app = app;

        // A list of containers with separate sections of items relegated by their angle.
        this.sections = Array(sections).map(() => {
            new PIXI.Container()
        });
        this.sectionSprites = Array(sections).map(() => {
            Array()
        });

        // Geometric Constants
        this.WIDTH = app.screen.width;
        this.HEIGHT = app.screen.height;
        this.LEFT = -this.WIDTH / 2;
        this.RIGHT = this.WIDTH / 2;
        this.TOP = -this.HEIGHT / 2;
        this.BOTTOM = this.HEIGHT / 2;

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

        // Removal Buffer Constants
        this.BUFFER_LEFT = this.LEFT - this.REMOVAL_BUFFER;
        this.BUFFER_RIGHT = this.RIGHT + this.REMOVAL_BUFFER;
        this.BUFFER_TOP = this.TOP - this.REMOVAL_BUFFER;
        this.BUFFER_BOTTOM = this.BOTTOM + this.REMOVAL_BUFFER;
    }

    /**
     * Generate a new point and automatically add it to the container.
     */
    generatePoint() {
    }

    /**
     * Removes a sprite from the app.
     * @param sprite
     * @param section
     */
    removeSprite(sprite, section = null) {

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

    tick(delta) {

        let index = 0;

        // Iterate through each section
        for (const [sectionIndex, section] of this.sections.entries()) {
            // Iterate through all sprites moving in that section
            for (const [spriteIndex, sprite] of this.sectionSprites[sectionIndex].entries()) {
                let distanceScale = this.getDistance(commonPositions.center, new Point(sprite.x, sprite.y)) / maxDistance;
                // distanceScale = Math.max(1, distanceScale + 0.3);
                let easeValue = easingFunction(distanceScale);

                if (sprite.baselineScale < MAX_BASELINE)
                    sprite.baselineScale = Math.min(MAX_BASELINE, sprite.baselineScale + (0.1 * delta * 0.25));
                let scale = sprite.baselineScale * Math.log(distanceScale + 1)
                sprite.scale.set(scale, scale);

                sprite.x += sprite.velocityX * delta * easeValue;
                sprite.y += sprite.velocityY * delta * easeValue;

                // Remove sprites outside view
                if (this.outside(sprite)) {
                    this.sectionSprites[sectionIndex].splice(index, 1);
                    section.removeChild(sprite);
                }
            }
        }

        while (index < objects.length) {
            let sprite = objects[index];

            index++;

            if (objects.length < BASE_SPRITECOUNT) {
                let newPoint = new Point(this.uniform(-WIDTH / 2, WIDTH / 2), this.uniform(-HEIGHT / 2, HEIGHT / 2));
                let newSprite = setupByPoint(newPoint);
                objects.push(newSprite);
                app.stage.addChild(newSprite);
                console.log(newSprite)
            }
        }
    }
}

export default Manager;