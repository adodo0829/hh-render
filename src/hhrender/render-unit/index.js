import {
  IdCreator,
  getVertexPosition,
  getVertexAfterExpand,
  DisplayStatus,
} from "../lib/utils";
import * as glMatrix from "../lib/gl-matrix.js";

const MAX_INSTANCE = 3000;
const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;

// 模型属性
export const VertexAttribute = {
  CURR_VERTEX_AND_RATIO: "currVertexAndRatio",
  NEXT_VERTEX_AND_RATIO: "nextVertexAndRatio",
  PREV_VERTEX_AND_RATIO: "prevVertexAndRatio",
  UV_AND_EDGE_OFFSET_RATIO: "uvAndEdgeOffsetRatio",
};
export var VertexAttributeStride = new Map();
VertexAttributeStride.set(VertexAttribute.CURR_VERTEX_AND_RATIO, 4);
VertexAttributeStride.set(VertexAttribute.NEXT_VERTEX_AND_RATIO, 4);
VertexAttributeStride.set(VertexAttribute.PREV_VERTEX_AND_RATIO, 4);
VertexAttributeStride.set(VertexAttribute.UV_AND_EDGE_OFFSET_RATIO, 4);

// 实例属性
export const RenderAttribute = {
  VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT:
    "vertexAndEdgeOffsetValueAndNotFollowViewport",
  BACKGROUND_COLOR: "backgroundColor",
  UV_RECT: "UVRect",
  TRANSLATION_AND_ROTATION: "translationAndRotation",
  IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE:
    "isTextAndBorderWidthAndDashedAndScale",
  TEXT_BORDER_COLOR: "textBorderColor",
  OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS:
    "opacityAndDisplayAndVpScaleAndVpTrans",
};
export var RenderAttributeStride = new Map();
RenderAttributeStride.set(
  RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
  4
);
RenderAttributeStride.set(RenderAttribute.BACKGROUND_COLOR, 4);
RenderAttributeStride.set(RenderAttribute.UV_RECT, 4);
RenderAttributeStride.set(RenderAttribute.TRANSLATION_AND_ROTATION, 4);
RenderAttributeStride.set(
  RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
  4
);
RenderAttributeStride.set(RenderAttribute.TEXT_BORDER_COLOR, 4);
RenderAttributeStride.set(
  RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
  4
);

export const RenderAttributeList = [
  RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
  RenderAttribute.BACKGROUND_COLOR,
  RenderAttribute.UV_RECT,
  RenderAttribute.TRANSLATION_AND_ROTATION,
  RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
  RenderAttribute.TEXT_BORDER_COLOR,
  RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
];

export const RenderUniform = {
  OPACITY: "uOpacity",
};
export const RenderUnformList = [RenderUniform.OPACITY];

export class RenderUnit {
  _engine; //: Engine;
  idmap; //: Map<string, number>;
  idlist; //: string[];
  _meshConfig; //: MeshConfig;
  vao;
  instanceCount = 0; //: number = 0;
  instanceCountMax = 0; //: number = 0;
  instanceCountInited = 0; //: number = 0;

  attribBuffers = new Map(); //: Map<RenderAttribute, WebGLBuffer> = new Map();
  attribBufferDatas = new Map(); //: Map<RenderAttribute, Float32Array> = new Map();
  attribIsModifieds = new Map(); //: Map<RenderAttribute, boolean> = new Map();
  attribLocals = new Map(); //: Map<RenderAttribute, any> = new Map();

  uniformLocals = new Map(); //: Map<RenderUniform, any> = new Map();
  uniformDatas = new Map(); //: Map<RenderUniform, Float32Array> = new Map();

  _display = DisplayStatus.DISPLAY;
  displayIsModified = false;

  constructor(engine, meshConfig, instanceCountMax = 0) {
    this._engine = engine;
    this._meshConfig = meshConfig;

    const gl = engine.gl;
    const prg = engine.prg;
    const icm = Math.floor(instanceCountMax);
    this.instanceCountMax = icm > 0 ? icm : MAX_INSTANCE;
    this.instanceCountInited = this.instanceCountMax; //缓存

    // 初始化
    RenderAttributeList.forEach((attrib) => {
      // 本体属性
      const data = new Float32Array(
        this.instanceCountMax * RenderAttributeStride.get(attrib)
      );
      this.attribBuffers.set(attrib, gl.createBuffer());
      this.attribBufferDatas.set(attrib, data);
      this.attribIsModifieds.set(attrib, true);
      this.attribLocals.set(attrib, gl.getAttribLocation(prg, attrib));
    });

    RenderUnformList.forEach((uniform) => {
      this.uniformLocals.set(uniform, gl.getUniformLocation(prg, uniform));
      this.uniformDatas.set(uniform, new Float32Array(4));
    });

    // 默认数据
    this.uniformDatas.set(
      RenderUniform.OPACITY,
      new Float32Array([1, 0, 0, 0])
    );

    this.idmap = new Map();
    this.idlist = [];
  }

  // 初始化一个 VAO，配置它的顶点属性和索引数据，然后将 VAO 解绑，以便在需要的时候可以重新绑定并绘制。
  // 这种设置通常在渲染循环之外完成，因为 VAO 的配置是一个相对昂贵的操作，不应该在每次绘制时都执行。
  // 通过预先配置 VAO，可以在渲染时快速切换和绘制不同的对象，从而提高渲染效率。
  regist() {
    const gl = this._engine.gl;
    const config = this._meshConfig;

    const currVs = config.currVertexes;
    const prevVs = config.prevVertexes;
    const nextVs = config.nextVertexes;
    const currRt = config.currOffsetRatios;
    const prevRt = config.prevOffsetRatios;
    const nextRt = config.nextOffsetRatios;
    const vlen = currVs.length / 2;

    const v1 = [];
    const v2 = [];
    const v3 = [];
    const v4 = [];

    const uvc = config.uvs;
    const eor = config.edgeOffsetRatios;

    for (let i = 0; i < vlen; i++) {
      v1.push(
        currVs[i * 2],
        currVs[i * 2 + 1],
        currRt[i * 2],
        currRt[i * 2 + 1]
      );
      v2.push(
        prevVs[i * 2],
        prevVs[i * 2 + 1],
        prevRt[i * 2],
        prevRt[i * 2 + 1]
      );
      v3.push(
        nextVs[i * 2],
        nextVs[i * 2 + 1],
        nextRt[i * 2],
        nextRt[i * 2 + 1]
      );
      v4.push(uvc[i * 2], uvc[i * 2 + 1], eor[i], 0);
    }
    /**
     * 顶点数组对象 Vertex Array Objects:
     * 负责记录 bindBuffer 和 vertexAttribPointer 的调用状态
     * VAO主要是将一个绘制物体的各种顶点缓冲对象（VBO)包装一个整体。顶点缓冲可以有顶点坐标，纹理坐标等。
     * 优点就在于能提高开发效率，它将所有顶点绘制过程中的这些顶点的设置和绑定过程集中存储在一起，当我们需要时，只需要使用相应的VAO即可。
     * VAO的这种方式有点像一个中介，把所有繁琐的绑定和顶点设置工作都集中起来处理，我们需要绘制时，直接找这个中介就好
     */
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.registAttribute(
      VertexAttribute.CURR_VERTEX_AND_RATIO,
      new Float32Array(v1)
    );
    this.registAttribute(
      VertexAttribute.PREV_VERTEX_AND_RATIO,
      new Float32Array(v2)
    );
    this.registAttribute(
      VertexAttribute.NEXT_VERTEX_AND_RATIO,
      new Float32Array(v3)
    );
    this.registAttribute(
      VertexAttribute.UV_AND_EDGE_OFFSET_RATIO,
      new Float32Array(v4)
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint32Array(this._meshConfig.indeces),
      gl.STATIC_DRAW
    );

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return this;
  }
  // 确保只有当数据发生变化时，才将其上传到 GPU，这样可以减少不必要的 GPU 内存操作，提高渲染效率。
  // updateBufferToGL 方法负责将数据绑定到相应的缓冲对象，并调用 WebGL 的 bufferData 或 bufferSubData 方法将数据上传到 GPU。
  updateToGL() {
    const gl = this._engine.gl;
    let result = this.displayIsModified;
    gl.bindVertexArray(this.vao);
    RenderAttributeList.forEach((attrib) => {
      if (this.attribIsModifieds.get(attrib) === true) {
        this.updateBufferToGL(
          attrib,
          this.attribBuffers.get(attrib),
          this.attribBufferDatas.get(attrib),
          RenderAttributeStride.get(attrib)
        );
        this.attribIsModifieds.set(attrib, false);
        result = true;
      }
    });
    this.displayIsModified = false;
    return result;
  }

  updateUniform() {
    const gl = this.engine.gl;
    RenderUnformList.forEach((uniform) => {
      gl.uniform4fv(
        this.uniformLocals.get(uniform),
        this.uniformDatas.get(uniform)
      );
    });
  }

  setAttribute(id, attrib, value, offset = 0) {
    if (!id || id == "") return;
    const idx = this.idmap.get(id);
    const stride = RenderAttributeStride.get(attrib);
    let bufferData;
    bufferData = this.attribBufferDatas.get(attrib);
    this.attribIsModifieds.set(attrib, true);
    bufferData.set(value.slice(0, stride - offset), idx * stride + offset);
  }

  getAttribute(id, attrib, offset = 0, length = 0) {
    const idx = this.idmap.get(id);
    const stride = RenderAttributeStride.get(attrib);
    let bufferData;

    bufferData = this.attribBufferDatas.get(attrib);
    this.attribIsModifieds.set(attrib, true);

    const start = idx * stride + offset;
    let end;
    if (length > 0) {
      end = Math.min(start + length, (idx + 1) * stride);
    } else {
      end = (idx + 1) * stride;
    }
    return Array.from(bufferData.subarray(start, end));
  }

  add() {
    // 如果超过了最大实例限制，则扩展
    if (this.instanceCount == this.instanceCountMax) {
      this.grow();
    }

    const id = this.createId();
    const idx = this.instanceCount;
    this.idmap.set(id, idx);
    this.idlist[idx] = id;
    this.instanceCount++;

    RenderAttributeList.forEach((attrib) =>
      this.attribIsModifieds.set(attrib, true)
    );

    return id;
  }

  remove(id) {
    const idx = this.idmap.get(id);
    const t = this.instanceCount;

    if (t < 1 || idx < 0 || idx >= t) {
      return;
    }
    RenderAttributeList.forEach((attrib) => {
      this.removeAttributeBufferData(id, attrib);
      this.attribIsModifieds.set(attrib, true);
    });

    const lastId = this.idlist[this.instanceCount - 1];
    this.idmap.set(lastId, idx);
    this.idlist[idx] = lastId;

    this.idmap.delete(id);
    this.idlist.pop();

    this.instanceCount--;
  }

  clear() {
    if (this.instanceCountMax > this.instanceCountInited) {
      const k = this.instanceCountMax / this.instanceCountInited;
      RenderAttributeList.forEach((attrib) => {
        const len = this.attribBufferDatas.get(attrib).length;
        this.attribBufferDatas.set(attrib, new Float32Array(len / k));
      });
      this.instanceCountMax = this.instanceCountInited;
    } else {
      this.attribBufferDatas.forEach((v) => v.fill(0));
    }
    this.attribIsModifieds.forEach((v, k) =>
      this.attribIsModifieds.set(k, true)
    );
    this.idmap.clear();
    this.idlist = [];
    this.instanceCount = 0;
  }

  fill(attrib, value) {
    this.attribBufferDatas.get(attrib).fill(value);
    this.attribIsModifieds.set(attrib, true);
  }

  /**
   * 批量set
   * @param id
   * @param attrib
   * @param value
   * @param offset
   */
  batchSet(attrib, value, offset = 0) {
    const stride = RenderAttributeStride.get(attrib);

    if (stride <= offset) {
      return;
    }

    const buffer = this.attribBufferDatas.get(attrib);
    const len = this.instanceCount;
    const v = value.slice(0, stride - offset);
    let o = offset;
    for (let i = 0; i < len; i++) {
      buffer.set(v, o);
      o += stride;
    }

    this.attribIsModifieds.set(attrib, true);
  }

  /**
   * 批量在原来的值上叠加
   * @param attrib
   * @param value
   * @param offset
   */
  batchAdd(attrib, value, offset = 0) {
    const stride = RenderAttributeStride.get(attrib);

    if (stride <= offset) {
      return;
    }

    const buffer = this.attribBufferDatas.get(attrib);
    const len = this.instanceCount;
    const v = value.slice(0, stride - offset);
    const vl = v.length;
    let o = offset;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < vl; j++) {
        buffer[o + j] += v[j];
      }
      o += stride;
    }

    this.attribIsModifieds.set(attrib, true);
  }

  destroy() {
    this.attribBuffers.clear();
    this.attribBufferDatas.clear();
    this.attribIsModifieds.clear();
    this.idmap.clear();
    this.idlist = [];
    this.instanceCount = 0;
    this.vao = null;
  }

  draw() {
    const gl = this._engine.gl;
    const oc = this._meshConfig;
    gl.bindVertexArray(this.vao);
    gl.drawElementsInstanced(
      oc.primitiveMode,
      oc.indeces.length,
      gl.UNSIGNED_INT,
      0,
      this.instanceCount
    );
  }

  set display(n) {
    this._display = n;
  }

  get display() {
    return this._display;
  }

  set opacity(n) {
    // const o = numberClamp(0, 1, n);
    const o = Math.max(0, n);
    const data = this.uniformDatas.get(RenderUniform.OPACITY);
    data.set([o], 0);
    this.displayIsModified = true;
  }

  get opacity() {
    return this.uniformDatas.get(RenderUniform.OPACITY)[0];
  }

  get engine() {
    return this._engine;
  }

  /**
   * 按ID获取实例的膨胀后真实顶点位置
   * @param id 实例id
   * @param expand 膨胀
   */
  getVertexesPositionById(id, expand = 0) {
    // 顶点
    let cv = this._meshConfig.currVertexes;
    // 形变系数
    const co = this._meshConfig.currOffsetRatios;
    // 形变值
    const cov = this.getAttribute(
      id,
      RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
      0,
      2
    );
    // 偏移
    const trans = this.getAttribute(
      id,
      RenderAttribute.TRANSLATION_AND_ROTATION,
      0,
      2
    );
    // 旋转
    const rot = this.getAttribute(
      id,
      RenderAttribute.TRANSLATION_AND_ROTATION,
      2,
      1
    )[0];
    // 顶点数量
    const len = cv.length / 2;

    let mat = mat4.create();
    mat4.fromZRotation(mat, -rot);

    let vertexes = [];
    for (let i = 0; i < len; i++) {
      const vs = vec3.fromValues(cv[i * 2], cv[i * 2 + 1], 0);
      const ratio = vec3.fromValues(co[i * 2], co[i * 2 + 1], 0);
      // 顶点形变后的坐标
      let vertex = getVertexPosition(
        vs,
        ratio,
        vec3.fromValues(cov[0], cov[1], 0)
      );
      vertexes.push(vertex);
    }

    const result = [];

    for (let j = 0; j < len; j++) {
      let pidx = j == 0 ? len - 1 : j - 1;
      let nidx = j == len - 1 ? 0 : j + 1;
      const pv = vertexes[pidx];
      const cv = vertexes[j];
      const nv = vertexes[nidx];
      // 前后边向量
      const pc = pv.map((v, k) => v - cv[k]);
      const nc = nv.map((v, k) => v - cv[k]);
      // 膨胀后的坐标
      let rv = getVertexAfterExpand(pc, nc, cv, expand);
      // 旋转
      vec3.transformMat4(rv, rv, mat);
      // 偏移
      vec3.add(rv, rv, vec3.fromValues(trans[0], trans[1], 0));
      result.push(rv[0], rv[1]);
    }

    return result;
  }

  createId() {
    return IdCreator.createId();
  }

  registAttribute(attrib, bufferData) {
    const gl = this.engine.gl;
    const prg = this.engine.prg;
    const buffer = gl.createBuffer();
    const stride = VertexAttributeStride.get(attrib);
    const local = gl.getAttribLocation(prg, attrib);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(local, stride, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(local);
  }

  updateBufferToGL(attrib, buffer, bufferData, size, offset = 0) {
    const gl = this._engine.gl;
    const prg = this._engine.prg;
    const FSIZE = bufferData.BYTES_PER_ELEMENT;
    const local = this.attribLocals.get(attrib);
    const t = this.instanceCount;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.DYNAMIC_DRAW, 0, t * size);

    gl.enableVertexAttribArray(local);
    gl.vertexAttribPointer(
      local,
      size,
      gl.FLOAT,
      false,
      size * FSIZE,
      offset * FSIZE
    );
    gl.vertexAttribDivisor(local, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  removeAttributeBufferData(id, attrib) {
    const idx = this.idmap.get(id);
    const bufferData = this.attribBufferDatas.get(attrib);
    const stride = RenderAttributeStride.get(attrib);
    const n = Math.max(1, this.instanceCount - 1);
    const arr = new Array(stride);
    arr.fill(0);
    bufferData.set(
      bufferData.slice(n * stride, (n + 1) * stride),
      idx * stride
    );
    bufferData.set(arr, n * stride);
  }

  grow() {
    RenderAttributeList.forEach((attrib) => {
      let buffer = this.attribBufferDatas.get(attrib);
      let newBuffer = new Float32Array(buffer.length * 2);
      newBuffer.set(buffer);
      this.attribBufferDatas.set(attrib, newBuffer);
      buffer = null;
    });
    this.instanceCountMax *= 2;
  }
}
