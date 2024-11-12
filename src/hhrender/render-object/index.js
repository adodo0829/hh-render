import { RenderAttribute } from "../render-unit";
import { ImageTexture, ImageTextureEvent } from "../texture";
import { IdCreator, DisplayStatus } from "../lib/utils";
import { SearchableObject } from "../searcher";

const RATIO = window.devicePixelRatio;

export const OutViewportStatus = {
  NONE: 0,
  X: 1,
  Y: 2,
  BOTH: 3,
};

export class RenderObject extends SearchableObject {
  _id; //: string;
  _originUnit; //: RenderUnit;
  _borderUnit; //: RenderUnit;
  _originId; //: string;
  _borderId; //: string;
  _isAdded; //: boolean;
  _isBorderAdded; //: boolean;
  _texture; //: ImageTexture;
  _needReset = false;

  _attribs = {
    translation: [0, 0],
    rotation: 0,
    scale: 1,
    backgroundColor: [0, 0, 0, 0],
    uv: null,
    vertexOffsetValue: [0, 0],
    isText: false,
    textBorderWidth: 0,
    textBorderColor: [0, 0, 0, 0],
    borderWidth: 0,
    borderColor: [0, 0, 0, 0],
    borderDashed: 0,
    opacity: 1,
    display: DisplayStatus.DISPLAY,
    outViewportStatus: OutViewportStatus.NONE,
    attachViewportScale: true,
    attachViewportTranslation: true,
  };

  _attriblist = [
    "vertexOffsetValue",
    "translation",
    "rotation",
    "scale",
    "backgroundColor",
    "uv",

    "borderWidth",
    "borderColor",
    "borderDashed",

    "isText",
    "textBorderWidth",
    "textBorderColor",

    "opacity",
    "display",
    "outViewportStatus",
    "attachViewportScale",
    "attachViewportTranslation",
  ];

  constructor(originUnit, borderUnit) {
    super(originUnit.engine.searcher);
    this._originUnit = originUnit;
    this._borderUnit = borderUnit;
    this._id = IdCreator.createId();
  }

  get id() {
    return this._id;
  }

  get engine() {
    return this._originUnit.engine;
  }

  get isShown() {
    return this._isAdded;
  }

  show() {
    if (!this._isAdded) {
      this._originId = this._originUnit.add();
      this._isAdded = true;
      this.updateStatus();
      this.searchable && this.registToSearcher();
    }
    this.borderWidth = this.borderWidth;
    return this;
  }

  hide() {
    this._isAdded && this._originUnit.remove(this._originId);
    this._isBorderAdded && this._borderUnit.remove(this._borderId);
    this._isAdded = false;
    this._isBorderAdded = false;
    this._originId = null;
    this._borderId = null;
    this.deregistToSearcher();
    return this;
  }

  set translation(offset) {
    // this.engine.isDebug && console.log('RenderObject:: translation: ', offset);
    // if(arrayEqual(offset, this._attribs['translation'])) return;
    this._isAdded &&
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        offset,
        0
      );
    this._isBorderAdded &&
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        offset,
        0
      );
    this._attribs["translation"] = offset;
    this.searchable && this.registToSearcher();
  }

  get translation() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        0,
        2
      );
    }
    return this._attribs["translation"];
  }

  set rotation(radian) {
    // if(this.rotation == radian) return;
    const data = [radian];
    this._isAdded &&
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        data,
        2
      );
    this._isBorderAdded &&
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        data,
        2
      );
    this._attribs["rotation"] = radian;
    this.searchable && this.registToSearcher();
  }

  get rotation() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        2,
        1
      )[0];
    }
    return this._attribs["rotation"];
  }

  set scale(n) {
    // if(this.scale == n) return;
    const data = [n];
    this._isAdded &&
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        data,
        3
      );
    this._isBorderAdded &&
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        data,
        3
      );
    this._attribs["scale"] = n;
    this.searchable && this.registToSearcher();
  }

  get scale() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        3,
        1
      )[0];
    }
    return this._attribs["scale"];
  }

  set backgroundColor(color) {
    // if(arrayEqual(color, this._attribs['backgroundColor'])) return;
    const data = color.map((c) => c / 255);
    this._isAdded &&
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.BACKGROUND_COLOR,
        data
      );
    this._attribs["backgroundColor"] = color;
  }

  get backgroundColor() {
    if (this._isAdded) {
      return this._originUnit
        .getAttribute(this._originId, RenderAttribute.BACKGROUND_COLOR, 0, 4)
        .map((c) => c * 255);
    }
    return this._attribs["backgroundColor"];
  }

  set texture(texture) {
    if (texture == null) {
      if (this._texture && this._texture instanceof ImageTexture) {
        this._texture.removeEventListener(
          ImageTextureEvent.UPDATE,
          this.changeUV,
          this
        );
        this._texture = null;
      }
      this.changeUV(null);
      return;
    }

    if (!(texture instanceof ImageTexture)) {
      return;
    }

    const t = this._texture;
    const tt = texture;

    if (!this._needReset && t == tt) return;

    t instanceof ImageTexture &&
      t.removeEventListener(ImageTextureEvent.UPDATE, this.changeUV, this);

    this._texture = texture;
    this.changeUV(this._texture);
    this._texture.addEventListener(
      ImageTextureEvent.UPDATE,
      this.changeUV,
      this
    );
  }

  set borderWidth(width) {
    if (this._isBorderAdded && width == this._attribs.borderWidth) return;

    this._attribs["borderWidth"] = width;

    const data = [width];

    if (this._isBorderAdded) {
      if (width > 0) {
        this._borderUnit.setAttribute(
          this._borderId,
          RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
          data,
          2
        );
      } else {
        this.removeBorder();
      }
    } else if (width > 0) {
      this.addBorder();
    }
  }

  get borderWidth() {
    if (this._isBorderAdded) {
      return this._borderUnit.getAttribute(
        this._borderId,
        RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
        2,
        1
      )[0];
    }
    return this._attribs["borderWidth"];
  }

  set borderColor(color) {
    // if(arrayEqual(color, this._attribs['borderColor'])) return;
    const data = color.map((c) => c / 255);
    this._isBorderAdded &&
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.BACKGROUND_COLOR,
        data
      );
    this._attribs["borderColor"] = color;
  }

  get borderColor() {
    if (this._isBorderAdded) {
      return this._borderUnit
        .getAttribute(this._borderId, RenderAttribute.BACKGROUND_COLOR, 0, 4)
        .map((c) => c * 255);
    }
    return this._attribs["borderColor"];
  }

  set borderDashed(n) {
    // if(n == this._attribs.borderDashed) return;
    this._isBorderAdded &&
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        [n * RATIO],
        2
      );
    this._attribs.borderDashed = n;
  }

  get borderDashed() {
    if (this._isBorderAdded) {
      return this._borderUnit.getAttribute(
        this._borderId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        2,
        1
      )[0];
    }
    return this._attribs.borderDashed;
  }

  set vertexOffsetValue(value) {
    // if(arrayEqual(value, this._attribs['vertexOffsetValue'])) return;
    // const v = value.slice(0, 2);
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
      value
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
      value
    );
    this._attribs["vertexOffsetValue"] = value;
    this.searchable && this.registToSearcher();
  }

  get vertexOffsetValue() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
        0,
        2
      );
    }
    return this._attribs["vertexOffsetValue"];
  }

  set size(value) {
    this.vertexOffsetValue = value;
  }

  get size() {
    return this.vertexOffsetValue;
  }

  set isText(ist) {
    // if(this._attribs['isText'] == ist) return;
    let r = ist ? 1 : 0;
    const data = [r];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
      data,
      0
    );
    this._attribs["isText"] = ist;
  }

  get isText() {
    if (this._isAdded) {
      return (
        this._originUnit.getAttribute(
          this._originId,
          RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
          0,
          1
        )[0] == 1
      );
    }
    return this._attribs["isText"];
  }

  set textBorderWidth(n) {
    // if(n == this._attribs['textBorderWidth']) return;
    const data = [n];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
      data,
      1
    );
    this._attribs["textBorderWidth"] = n;
  }

  get textBorderWidth() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        1,
        1
      )[0];
    }
    return this._attribs["textBorderWidth"];
  }

  set textBorderColor(color) {
    // if(arrayEqual(color, this._attribs['textBorderColor'])) return;
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.TEXT_BORDER_COLOR,
      color.map((c) => c / 255)
    );
    this._attribs["textBorderColor"] = color;
  }

  get textBorderColor() {
    return this._attribs["textBorderColor"];
  }

  set opacity(n) {
    // let op = numberClamp(0, 1, n);
    // if(this._attribs['opacity'] == op) return;
    const op = Math.max(0, n);
    const data = [op];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      0
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      0
    );
    this._attribs["opacity"] = op;
  }

  get opacity() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        0,
        1
      )[0];
    }
    return this._attribs["opacity"];
  }

  set display(n) {
    // if(this._attribs['display'] == n) return;
    const data = [n];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      1
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      1
    );
    this._attribs["display"] = n;
  }

  get display() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        1
      )[0];
    }
    return this._attribs["display"];
  }

  set outViewportStatus(status) {
    const data = [status];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
      data,
      3
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
      data,
      3
    );
    this._attribs["outViewportStatus"] = status;
  }

  get outViewportStatus() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
        3,
        1
      )[0];
    }
    return this._attribs["outViewportStatus"];
  }

  set attachViewportScale(n) {
    // if(this._attribs['attachViewportScale'] == n) return;
    const o = n ? 1 : 0;
    const data = [o];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      2
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      2
    );
    this._attribs["attachViewportScale"] = n;
  }

  get attachViewportScale() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        2,
        1
      )[0] == 1
        ? true
        : false;
    }
    return this._attribs["attachViewportScale"];
  }

  set attachViewportTranslation(n) {
    // if(this._attribs['attachViewportTranslation'] == n) return;
    const o = n ? 1 : 0;
    const data = [o];
    this._originUnit.setAttribute(
      this._originId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      3
    );
    this._borderUnit.setAttribute(
      this._borderId,
      RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
      data,
      3
    );
    this._attribs["attachViewportTranslation"] = n;
  }

  get attachViewportTranslation() {
    if (this._isAdded) {
      return this._originUnit.getAttribute(
        this._originId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        3,
        1
      )[0] == 1
        ? true
        : false;
    }
    return this._attribs["attachViewportTranslation"];
  }

  getVertexPositions(expand = 0) {
    return this._originUnit.getVertexesPositionById(this._originId, expand);
  }

  changeUV(texture) {
    if (!texture || !(texture instanceof ImageTexture)) {
      this._isAdded &&
        this._originUnit.setAttribute(
          this._originId,
          RenderAttribute.UV_RECT,
          [0, 0, 0, 0]
        );
    } else {
      const uv = [texture.u, texture.v, texture.width, texture.height];
      this._isAdded &&
        this._originUnit.setAttribute(
          this._originId,
          RenderAttribute.UV_RECT,
          uv
        );
      this._attribs["uv"] = uv;
    }
  }

  updateStatus() {
    this._needReset = true;
    const list = this._attriblist;
    const s = this._attribs;
    // list.forEach(v => this[v] = s[v]);

    if (this._isAdded) {
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        [s["translation"][0], s["translation"][1], s["rotation"]]
      );
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.BACKGROUND_COLOR,
        s["backgroundColor"].map((v) => v / 255)
      );
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        [s["isText"] ? 1 : 0, 0, 0, s["scale"]]
      );
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        [
          s["opacity"],
          s["display"],
          s["attachViewportScale"] ? 1 : 0,
          s["attachViewportTranslation"] ? 1 : 0,
        ]
      );
      // this._originUnit.setAttribute(this._originId, RenderAttribute.TEXT_BORDER_COLOR, s['textBorderColor'].map(v => v/255));
      this._originUnit.setAttribute(
        this._originId,
        RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
        [
          s["vertexOffsetValue"][0],
          s["vertexOffsetValue"][1],
          s["borderWidth"],
          s["outViewportStatus"],
        ]
      );
    }

    this.changeUV(this._texture);
    this._needReset = false;
  }

  addBorder() {
    if (!this._isBorderAdded) {
      this._borderId = this._borderUnit.add();

      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.TRANSLATION_AND_ROTATION,
        [this.translation[0], this.translation[1], this.rotation],
        0
      );

      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.VERTEX_AND_EDGE_OFFSET_VALUE_AND_NOT_FOLLOW_VIEWPORT,
        [
          this.vertexOffsetValue[0],
          this.vertexOffsetValue[1],
          this.borderWidth,
          this.outViewportStatus,
        ],
        0
      );

      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.BACKGROUND_COLOR,
        this.borderColor.map((v) => v / 255),
        0
      );
      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.IS_TEXT_AND_BORDER_WIDTH_AND_DASHED_AND_SCALE,
        [this.borderDashed * RATIO, this.scale],
        2
      );

      this._borderUnit.setAttribute(
        this._borderId,
        RenderAttribute.OPACITY_AND_DISPLAY_AND_VPSCALE_AND_VPTRANS,
        [
          this.opacity,
          this.display,
          this.attachViewportScale ? 1 : 0,
          this.attachViewportTranslation ? 1 : 0,
        ],
        0
      );

      this._isBorderAdded = true;
    }
  }

  removeBorder() {
    if (this._isBorderAdded) {
      this._borderUnit.remove(this._borderId);
      this._borderId = undefined;
      this._isBorderAdded = false;
    }
  }
}
