// export interface GeneratorInterface {
// 	readonly engine: Engine;
// 	display: DisplayStatus;
// 	instance(): ComponentInterface;
// 	destroy(): void;
// 	clear(): void;
// }

// export interface ComponentInterface {
// 	readonly id: string;
// 	readonly isShown: boolean;
// 	opacity: number;
// 	display: DisplayStatus;
// 	outViewportStatus: OutViewportStatus;
// 	attachViewportScale: boolean;
// 	attachViewportTranslation: boolean;
// 	show(): ComponentInterface;
// 	hide(): ComponentInterface;
// }

import { RectMesh, OneWayArrowMesh, TwoWayArrowMesh } from "../mesh";
import { RenderUnit, RenderAttribute } from "../render-unit";
import { RenderObject } from "../render-object";
import { TextField } from "../render-text";
import { Arrow } from "../render-arrow";

// 生成器基类
export class Generator {
  _engine; //: Engine;
  originUnit; //: RenderUnit;
  borderUnit; //: RenderUnit;
  originIdx; //: number;
  borderIdx; //: number;
  constructor(
    engine,
    mesh,
    originIndex = 0,
    borderIndex = 1,
    instanceCountMax = 0
  ) {
    this._engine = engine;
    this.originIdx = Math.floor(originIndex);
    this.borderIdx = Math.floor(borderIndex);
    // 元素缓冲区单元
    this.originUnit = new RenderUnit(
      engine,
      mesh.originMeshConfig,
      instanceCountMax
    ).regist();
    // 边框缓冲区单元
    this.borderUnit = new RenderUnit(
      engine,
      mesh.borderMeshConfig,
      instanceCountMax
    ).regist();
    // 绑定VAO
    this.engine.registVAO(this.originUnit, this.originIdx);
    this.engine.registVAO(this.borderUnit, this.borderIdx);
  }
  instance() {
    return new RenderObject(this.originUnit, this.borderUnit);
  }
  destroy() {
    this.engine.unRegistVAO(this.originUnit, this.originIdx);
    this.engine.unRegistVAO(this.borderUnit, this.borderIdx);
    this.originUnit.destroy();
    this.borderUnit.destroy();
    this.originUnit = null;
    this.borderUnit = null;
  }
  clear() {
    this.originUnit.clear();
    this.borderUnit.clear();
  }

  set opacity(o) {
    // this.originUnit.batchAdd(RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS, [o], 0);
    // this.borderUnit.batchAdd(RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS, [o], 0);
    this.originUnit.opacity = o;
    this.borderUnit.opacity = o;
  }

  set display(n) {
    this.originUnit.display = n;
    this.borderUnit.display = n;
  }

  set translate(offset) {
    this.originUnit.batchAdd(
      RenderAttribute.TRANSLATION_AND_ROTATION,
      offset,
      0
    );
    this.borderUnit.batchAdd(
      RenderAttribute.TRANSLATION_AND_ROTATION,
      offset,
      0
    );
  }

  get engine() {
    return this._engine;
  }
}

export const TextFieldVerticalAlign = {
  TOP: 0,
  MIDDLE: 1,
  BOTTOM: 2,
};

// 文本生成器
export class TextFieldGenerator {
  _engine; //: Engine;
  gs = []; //: Generator[] = [];
  constructor(
    engine,
    maxLen = 0,
    wordSpace = 0,
    verticalAlign = TextFieldVerticalAlign.MIDDLE,
    index = 0,
    instanceCountMax = 0
  ) {
    this._engine = engine;
    const align = -verticalAlign * 0.5 + 0.5;
    for (let i = 0; i < maxLen; i++) {
      this.gs.push(
        new Generator(
          engine,
          new RectMesh((-(i + 1) * (wordSpace + 8)) / 10, align),
          index,
          index,
          instanceCountMax
        )
      );
    }
  }

  instance() {
    return new TextField(this._engine, this.gs);
  }

  destroy() {
    this.gs.forEach((g) => g.destroy());
    this.gs = [];
  }

  clear() {
    this.gs.forEach((g) => g.clear());
  }

  set display(n) {
    this.gs.forEach((g) => (g.display = n));
  }

  set opacity(n) {
    this.gs.forEach((g) => (g.opacity = n));
  }

  get engine() {
    return this._engine;
  }
}

// 箭头线条生成器
export class ArrowGenerator {
  _engine; //: Engine;
  og; //: Generator;
  tg; //: Generator;
  _height; //: number;
  _indent; //: number;
  constructor(
    engine,
    width,
    height,
    indent = 0,
    originIndex = 0,
    borderIndex = 1,
    instanceCountMax = 0
  ) {
    this._engine = engine;
    this.og = new Generator(
      engine,
      new OneWayArrowMesh(width, height),
      originIndex,
      borderIndex,
      instanceCountMax
    );
    this.tg = new Generator(
      engine,
      new TwoWayArrowMesh(width, height),
      originIndex,
      borderIndex,
      instanceCountMax
    );
    this._height = height;
    this._indent = indent;
  }

  instance() {
    return new Arrow(
      this.og.instance(),
      this.tg.instance(),
      this._height,
      this._indent
    );
  }

  destroy() {
    this.og.destroy();
    this.tg.destroy();
    this.og = null;
    this.tg = null;
  }

  clear() {
    this.og.clear();
    this.tg.clear();
  }

  set translate(offset) {
    this.og.translate = offset;
    this.tg.translate = offset;
  }

  set display(n) {
    this.og.display = n;
    this.tg.display = n;
  }

  set opacity(value) {
    this.og.opacity = value;
    this.tg.opacity = value;
  }

  get engine() {
    return this._engine;
  }
}
