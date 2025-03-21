import * as glMatrix from "./gl-matrix.js";

const vec2 = glMatrix.vec2;
const vec3 = glMatrix.vec3;

export class Rectangle {
  x;
  y;
  w;
  h;
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  setAttrs(x = 0, y = 0, w = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

export const DisplayStatus = {
  NONE: 0,
  DISPLAY: 1,
};

// 渲染单元接口
// export interface PaintUnitInterface {
// 	draw(): void;
// 	updateToGL(): boolean;
// 	updateUniform();
// 	destroy(): void;
// 	clear(): void;
// 	display: DisplayStatus;
// 	fill(attrib: string, value): void;
// 	batchSet(attrib: string, value: Float32Array | Array<number>, offset: number): void;
// 	batchAdd(attrib: string, value: Float32Array | Array<number>, offset: number): void;
// }

export function getBounds(vertexes) {
  const vs = vertexes;
  const vsx = vs.filter((v, k) => k % 2 == 0);
  const vsy = vs.filter((v, k) => k % 2 != 0);
  const minx = Math.min.apply(null, vsx);
  const maxx = Math.max.apply(null, vsx);
  const miny = Math.min.apply(null, vsy);
  const maxy = Math.max.apply(null, vsy);
  return new Rectangle(minx, miny, maxx - minx, maxy - miny);
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
}

export function loadImages(srcs) {
  return Promise.all(srcs.map((src) => loadImage(src)));
}

export class IdCreator {
  static num = 0;
  static createId() {
    this.num++;
    return this.num.toString();
  }
}

/**
 * 获取膨胀后的顶点坐标
 * @param pcv 前边
 * @param ncv 后边
 * @param cv 当前顶点
 * @param expand 膨胀系数
 */
export function getVertexAfterExpand(
  pcv, //: Float32Array,
  ncv, // Float32Array,
  cv, // Float32Array,
  expand
) {
  const mpc = vec3.normalize(vec3.create(), pcv);
  const mnc = vec3.normalize(vec3.create(), ncv);
  let mid = vec3.add(vec3.create(), mpc, mnc);
  // 中线单位向量
  mid = vec3.normalize(mid, mid);
  // 夹角
  let theta = Math.acos(
    vec3.dot(pcv, ncv) / (vec3.length(pcv) * vec3.length(ncv))
  );
  // 右手法则判断角度正负
  let c = vec3.cross(vec3.create(), mpc, mnc);
  let sign = Math.sign(c[2]);
  // 求膨胀中线长度
  let l = expand / Math.sin(theta * 0.5);

  return mid.map((v, k) => v * l * sign + cv[k]);
}

/**
 * 获取顶点形变后的坐标
 * @param vertex vec3 原顶点坐标
 * @param ratio vec3 顶点形变系数
 * @param offsetValue vec3 形变值
 */
export function getVertexPosition(
  vertex, // Float32Array,
  ratio, // Float32Array,
  offsetValue // Float32Array
) {
  return vertex.map((v, k) => v + ratio[k] * offsetValue[k]);
}

export function arrayEqual(arr1, arr2) {
  let result = true;
  if (
    !(arr1 instanceof Array) ||
    !(arr2 instanceof Array) ||
    arr1.length != arr2.length
  )
    return false;

  arr1.forEach((v, k) => {
    if (v !== arr2[k]) {
      result = false;
      return;
    }
  });
  return result;
}

/*16进制颜色转为RGB格式*/
export function hexToRgb(str) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = str.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;
  }
}

// 判断字符串是否是数字
export function isInteger(str) {
  let reg = new RegExp("^[-\\+]?[\\d]*$");
  return reg.test(str);
}

export function isChinese(str) {
  //通过字节码进行判断
  const code = str.charCodeAt(0);
  return code >= 0x4e00 && code <= 0x29fa5;
}

export function numberClamp(min, max, x) {
  return Math.min(max, Math.max(min, x));
}

export function rectangleIntersection(out, rect1, rect2) {
  const x1 = Math.max(rect1.x, rect2.x);
  const y1 = Math.max(rect1.y, rect2.y);
  const x2 = Math.min(rect1.x + rect1.w, rect2.x + rect2.w);
  const y2 = Math.min(rect1.y + rect1.h, rect2.y + rect2.h);

  if (x2 <= x1 || y2 <= y1) {
    out.x = out.y = out.w = out.h = 0;
    return out;
  } else {
    out.x = x1;
    out.y = y1;
    out.w = x2 - x1;
    out.h = y2 - y1;
    return out;
  }
}
