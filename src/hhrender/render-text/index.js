import { OutViewportStatus } from "../render-object";
import { IdCreator, DisplayStatus } from "../lib/utils";
import { SearchableObject } from "../searcher";

export class TextField extends SearchableObject {
  _id;
  _isShown = false;
  _text = "";
  _fontSize = 12;
  _translation = [0, 0];
  _color = [255, 255, 255, 255];
  _borderWidth = 0;
  _borderColor = [0, 0, 0, 0];
  _opacity = 1;
  _display = DisplayStatus.DISPLAY;
  _outViewportStatus = OutViewportStatus.NONE;
  _attachViewportScale = true;
  _attachViewportTranslation = true;

  _tf; //: TextureFactroy;
  _fontObjects; //: RenderObject[];
  _gs; //: Generator[];

  constructor(engine, generators) {
    super(engine.searcher);
    this._id = IdCreator.createId();
    this._gs = generators;
    this._tf = engine.textureFactroy;
    this._fontObjects = [];
    this._gs.forEach((g) => {
      let obj = g.instance();
      obj.isText = true;
      obj.display = DisplayStatus.NONE;
      this._fontObjects.push(obj);
    });
  }

  get id() {
    return this._id;
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return this;
    this._isShown = true;
    this._fontObjects.forEach((v) => v.show());
    this.resetFonts();
    this.searchable && this.registToSearcher();
    return this;
  }

  hide() {
    if (!this._isShown) return this;
    this._isShown = false;
    // this.resetFonts();
    this._fontObjects.forEach((v) => v.hide());
    this.deregistToSearcher();
    return this;
  }

  set text(str) {
    this._text = str;
    // this.resetFonts();
    const f = this._tf;
    const len = str.length;
    this._fontObjects.forEach((v, k) => {
      if (k < len) {
        v.display = DisplayStatus.DISPLAY;
        v.texture = f.getFontTexture(str[k]);
      } else {
        v.display = DisplayStatus.NONE;
      }
    });
  }

  get text() {
    return this._text;
  }

  set translation(offset) {
    this._translation = offset;
    // this.setFontsTranslation();
    this._fontObjects.forEach((v) => (v.translation = offset));
    this.searchable && this.registToSearcher();
  }

  get translation() {
    return this._translation;
  }

  set fontSize(size) {
    this._fontSize = size;
    // this.setFontsTranslation();
    this._fontObjects.forEach((v) => (v.size = [size, size]));
    this.searchable && this.registToSearcher();
  }

  get fontSize() {
    return this._fontSize;
  }

  set color(color) {
    this._color = color;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.backgroundColor = color));
  }

  get color() {
    return this._color;
  }

  set borderWidth(n) {
    // if(this._borderWidth == n) return;
    this._borderWidth = n;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.textBorderWidth = n));
  }

  get borderWidth() {
    return this._borderWidth;
  }

  set borderColor(color) {
    // if(arrayEqual(this._borderColor, color)) return;
    this._borderColor = color;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.textBorderColor = color));
  }

  set opacity(n) {
    // this._opacity = numberClamp(0, 1, n);
    // this.resetFonts();
    this._opacity = n;
    this._fontObjects.forEach((v) => (v.opacity = this._opacity));
  }

  get opacity() {
    return this._opacity;
  }

  set display(n) {
    this._display = n;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.display = n));
  }

  get display() {
    return this._display;
  }

  set outViewportStatus(status) {
    this._outViewportStatus = status;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.outViewportStatus = status));
  }

  get outViewportStatus() {
    return this._outViewportStatus;
  }

  set attachViewportScale(n) {
    this._attachViewportScale = n;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.attachViewportScale = n));
  }

  get attachViewportScale() {
    return this._attachViewportScale;
  }

  set attachViewportTranslation(n) {
    this._attachViewportTranslation = n;
    // this.resetFonts();
    this._fontObjects.forEach((v) => (v.attachViewportTranslation = n));
  }

  get attachViewportTranslation() {
    return this._attachViewportTranslation;
  }

  resetFonts() {
    const len = this._text.length;
    const f = this._tf;
    const gs = this._gs;

    this._fontObjects.forEach((v, k) => {
      let text = this._text[k];
      v.size = [this._fontSize, this._fontSize];
      v.backgroundColor = this._color;
      v.opacity = this._opacity;
      v.textBorderWidth = this._borderWidth;
      v.textBorderColor = this._borderColor;
      v.outViewportStatus = this._outViewportStatus;
      v.attachViewportScale = this._attachViewportScale;
      v.attachViewportTranslation = this._attachViewportTranslation;
      v.display = this._display;
      v.translation = this._translation;
      if (text) {
        let texture = f.getFontTexture(text);
        v.texture = texture;
      }
    });
  }

  getVertexPositions(expand = 0) {
    const len = this._fontObjects.length;
    if (len <= 0) return [];
    const first = this._fontObjects[0].getVertexPositions(expand);
    const last = this._fontObjects[len - 1].getVertexPositions(expand);
    const vs = first.concat(last);
    const vx = vs.filter((v, k) => k % 2 == 0);
    const vy = vs.filter((v, k) => k % 2 != 0);
    const minX = Math.min.apply(null, vx);
    const maxX = Math.max.apply(null, vx);
    const minY = Math.min.apply(null, vy);
    const maxY = Math.max.apply(null, vy);
    return [minX, maxY, minX, minY, maxX, minY, maxX, maxY];
  }
}
