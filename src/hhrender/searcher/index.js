import * as RBush from "rbush";

/**
 * 判断点是否在多边形内
 * @param p 点坐标
 * @param poly 多边形顶点坐标
 */
function rayCasting(p, poly) {
  var px = p[0],
    py = p[1],
    flag = false,
    l = poly.length / 2;

  for (var i = 0, j = l - 1; i < l; j = i, i++) {
    var sx = poly[i * 2],
      sy = poly[i * 2 + 1],
      tx = poly[j * 2],
      ty = poly[j * 2 + 1];

    // 点与多边形顶点重合
    if ((sx === px && sy === py) || (tx === px && ty === py)) {
      flag = true;
      break;
    }

    // 判断线段两端点是否在射线两侧
    if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
      // 线段上与射线 Y 坐标相同的点的 X 坐标
      var x = sx + ((py - sy) * (tx - sx)) / (ty - sy);

      // 点在多边形的边上
      if (x === px) {
        flag = true;
        break;
      }

      // 射线穿过多边形的边界
      if (x > px) {
        flag = !flag;
      }
    }
  }

  // 射线穿过多边形边界的次数为奇数时点在多边形内
  return flag;
}

// export interface SearchObjectInterface {
// 	id: string,
// 	bounds: {
// 		minX: number,
// 		minY: number,
// 		maxX: number,
// 		maxY: number,
// 	};
// 	vertexes: number[];
// }

export class Searcher {
  _sobj;
  _buffer; // Map<string, SearchObjectInterface>;
  constructor() {
    this._sobj = new RBush(200);
    this._buffer = new Map();
  }

  objToItem(obj) {
    return Object.assign(obj.bounds, {
      id: obj.id,
    });
  }

  insert(obj) {
    if (!obj) {
      console.log("Searcher: ", "Can not insert.", obj);
      return;
    }
    const bounds = obj.bounds;
    if (!((bounds.minX - bounds.maxX) * (bounds.minY - bounds.maxY))) {
      console.log("Searcher: ", "Can not insert, width or height equals 0.");
      return;
    }

    const id = obj.id;
    const bufferObj = this._buffer.get(id);

    bufferObj && this.remove(id);

    this._sobj.insert(this.objToItem(obj));
    this._buffer.set(obj.id, obj);
  }

  remove(id) {
    let obj = this._buffer.get(id);
    if (!obj) return;
    this._sobj.remove(this.objToItem(obj));
    this._buffer.delete(obj.id);
  }

  search(x, y, width = 0, height = 0) {
    let result = this._sobj
      .search({ minX: x, minY: y, maxX: width + x, maxY: height + y })
      .map((v) => this._buffer.get(v.id));
    if (width == 0 && height == 0) {
      result = result.filter((v) => {
        return rayCasting([x, y], v.vertexes);
      });
    }
    return result;
  }
}

export class SearchableObject {
  _srh;
  _sable = false;
  _expandRadius = 0;
  constructor(srh) {
    this._srh = srh;
  }

  set searchable(able) {
    if (able == this._sable) return;
    this._sable = able;
    if (able === true) {
      this.registToSearcher();
    } else {
      this.deregistToSearcher();
    }
  }

  get searchable() {
    return this._sable;
  }

  set expandRadius(r) {
    if (this._expandRadius == r) return;
    this._expandRadius = r;
    // 刷新搜索区域
    this._sable && this.registToSearcher();
  }

  get expandRadius() {
    return this._expandRadius;
  }

  get id() {
    return "";
  }

  /**
   * 获取当前的顶点坐标 override
   */
  getVertexPositions(expand = 0) {
    return [];
  }

  /**
   * 注册成可查找
   */
  registToSearcher() {
    const vs = this.getVertexPositions(this._expandRadius);
    const vx = vs.filter((v, k) => k % 2 == 0);
    const vy = vs.filter((v, k) => k % 2 != 0);
    const obj = {
      id: this.id,
      bounds: {
        minX: Math.min.apply(null, vx),
        maxX: Math.max.apply(null, vx),
        minY: Math.min.apply(null, vy),
        maxY: Math.max.apply(null, vy),
      },
      vertexes: vs,
    };
    this._srh.insert(obj);
  }

  /**
   * 解除注册
   */
  deregistToSearcher() {
    this._srh.remove(this.id);
  }
}
