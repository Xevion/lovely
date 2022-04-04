<template>
  <canvas id="pixi"></canvas>
</template>

<script>
import * as PIXI from 'pixi.js'
import Manager from "@/manage";

export default {
  name: 'App',
  components: {},
  methods: {
    drawPixi: function () {
      const canvas = document.getElementById('pixi')
      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        backgroundColor: 0x171717,
        view: canvas,
      })

      app.stage.x = app.screen.width / 2;
      app.stage.y = app.screen.height / 2;

      /**
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

        // Setup the sprite for rendering
        return sprite;
      }
       */

          // Buffer the removal of items to 50px outside the canvas.
      let specialStyle = new PIXI.TextStyle({fill: "pink", stroke: "white", strokeThickness: 1});
      let centerText = new PIXI.Text("Love you forever, Cris.", specialStyle);
      centerText.anchor.set(0.5, 0.5);
      // app.stage.addChild(centerText);
      centerText.x = 0;

      const manager = new Manager(app, 8);
      app.ticker.add(manager.tick);
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
