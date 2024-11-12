import { IdCreator } from "../lib/utils";
import * as glMatrix from "../lib/gl-matrix.js";
import { SearchableObject } from "../searcher";

const vec2 = glMatrix.vec2;

export const ArrowType = {
  ONE_WAY: 1,
  TWO_WAY: 2,
};

export class Arrow extends SearchableObject {
  _type = ArrowType.ONE_WAY;
  _id;
  _height;
  _indent;
  _fromTo = [0, 0, 0, 0];
  _oneObj;
  _twoObj;
  _isShown = false;
  constructor(one, two, height, indent = 0) {
    super(one.engine.searcher);
    this._id = IdCreator.createId();
    this._oneObj = one;
    this._twoObj = two;
    this._height = height;
    this._indent = indent;
  }

  get robj() {
    return this._type == ArrowType.ONE_WAY ? this._oneObj : this._twoObj;
  }

  get nobj() {
    return this._type == ArrowType.TWO_WAY ? this._oneObj : this._twoObj;
  }

  get id() {
    return this._id;
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return this;
    this.robj.show();
    this.nobj.hide();
    this.setFromToAndWidth();
    this._isShown = true;
    return this;
  }

  hide() {
    if (!this._isShown) return this;
    this.robj.hide();
    this._isShown = false;
    this.deregistToSearcher();
    return this;
  }

  /**
   * 获取当前render obj的id，hittest返回的是这个render obj
   */
  get rid() {
    return this.robj.id;
  }

  set fromTo(ft) {
    this._fromTo = ft;
    this.setFromToAndWidth();
  }

  get fromTo() {
    return this._fromTo;
  }

  set type(type) {
    if (type == this._type) return;
    this._type = type;
    this.nobj.hide();
    if (this._isShown) {
      this.robj.show();
      this.borderWidth = this.nobj.borderWidth;
      this.borderColor = this.nobj.borderColor;
      this.borderDashed = this.nobj.borderDashed;
      this.opacity = this.nobj.opacity;
      this.display = this.nobj.display;
      this.backgroundColor = this.nobj.backgroundColor;
      this.outViewportStatus = this.nobj.outViewportStatus;
      this.attachViewportScale = this.nobj.attachViewportScale;
      this.attachViewportTranslation = this.nobj.attachViewportTranslation;
      this.setFromToAndWidth();
    }
  }

  get type() {
    return this._type;
  }

  set backgroundColor(color) {
    this.robj.backgroundColor = color;
  }

  get backgroundColor() {
    return this.robj.backgroundColor;
  }

  set borderWidth(width) {
    this.robj.borderWidth = width;
  }

  get borderWidth() {
    return this.robj.borderWidth;
  }

  set borderColor(color) {
    this.robj.borderColor = color;
  }

  get borderColor() {
    return this.robj.borderColor;
  }

  set borderDashed(n) {
    this.robj.borderDashed = n;
  }

  get borderDashed() {
    return this.robj.borderDashed;
  }

  set opacity(n) {
    this.robj.opacity = n;
  }

  get opacity() {
    return this.robj.opacity;
  }

  set display(n) {
    this.robj.display = n;
  }

  get display() {
    return this.robj.display;
  }

  set outViewportStatus(status) {
    this.robj.outViewportStatus = status;
  }

  get outViewportStatus() {
    return this.robj.outViewportStatus;
  }

  set attachViewportScale(n) {
    this.robj.attachViewportScale = n;
  }

  get attachViewportScale() {
    return this.robj.attachViewportScale;
  }

  set attachViewportTranslation(n) {
    this.robj.attachViewportTranslation = n;
  }

  get attachViewportTranslation() {
    return this.robj.attachViewportTranslation;
  }

  setFromToAndWidth() {
    const ft = this._fromTo;
    const indent = this._indent;
    const from = vec2.fromValues(ft[0], ft[1]);
    const to = vec2.fromValues(ft[2], ft[3]);
    const v = vec2.sub(vec2.create(), to, from); //箭头向量
    const unitV = vec2.normalize(vec2.create(), v); //单位向量

    const len = vec2.len(v) - 2 * indent;
    const offset = vec2.add(
      vec2.create(),
      unitV.map((p) => p * indent),
      from
    );
    const rotation = Math.atan2(v[0], v[1]);

    let dist;
    if (this.type == ArrowType.ONE_WAY) {
      dist = Math.max(0, len - this._height);
    } else {
      dist = Math.max(0, len - 2 * this._height);
    }

    this.robj.translation = offset;
    this.robj.rotation = rotation;
    this.robj.vertexOffsetValue = [0, dist];

    this.searchable && this.registToSearcher();
  }

  getVertexPositions(expand = 0) {
    return this.robj.getVertexPositions(expand);
  }
}
