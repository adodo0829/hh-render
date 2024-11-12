import { vertexString, fragmentString } from "./config";
import { Searcher } from "../searcher";
import { TextureFactroy } from "../texture";
import { Viewport } from "../viewport";
import * as glMatrix from "../lib/gl-matrix.js";
import { DisplayStatus } from "../lib/utils";

glMatrix.glMatrix.setMatrixArrayType(Float32Array);

export class Engine {
  _gl;
  _prg;
  _searcher;
  _tf; //TextureFactroy;
  _vp; //Viewport;
  _unitList; // PaintUnitInterface[][];
  _vpScaleLocal;
  _vpTranslationLocal;
  _vecLocal;
  _vpRotationLocal;
  _sizeRatio = 1;
  isDebug = true;
  canRending = true;

  constructor(canvasDom) {
    this._gl = canvasDom.getContext("webgl2", {
      alpha: false,
      premultiplyAlpha: false, //关闭al
      antialias: true,
    });
    if (!this._gl) {
      throw Error(`not support WebGL2`);
    }
    this._unitList = [];
    this._searcher = new Searcher();
    this._tf = new TextureFactroy(this._gl);
    this._vp = new Viewport(this);
    this.initPrg();
    window["unitlist"] = this._unitList;
  }

  get gl() {
    return this._gl;
  }
  get prg() {
    return this._prg;
  }
  get searcher() {
    return this._searcher;
  }
  get textureFactroy() {
    return this._tf;
  }
  get viewport() {
    return this._vp;
  }
  get sizeRatio() {
    return this._sizeRatio;
  }
  set sizeRatio(ratio) {
    this._sizeRatio = ratio;
    this._vp.vpScaleIsModified = true;
  }

  // 初始化gl程序
  initPrg() {
    let gl = this.gl;
    const vxShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexString);
    const fgShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentString);
    this._prg = gl.createProgram();
    gl.attachShader(this._prg, vxShader);
    gl.attachShader(this._prg, fgShader);
    gl.linkProgram(this._prg);

    if (!gl.getProgramParameter(this._prg, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }
    gl.useProgram(this._prg);
    // 打开透明度混合
    gl.enable(gl.BLEND);
    // 绘制半透明对象
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_DST_COLOR
    );
    // gl.enable(gl.DEPTH_TEST);

    // 获取视口相关变量
    // uniform 变量通常在渲染循环中被更新，以反映场景的变化，比如摄像机移动、旋转或缩放，或者对象的变换
    this._vpScaleLocal = gl.getUniformLocation(this._prg, "uViewportScale");
    this._vpTranslationLocal = gl.getUniformLocation(
      this._prg,
      "uViewportTranslation"
    );
    this._vpRotationLocal = gl.getUniformLocation(
      this._prg,
      "uViewportRotation"
    );
    this._vecLocal = gl.getUniformLocation(this._prg, "uConversionVec2");
  }
  // 加载着色器代码
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // 循环渲染
  render() {
    if (!this.canRending) return;
    this.draw();
    window.requestAnimationFrame(() => this.render());
  }

  // 图形绘制
  draw(indexlist = null, isForce = false) {
    const gl = this.gl;
    const r1 = this.updateViewport();
    const r2 = this.updateConversionVec();
    let r3 = false;
    let ul = []; //PaintUnitInterface[][] = [];

    // 所有的渲染单元
    const unitlist = this._unitList;
    // 需要更新的
    if (indexlist && indexlist.length > 0) {
      ul = indexlist.map((i) => unitlist[i]);
    } else {
      ul = unitlist;
    }

    ul.forEach((units) => {
      units.forEach((unit) => {
        if (unit.updateToGL()) {
          r3 = true;
        }
      });
    });

    if (isForce || r1 || r2 || r3) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      ul.forEach((units) => {
        units
          .filter((u) => u.display == DisplayStatus.DISPLAY)
          .forEach((u) => {
            u.updateUniform();
            u.draw();
          });
      });
    }
  }

  updateViewport() {
    const gl = this.gl;
    let result = false;
    if (this._vp.vpScaleIsModified) {
      gl.uniform2fv(
        this._vpScaleLocal,
        this._vp.vpScaleVec2.map((s) => s * this._sizeRatio)
      );
      this._vp.vpScaleIsModified = false;
      result = true;
    }
    if (this._vp.vpTranslationIsModified) {
      gl.uniform2fv(this._vpTranslationLocal, this._vp.vpTranslationVec2);
      this._vp.vpTranslationIsModified = false;
      result = true;
    }
    if (this._vp.vpRotationIsModified) {
      gl.uniform1f(this._vpRotationLocal, this._vp.vpRotation);
      this._vp.vpRotationIsModified = false;
      result = true;
    }
    return result;
  }
  // 更新坐标变换矢量
  updateConversionVec() {
    if (this._vp.cvMatIsModified) {
      const gl = this.gl;
      gl.uniform2fv(this._vecLocal, this._vp.cvec2);
      this._vp.cvMatIsModified = false;
      return true;
    }
    return false;
  }

  registVAO(unit, index = 0) {
    if (!this._unitList[index]) {
      this._unitList[index] = [];
    }
    this._unitList[index].push(unit);
    return unit;
  }

  unRegistVAO(unit, index = 0) {
    if (index >= this._unitList.length) return;
    const idx = this._unitList[index].indexOf(unit);
    if (idx < 0) return;
    this._unitList[index].splice(idx, 1);
  }
}
