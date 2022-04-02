<template>
  <canvas id="pixi"></canvas>
</template>

<script>
import * as PIXI from 'pixi.js'
import {Point, TextStyle} from "pixi.js";
import easing from "@/easing";
import {MotionBlurFilter} from "@pixi/filter-motion-blur";

export default {
  name: 'App',
  components: {},
  methods: {
    getAngle: function (originX, originY, targetX, targetY) {
      var dx = originX - targetX;
      var dy = originY - targetY;

      // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
      // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
      // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west

      // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
      // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
      // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west

      var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
      theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
      if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east
      //
      // var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
      // theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
      // if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east

      return theta;
    },
    rotateAngle: function (angle, rotation) {
      return (angle + rotation) % 360;
    },
    generateEven: function (minX, maxX, minY, maxY, minDistance, maxPoints, maxIterations) {
      let pointCount = 0;
      let iterations = 0;
      let points = [];

      // Generate a point until maximums satisifed
      while (pointCount < maxPoints && iterations < maxIterations) {
        iterations++;
        let newPoint = new Point(this.uniform(minX, maxX), this.uniform(minY, maxY));
        if (!points.some((otherPoint) => this.getDistance(newPoint, otherPoint) < minDistance)) {
          pointCount++;
          points.push(newPoint);
        }
      }

      return points;
    },
    getDistance: function (a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    },
    randomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min + 1) + min);
    },
    uniform: function (min, max) {
      return (Math.random() * (max - min)) + min;
    },
    randomChoice: function (array) {
      if (array.length < 1) return null;
      return array[this.randomNumber(0, array.length - 1)];
    },
    drawPixi: function () {
      var canvas = document.getElementById('pixi')

      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        backgroundColor: 0x171717,
        view: canvas,
      })

      // Constants
      const WIDTH = app.screen.width;
      const HEIGHT = app.screen.height;
      const LEFT = -WIDTH / 2;
      const RIGHT = WIDTH / 2;
      const TOP = -HEIGHT / 2;
      const BOTTOM = HEIGHT / 2;

      const commonPositions = {
        topLeft: new Point(-WIDTH / 2, HEIGHT / 2),
        topRight: new Point(WIDTH / 2, HEIGHT / 2),
        bottomLeft: new Point(-WIDTH / 2, -HEIGHT / 2),
        bottomRight: new Point(WIDTH / 2, -HEIGHT / 2),
        center: new Point(0, 0)
      }

      const emojiList = ["heart_with_arrow",
        "heart_with_ribbon",
        "heavy_heart_exclamation_mark_ornament",
        "revolving_hearts",
        "sparkles",
        "sparkling_heart"];

      // Load all textures into memory
      let textures = emojiList.map((emoji_name) => PIXI.Texture.from(require(`./assets/emojis/${emoji_name}.png`)));

      // Add a spawning buffer of 3% of the average of the app's width & height.
      let edgeBuffer = Math.round(0.03 * ((app.screen.width + app.screen.height) / 2));

      // Generate initial points
      let objects = [];
      let points = this.generateEven(
          -app.screen.width / 2 + edgeBuffer,
          app.screen.width / 2 - edgeBuffer,
          -app.screen.height / 2 + edgeBuffer,
          app.screen.height / 2 - edgeBuffer,
          50, 200, 10000)


      app.stage.x = app.screen.width / 2;
      app.stage.y = app.screen.height / 2;

      let setupByPoint = (point) => {
        // Select a random texture for a new sprite
        let sprite = new PIXI.Sprite(this.randomChoice(textures));

        // Place the sprite at the point
        sprite.anchor.set(0.5, 0.5);
        sprite.x = point.x;
        sprite.y = point.y;

        // Set scale
        // let distanceFromCenter = this.getDistance(commonPositions.center, point);
        // sprite.baselineScale = this.uniform(0.45, 0.65);
        sprite.baselineScale = this.uniform(0.03, 0.07)

        // Get angle to center
        // let angleToCenter = this.getAngle(point.x, point.y, 0, 0);
        let angleToCenter = this.getAngle(0, 0, point.x, point.y);
        angleToCenter *= Math.PI / 180;
        const velocityScale = 5;
        sprite.velocityX = Math.cos(angleToCenter) * velocityScale;
        sprite.velocityY = Math.sin(angleToCenter) * velocityScale * -1;
        sprite.totalTime = 0;
        // console.log(`${sprite.velocityX} ${sprite.velocityY}`)

        // Motion Blur
        // sprite.filters = [new MotionBlurFilter([1, 2], 3)]

        // Setup the sprite for rendering
        return sprite;
      }

      // Generate emoji objects
      points.forEach((point) => {
        let sprite = setupByPoint(point);
        objects.push(sprite);
        app.stage.addChild(sprite);
      })

      // Buffer the removal of items to 50px outside the canvas.
      const REMOVAL_BUFFER = 300;
      const easingFunction = easing.outCirc();
      const maxDistance = this.getDistance(commonPositions.topLeft, commonPositions.center);
      const MAX_BASELINE = 0.65;
      const BASE_SPRITECOUNT = Math.max(objects.length, 150);

      let specialStyle = new PIXI.TextStyle({ fill: "pink", stroke: "white", strokeThickness: 1});
      let centerText = new PIXI.Text("Love you forever, Cris.", specialStyle);
      centerText.anchor.set(0.5, 0.5);
      // app.stage.addChild(centerText);
      centerText.x = 0;

      // console.log(`${objects.length} sprites generated.`)
      app.ticker.add((delta) => {
        let index = 0;

        while (index < objects.length) {
          let sprite = objects[index];
          let distanceScale = this.getDistance(commonPositions.center, new Point(sprite.x, sprite.y)) / maxDistance;
          distanceScale = Math.max(1, distanceScale + 0.3);
          let easeValue = easingFunction(distanceScale);

          if (sprite.baselineScale < MAX_BASELINE)
            sprite.baselineScale = Math.min(MAX_BASELINE, sprite.baselineScale + (0.10 * delta * 0.09));

          sprite.x += sprite.velocityX * delta * easeValue;
          sprite.y += sprite.velocityY * delta * easeValue;

          let scale = sprite.baselineScale * Math.log(distanceScale + 1)
          sprite.scale.set(scale, scale);


          if (sprite.x + REMOVAL_BUFFER < LEFT || sprite.x - REMOVAL_BUFFER > RIGHT || sprite.y - REMOVAL_BUFFER > BOTTOM || sprite.y + REMOVAL_BUFFER < TOP) {
            objects.splice(index, 1);
            app.stage.removeChild(sprite);
          }

          index++;

          if (objects.length < BASE_SPRITECOUNT) {
            let newPoint = new Point(this.uniform(-WIDTH / 2, WIDTH / 2), this.uniform(-HEIGHT / 2, HEIGHT / 2));
            let newSprite = setupByPoint(newPoint);
            objects.push(newSprite);
            app.stage.addChild(newSprite);
            console.log(newSprite)
          }
        }
      });
    },
  },
  mounted() {
    this.drawPixi()
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #171717;
}

#pixi, #app {
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
