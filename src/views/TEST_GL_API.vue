<template>
  <div>
    <h2>测试图形api</h2>
    <div class="api-wrapper">
      <div>
        <span>箭头mesh</span>
        <input type="radio" v-model="arrowType" value="1" /> 单向
        <input type="radio" v-model="arrowType" value="2" /> 双向
        <button @click="handleDrawArrow">绘制箭头mesh</button>
      </div>
      <div>
        <span>矩形mesh</span>
        <button @click="handleDrawRect">绘制矩形mesh</button>
      </div>
      <div>清除 <button @click="handleClear">清除上下文</button></div>

      <div>
        <h3>视口操作</h3>
        <div>
          偏移： x：<input v-model="vpOffsetX" /> y：<input
            v-model="vpOffsetY"
          />
        </div>
        <div>
          缩放原点： x：<input v-model="vpOx" /> y：<input v-model="vpOy" />
        </div>
        <div>
          缩放比率(0.05-2)：<input v-model="vpScaleRatio" />
          <button @click="handleSetVp">设置视口</button>
        </div>
      </div>
    </div>
    <canvas id="canvas" width="600px" height="600px"></canvas>
  </div>
</template>

<script>
import { Engine } from "@/hhrender/index";
import { RectMesh, OneWayArrowMesh } from "@/hhrender/mesh";
import { Generator, ArrowGenerator } from "@/hhrender/generator";
import { getRandomColor } from "@/utils";
import { loadImages } from "@/hhrender/lib/utils";

const img1 = require("@/assets/1.jpg");
const img2 = require("@/assets/2.jpg");
const img3 = require("@/assets/3.jpg");
const img4 = require("@/assets/4.jpg");

export default {
  name: "xxx",
  components: {},
  data() {
    return {
      arrowType: 1,
      vpOffsetX: 0,
      vpOffsetY: 0,
      vpOx: 0,
      vpOy: 0,
      vpScaleRatio: 100,
    };
  },
  mounted() {
    this.initCtx();
  },
  methods: {
    initCtx() {
      const canvas = document.getElementById("canvas");
      let engine = new Engine(canvas);
      engine.isDebug = false;
      engine.sizeRatio = 1;
      let scr = engine.searcher;
      let tf = engine.textureFactroy;
      let vp = engine.viewport;
      let isDragging = false;
      let dragLastPoint = [];
      let activeShape;
      let uvlist = [];
      let objlist = [];

      vp.setBackgroundColor([186, 186, 186, 255]);
      window.vp = vp;
      window.engine = engine;

      let textures = [];

      console.log("engine", engine);

      loadImages([img1, img2, img3, img4]).then((images) => {
        textures = images.map((img) => {
          tf.createTexture(img, img.width, img.height);
        });

        window.textures = textures;

        this.initRender(engine, textures);
      });

      // canvas.addEventListener('mousewheel', wheelHandler);
      // canvas.addEventListener('mousedown', dragStart);
      // canvas.addEventListener('mousemove', drag);
      // canvas.addEventListener('click', clickHandler);
      // canvas.addEventListener('mousemove', move2Handler);
      // canvas.addEventListener('mouseup', dragEnd);
      // window.addEventListener('resize', windowResize);
    },

    initRender(engine, textures) {
      engine.render();
    },

    handleClear() {
      window.g && window.g.clear();
    },

    handleSetVp() {
      const translateX = +this.vpOffsetX;
      const translateY = +this.vpOffsetY;
      const scale = +this.vpScaleRatio;
      const originX = +this.vpOx;
      const originY = +this.vpOy;
      window["vp"].resetTranslationAndScale(
        translateX,
        translateY,
        scale,
        originX,
        originY
      );
      console.log(window["vp"]);
    },
    handleDrawArrow() {
      if (this.arrowType == 1) {
        this.drawOneWayArrow();
      } else {
        this.drawTwoWayArrow();
      }
    },
    handleDrawRect() {
      this.drawRects(window.engine, window.textures[0], 10, 0, 0, 600);
    },

    // 画矩形
    drawRects(engine, texture, countEach, offsetX, offsetY, areaWidth) {
      const rectMesh = new RectMesh();
      const g1 = new Generator(engine, rectMesh);
      window.g = g1;
      const count = countEach;
      const w = areaWidth / count;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          let c = getRandomColor();
          c[3] = 200;
          let obj = g1.instance();
          obj.searchable = false;
          obj.show();
          obj.translation = [i * w + w / 2 + offsetX, j * w + w / 2 + offsetY];
          obj.backgroundColor = c;
          obj.texture = texture;
          obj.size = [w, w];
          obj.rotation = Math.PI / 6;
          if (i % 3 == 0) {
            obj.borderWidth = 1;
            obj.borderDashed = 2;
            obj.borderColor = getRandomColor();
          }
        }
      }
    },

    drawOneWayArrow() {
      const arrowMesh = new OneWayArrowMesh(100, 100);
      const g = new Generator(window.engine, arrowMesh);
      window.g = g;
      const obj = g.instance().show();
      obj.translation = [100, 100];
      obj.vertexOffsetValue = [0, 100];
      obj.rotation = Math.PI / 4;
      obj.backgroundColor = getRandomColor();
      obj.searchable = true;
      obj.expandRadius = 20;
    },

    drawTwoWayArrow() {
      const g = new ArrowGenerator(window.engine, 100, 100, 10);
      window.g = g;
      const obj = g.instance();
      obj.fromTo = [100, 100, 300, 300];
      obj.type = 2;
      obj.show();
      obj.backgroundColor = getRandomColor();
      obj.borderWidth = 3;
      obj.borderDashed = 10;
      obj.borderColor = [0, 0, 0, 255];
      obj.searchable = true;
      obj.expandRadius = 20;
    },
  },
};
</script>

<style lang="scss" scoped>
.api-wrapper {
  margin-bottom: 20px;
}
</style>
