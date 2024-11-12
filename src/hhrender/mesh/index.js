// import * as glMatrix from "../lib/gl-matrix.js";

export const PrimitiveMode = {
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
};

// interface MeshConfig {
// 	currVertexes: number[];
// 	prevVertexes: number[];
// 	nextVertexes: number[];
// 	currOffsetRatios: number[];
// 	prevOffsetRatios: number[];
// 	nextOffsetRatios: number[];
// 	edgeOffsetRatios: number[];
// 	indeces: number[];
// 	uvs: number[];
// 	primitiveMode: PrimitiveMode;
// }

// 基础网格类
// 顶点数据，材质数据

export class Mesh {
  _vertexes;
  _offsetRatios;
  _uv;
  _indeces;
  _primitiveMode;
  /**
   * 模型构造函数
   * @param vertexes 顶点坐标
   * @param borderVertexes 边框顶点坐标
   * @param uv 材质UV
   */
  constructor(mode, vertexes, offsetRatios, uv, indeces) {
    this._vertexes = vertexes;
    this._offsetRatios = offsetRatios;
    this._uv = uv;
    this._indeces = indeces;
    this._primitiveMode = mode;
  }

  get currVertexes() {
    return this._vertexes;
  }

  get prevVertexes() {
    let vs = this._vertexes;
    return vs.slice(-2).concat(vs.slice(0, vs.length - 2));
  }

  get nextVertexes() {
    let vs = this._vertexes;
    return vs.slice(2).concat(vs.slice(0, 2));
  }

  get currOffsetRatios() {
    return this._offsetRatios;
  }

  get prevOffsetRatios() {
    let vs = this._offsetRatios;
    return vs.slice(-2).concat(vs.slice(0, vs.length - 2));
  }

  get nextOffsetRatios() {
    let vs = this._offsetRatios;
    return vs.slice(2).concat(vs.slice(0, 2));
  }

  get originMeshConfig() {
    let edgeOffsetRatios = new Array(this._vertexes.length);
    edgeOffsetRatios.fill(0);
    return {
      currVertexes: this.currVertexes,
      prevVertexes: this.prevVertexes,
      nextVertexes: this.nextVertexes,
      currOffsetRatios: this.currOffsetRatios,
      prevOffsetRatios: this.prevOffsetRatios,
      nextOffsetRatios: this.nextOffsetRatios,
      edgeOffsetRatios: edgeOffsetRatios,
      indeces: this._indeces,
      uvs: this._uv,
      primitiveMode: this._primitiveMode,
    };
  }

  get borderMeshConfig() {
    let len = this.currVertexes.length;
    let cvs = this.currVertexes,
      pvs = this.prevVertexes,
      nvs = this.nextVertexes,
      cvo = this.currOffsetRatios,
      pvo = this.prevOffsetRatios,
      nvo = this.nextOffsetRatios,
      uvs = new Array(len * 2),
      indeces = new Array();

    uvs.fill(0);

    let arr1 = new Array(len / 2);
    arr1.fill(0);
    let arr2 = new Array(len / 2);
    arr2.fill(1);
    let ero = arr1.concat(arr2);

    len /= 2;

    for (let i = 0; i < len; i++) {
      indeces[i * 2] = i;
      indeces[i * 2 + 1] = len + i;
    }
    indeces.push(indeces[0], indeces[1]);

    // 双倍顶点
    cvs = cvs.concat(cvs);
    pvs = pvs.concat(pvs);
    nvs = nvs.concat(nvs);
    cvo = cvo.concat(cvo);
    pvo = pvo.concat(pvo);
    nvo = nvo.concat(nvo);

    return {
      currVertexes: cvs,
      prevVertexes: pvs,
      nextVertexes: nvs,
      currOffsetRatios: cvo,
      prevOffsetRatios: pvo,
      nextOffsetRatios: nvo,
      edgeOffsetRatios: ero,
      indeces: indeces,
      uvs: uvs,
      primitiveMode: PrimitiveMode.TRIANGLE_STRIP,
    };
  }
}

// 矩形网格
export class RectMesh extends Mesh {
  constructor(originX = 0, originY = 0) {
    const vertexes = [0, 0, 0, 0, 0, 0, 0, 0]; // 2维
    let offsetRatio = [-0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5];
    const uv = [0, 1, 0, 0, 1, 0, 1, 1];
    const indeces = [0, 1, 3, 2];

    offsetRatio = offsetRatio.map((v, k) => {
      if (k % 2 == 0) {
        return v - originX;
      } else {
        return v - originY;
      }
    });

    super(PrimitiveMode.TRIANGLE_STRIP, vertexes, offsetRatio, uv, indeces);
  }
}

export class OneWayArrowMesh extends Mesh {
  constructor(width = 20, height = 20) {
    const vertexes = [
      -0.2, 0, 0.2, 0, 0.2, 0, 0.5, 0, 0, 1, -0.5, 0, -0.2, 0,
    ].map((v, k) => {
      if (k % 2 == 0) {
        return v * width;
      } else {
        return v * height;
      }
    });

    const offsetRatio = [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    const uv = new Array(vertexes.length);
    const indeces = [0, 1, 6, 2, 5, 3, 4];
    super(PrimitiveMode.TRIANGLE_STRIP, vertexes, offsetRatio, uv, indeces);
  }
}

export class TwoWayArrowMesh extends Mesh {
  constructor(width = 20, height = 20) {
    const vertexes = [
      0, 0, 0.5, 1, 0.2, 1, 0.2, 1, 0.5, 1, 0, 2, -0.5, 1, -0.2, 1, -0.2, 1,
      -0.5, 1,
    ].map((v, k) => {
      if (k % 2 == 0) {
        return v * width;
      } else {
        return v * height;
      }
    });

    const offsetRatio = [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
    ];
    const uv = new Array(vertexes.length);
    const indeces = [0, 1, 9, 2, 8, 3, 7, 4, 6, 5];
    super(PrimitiveMode.TRIANGLE_STRIP, vertexes, offsetRatio, uv, indeces);
  }
}
