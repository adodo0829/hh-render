import { GrowingPacker } from "./packer";
import * as TinySDF from "tiny-sdf";
import { EventDispatcher } from "../events";

const TextureConfig = {
  MAX_WIDTH: Math.pow(2, 11),
  MAX_HEIGHT: Math.pow(2, 11),
};

const FontConfig = {
  fontSize: Math.pow(2, 7), //生成文字材质尺寸，2的幂，越大质量越好
  fontFamily: "Sans-serif",
  fontWeight: "normal",
};

// 生成的材质雪碧图 材质间的gap 防止材质采样错误
const TextureGap = Math.pow(2, 1);

export class TextureFactroy {
  gl;
  packer; //: GrowingPacker;
  blocks = []; //: PNode[] = [];
  fontMaps = new Map(); //: Map<string, ImageTexture> = new Map();
  texture; //: WebGLTexture;
  // 初始化材质
  constructor(glContext) {
    this.gl = glContext;
    const gl = glContext;
    const mw = TextureConfig.MAX_WIDTH;
    const mh = TextureConfig.MAX_HEIGHT;
    this.packer = new GrowingPacker(mw, mh);
    this.texture = gl.createTexture();
    // 创建不可变材质空间
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // y轴反转
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, mw, mh);
  }

  getOriginTexture() {
    return this.texture;
  }

  createTexture(source, width, height) {
    if (!source) {
      source = new Uint8Array(width * height * 4);
      source.fill(0);
    }
    const t = new ImageTexture();
    t.index = this.blocks.length;
    // width + 2 和 height + 2 是为了解决材质距离太近被错误采样问题
    this.blocks.push({
      w: width + TextureGap,
      h: height + TextureGap,
      data: {
        source: source,
        texture: t,
      },
    });

    this.updateToGL();

    return t;
  }

  getFontTexture(str) {
    const t = str.substr(0, 1);
    if (t == "") return null;
    if (!this.fontMaps.has(t)) {
      this.embedFont(t);
      this.updateToGL();
    }
    return this.fontMaps.get(str);
  }

  getFontTextures() {
    return this.fontMaps;
  }

  embedFont(chars) {
    const sdf = new TinySDF(
      FontConfig.fontSize,
      FontConfig.fontSize / 8,
      FontConfig.fontSize / 3,
      null,
      FontConfig.fontFamily,
      FontConfig.fontWeight
    );
    const size = sdf.size;
    for (let i = 0; i < chars.length; i++) {
      let char = chars[i];
      const txt = this.fontMaps.get(char);
      // 不允许重复导入
      if (txt && txt instanceof ImageTexture) {
        continue;
      }
      const s = sdf.draw(char, size);
      let t = new ImageTexture();
      t.index = this.blocks.length;
      // width + 2 和 height + 2 是为了解决材质距离太近被错误采样问题
      this.blocks.push({
        w: size + TextureGap,
        h: size + TextureGap,
        data: {
          source: s,
          texture: t,
        },
      });
      this.fontMaps.set(char, t);
    }
  }

  updateToGL() {
    const gl = this.gl;
    const bs = this.blocks;

    // 排序能得到最优解，但是却失去了静态区域
    // this.blocks = bs.sort((a, b) => {
    // 	if (a.w + a.h > b.w + b.h) return -1;
    // 	return 1;
    // });
    // this.blocks.forEach((b, k) => {
    // 	b.data.texture.index = k;
    // });

    this.packer.fit(this.blocks);

    const textures = this.blocks
      .map((b, k) => b.data.texture)
      .filter((t) => t.isReady == false);

    textures.forEach((t) => this.updateTextureToGL(t));
  }

  updateTextureToGL(texture) {
    const idx = texture.index;
    const block = this.blocks[idx];
    const gl = this.gl;
    const gap = TextureGap;
    const ind = gap * 0.5;
    const x = block.fit.x + ind;
    const y = block.fit.y + ind;
    const w = block.w - gap;
    const h = block.h - gap;
    texture.update(x, y, w, h);
    // x+1, y+1, width-2 和 height-2 是为了解决材质距离太近被错误采样问题
    gl.texSubImage2D(
      gl.TEXTURE_2D,
      0,
      x,
      y,
      w,
      h,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      block.data.source
    );
    texture.isReady = true;
  }

  /**
   * 复制屏幕像素到材质
   * @param texture
   * @param offsetX
   * @param offsetY
   */
  copyToTexture(texture, offsetX = 0, offsetY = 0) {
    const idx = texture.index;
    const block = this.blocks[idx];
    const gl = this.gl;
    const gap = TextureGap;
    const ind = gap * 0.5;
    const x = block.fit.x + ind;
    const y = block.fit.y + ind;
    const w = block.w - gap;
    const h = block.h - gap;
    // 写进材质
    gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, x, y, offsetX, offsetY, w, h);
  }
}

export const ImageTextureEvent = {
  UPDATE: "update",
};

export class ImageTexture extends EventDispatcher {
  u = 0;
  v = 0;
  width = 0;
  height = 0;
  index = 0;
  isReady = false;
  constructor() {
    super();
  }
  update(u, v, width, height, index = -1) {
    const mw = TextureConfig.MAX_WIDTH;
    const mh = TextureConfig.MAX_HEIGHT;
    this.u = u / mw;
    this.v = v / mh;
    this.width = width / mw;
    this.height = height / mh;
    if (index >= 0) {
      this.index = index;
    }
    this.dispatchEvent(ImageTextureEvent.UPDATE, this);
  }
}
