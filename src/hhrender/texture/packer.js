/**
 * 二维空间填充算法
 * 将一系列具有宽度（w）和高度（h）属性的块（blocks）放入一个尽可能小的矩形区域内，同时减少浪费的空间。这个算法特别适用于纹理打包（texture packing）
 * 
Inputs:
------
  blocks: array of any objects that have .w and .h attributes

Outputs:
-------
  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }
 */

//   export interface PNode {
// 	w: number;
// 	h: number;
// 	x?: number;
// 	y?: number;
// 	used?: boolean;
// 	down?: PNode;
// 	right?: PNode;
// 	fit?: PNode;
// 	data?: any;
// }

export class GrowingPacker {
  root; //: PNode;
  mw; //: number;
  mh; //: number;
  constructor(maxWidth = 0, maxHeight = 0) {
    this.mw = maxWidth;
    this.mh = maxHeight;
  }
  fit(blocks) {
    var n,
      node,
      block,
      len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len; n++) {
      block = blocks[n];
      if ((node = this.findNode(this.root, block.w, block.h)))
        block.fit = this.splitNode(node, block.w, block.h);
      else block.fit = this.growNode(block.w, block.h);
    }
    return blocks;
  }

  findNode(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if (w <= root.w && h <= root.h) return root;
    else return null;
  }

  splitNode(node, w, h) {
    node.used = true;
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  }

  growNode(w, h) {
    if (this.root.w + w > this.mw || this.root.h + h > this.mh) {
      console.error("Texture too large.");
      return;
    }

    var canGrowDown = w <= this.root.w;
    var canGrowRight = h <= this.root.h;

    var shouldGrowRight = canGrowRight && this.root.h >= this.root.w + w; // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown = canGrowDown && this.root.w >= this.root.h + h; // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight) return this.growRight(w, h);
    else if (shouldGrowDown) return this.growDown(w, h);
    else if (canGrowRight) return this.growRight(w, h);
    else if (canGrowDown) return this.growDown(w, h);
    else return null; // need to ensure sensible root starting size to avoid this happening
  }

  growRight(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h },
    };
    let node = this.findNode(this.root, w, h);
    if (node) return this.splitNode(node, w, h);
    else return null;
  }

  growDown(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down: { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root,
    };
    let node = this.findNode(this.root, w, h);
    if (node) return this.splitNode(node, w, h);
    else return null;
  }
}
