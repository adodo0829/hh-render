<template>
  <div class="home">
    <p>GLSL ES 3.00</p>
	游戏引擎 https://github.com/ThisisGame/cpp-game-engine-book
    <pre>
<h3>基本结构</h3>
预处理器指令：
#version 300 es：指定着色器语言的版本。
变量类型：

基本数据类型：float, int, bool, vec2, vec3, vec4, mat2, mat3, mat4, sampler2D 等。
限定词：in, out, inout（仅在函数参数中使用）。
主函数：

void main()：着色器程序的入口点。

<h3>输入和输出</h3>
in：用于顶点着色器的输入和片段着色器的输出。
out：用于顶点着色器的输出和片段着色器的输入。

<h3>Uniforms</h3>
Uniform变量：
用于在应用程序和着色器之间传递数据。
声明方式：uniform type name;

uniform 用来修饰统一变量。
GPU是并行的，Shader是执行在GPU上的程序。
当我们需要绘制3个顶点，GPU将3个顶点数据，分摊到3个GPU逻辑单元并行处理，每个逻辑单元处理的不同的顶点坐标数据，称之为属性变量。
每个逻辑单元也会需要一些相同的数据，这些相同的数据，称之为统一变量。
uniform mat4 u_mvp;

<p>es2.0语法</p>
attribute 表示这个变量，每执行一次Shader，都需要被赋值
attribute vec3 a_pos;
attribute vec4 a_color;
输出变量由varying关键字修饰，用于从顶点着色器，传递数据到片段着色器
varying vec4 v_color;

<h3>布局限定词</h3>
位置：
layout(location = N)：指定变量在属性数组中的位置。
接口块：
使用in和out关键字定义块，用于组织和传递复杂的数据结构。

<h3>构造函数</h3>
支持多种构造函数，例如：vec4(float x, float y, float z, float w)。

<h3>控制流</h3>
条件语句：if, else。
循环语句：for, while。

<h3>函数</h3>
支持用户定义函数。
内置函数：如sin, cos, pow等。

<h3>精度限定词</h3>
精度限定词：
highp, mediump, lowp：指定变量或uniform的精度。

<h3>纹理采样和处理</h3>
纹理函数：
texture, texture2D, textureCube等。

<h3>构造几何形状</h3>
几何着色器：
可以定义几何着色器来处理几何图形的顶点。

<h3>变换反馈：</h3>
允许着色器将数据直接输出到缓冲区。
    </pre>

    <div>内置函数</div>
    <pre>

GLSL ES 3.00支持的内置函数非常丰富，涵盖了数学运算、几何函数、矩阵操作、纹理查询等多个方面。
以下是一些主要的内置函数类别及其部分代表函数：

### 1. 角度和三角函数
- `radians(d)`：将角度转换为弧度。
- `degrees(r)`：将弧度转换为角度。
- `sin(x)`：正弦函数。
- `cos(x)`：余弦函数。
- `tan(x)`：正切函数。
- `asin(x)`：反正弦函数。
- `acos(x)`：反余弦函数。
- `atan(x)`：反正切函数。
- `atan(x, y)`：双参数反正切函数。

### 2. 指数函数
- `pow(x, y)`：幂函数。
- `exp(x)`：指数函数。
- `log(x)`：自然对数。
- `exp2(x)`：以2为底的指数函数。
- `log2(x)`：以2为底的对数。

### 3. 通用函数
- `abs(x)`：绝对值。
- `sign(x)`：符号函数。
- `floor(x)`：向下取整。
- `ceil(x)`：向上取整。
- `fract(x)`：取小数部分。
- `mod(x, y)`：取模。
- `min(x, y)`：最小值。
- `max(x, y)`：最大值。
- `clamp(x, minVal, maxVal)`：将x限制在[minVal, maxVal]之间。
- `mix(x, y, a)`：线性插值。
- `step(edge, x)`：阶梯函数。
- `smoothstep(edge0, edge1, x)`：平滑阶梯函数。

### 4. 浮点数打包和解包函数
- `packHalf2x16(v)`：将两个16位半精度浮点数打包成一个32位无符号整数。
- `unpackHalf2x16(v)`：将一个32位无符号整数解包成两个16位半精度浮点数。

### 5. 几何函数
- `length(v)`：向量v的长度。
- `distance(p0, p1)`：两点之间的距离。
- `dot(x, y)`：向量x和y的点积。
- `cross(x, y)`：向量x和y的叉积。
- `normalize(v)`：向量v的单位向量。
- `faceforward(N, I, Nref)`：根据法线N和参考向量Nref调整向量I的方向。
- `reflect(I, N)`：向量I关于法线N的反射。
- `refract(I, N, eta)`：向量I在法线N上的折射，其中eta是折射率。

### 6. 矩阵函数
- 矩阵的构造函数，如`mat2`, `mat3`, `mat4`。
- `matrixCompMult(x, y)`：矩阵逐元素乘法。
- `outerProduct(a, b)`：计算两个向量的外积。
- `transpose(m)`：矩阵转置。
- `inverse(m)`：矩阵求逆。

### 7. 向量关系函数
- `lessThan(x, y)`：逐元素比较x和y是否小于。
- `greaterThan(x, y)`：逐元素比较x和y是否大于。
- `equal(x, y)`：逐元素比较x和y是否相等。
- `notEqual(x, y)`：逐元素比较x和y是否不相等。

### 8. 纹理查询函数
- `texture(sampler, P)`：从纹理采样器sampler中获取纹理坐标P处的颜色。
- `textureLod(sampler, P, lod)`：从纹理采样器sampler中获取指定层次lod处的纹理坐标P处的颜色。
- `textureProj(sampler, P)`：进行投影纹理采样。
- `textureGrad(sampler, P, dPdx, dPdy)`：使用显式梯度进行纹理采样。
    </pre>

    <h3>顶点着色器</h3>
	<p>
		<pre>
void main()
{
    gl_Position = vec4(vPos, 1.0);
}
		</pre>
每个Shader都有入口函数 main()，顶点Shader主要工作就是：计算坐标。
得到坐标计算结果后，传给内置变量 gl_Position。
	</p>
    <p>在线测试 https://thebookofshaders.com/edit.php</p>

    <pre>
  export const vertexString = `
    #version 300 es
    // 指定currVertexAndRatio变量在顶点属性数组中的位置是1
	layout(location=1) in vec4 currVertexAndRatio;			// 顶点坐标和变形系数
	layout(location=2) in vec4 prevVertexAndRatio;
	layout(location=3) in vec4 nextVertexAndRatio;
	layout(location=4) in vec4 uvAndEdgeOffsetRatio;		// UV
	layout(location=5) in vec4 vertexAndEdgeOffsetValueAndNotFollowViewport;	// 顶点形变  边形变值  是否不跟随视口
	layout(location=6) in vec4 UVRect;						// UVRect
	layout(location=7) in vec4 backgroundColor;				// 背景色
	layout(location=8) in vec4 translationAndRotation;		// 形变
	layout(location=9) in vec4 isTextAndBorderWidthAndDashedAndScale;		// 是否渲染文字 以及 文字边框粗细 以及物体边框虚线 缩放
	layout(location=10) in vec4 textBorderColor;			// 文字边框颜色
	layout(location=11) in vec4 opacityAndDisplayAndVpScaleAndVpTrans;			// 透明度 是否显示 是否跟随视口缩放 是否跟随视口平移
    
    // out是从顶点着色器传递到片段着色器（用于处理像素颜色）的数据
	out vec2 vTexCoord;				// UV
	out vec4 vBgColor;
	out float vIsText;
	out float vTextBorderWidth;
	out vec4 vTextBorderColor;
	out float vHasTexture;
	out vec4 vPos;
	out float vNotBorder;
	out float vBorderDashed;
	out float vOpacity;
	out float vDisplay;

  // 应用程序和着色器之间传递传递参数
	uniform vec2 uConversionVec2;	//坐标转换
	uniform vec2 uViewportTranslation;	//视口平移
	uniform vec2 uViewportScale;		//视口缩放
	uniform float uViewportRotation;	//视口旋转
	uniform vec4 uOpacity;				//全局透明度

	mat4 getScaleMatrix(vec2 scale) {
		return mat4(
			scale.x, 0.0, 0.0, 0.0,
			0.0, scale.y, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	}

	mat4 getRotationMatrix(float radian) {
		float cost = cos(radian);
		float sint = sin(radian);
		return mat4(
			cost, -sint, 0.0, 0.0,
			sint, cost, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	}

	mat4 getTranslationMatrix(vec2 translation) {
		return mat4(
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			translation.x, translation.y, 0.0, 1.0
		);
	}

    // 找到两个向量夹角平分线上的一个特定点，这个点距离每个向量的端点都是 offset 距离
	vec2 getIntersectionVertex(
		in vec2 v1,
		in vec2 v2,
		in float offset
	) {
		vec4 vv1 = vec4(v1, 0.0, 1.0);
		vec4 vv2 = vec4(v2, 0.0, 1.0);
		// 向量夹角
		vec2 mid = normalize(normalize(v1) + normalize(v2));
		float theta = acos(dot(v1, v2) / (length(v1) * length(v2)));
		// 右手法则，判断夹角正负
		vec3 c = cross(vv1.xyz, vv2.xyz);
		float l = offset / sin(theta * 0.5);
		return mid * l * (- sign(c.z));
	}

    // 将一个点按照给定的比率和值进行偏移，用于创建动画、调整对象位置
	vec2 getVertex(
		in vec2 origin,
		in vec2 offsetRatio,
		in vec2 offsetValue
	) {
		vec2 offset = offsetRatio * offsetValue;
		return origin + offset;
	}
   
	vec2 getFollowViewport() {
		float outViewportStatus = vertexAndEdgeOffsetValueAndNotFollowViewport.w;  // 跟随视口状态	
		vec3 f = vec3(outViewportStatus - 1.0, outViewportStatus - 2.0, outViewportStatus - 3.0);
		f = step(vec3(0.5, 0.5, 0.5), abs(f));
		return vec2(f.x * f.z, f.y * f.z);
	}

	// 获取缩放矢量
	vec2 getScaleVec(float scale, vec2 followViewport, vec2 notFollowViewport) {
		vec2 scaleVec = vec2(scale, scale);
		vec2 isVpScale = vec2(1.0, 1.0) - opacityAndDisplayAndVpScaleAndVpTrans.zz;
		vec2 dscaleVec = vec2(1.0, 1.0) / uViewportScale * scaleVec * isVpScale + scaleVec * (1.0-isVpScale);
		return dscaleVec * followViewport + scaleVec * notFollowViewport;
	}

	void main(void) {
		vec2 pv = getVertex(prevVertexAndRatio.xy, prevVertexAndRatio.zw, vertexAndEdgeOffsetValueAndNotFollowViewport.xy);
		vec2 cv = getVertex(currVertexAndRatio.xy, currVertexAndRatio.zw, vertexAndEdgeOffsetValueAndNotFollowViewport.xy);
		vec2 nv = getVertex(nextVertexAndRatio.xy, nextVertexAndRatio.zw, vertexAndEdgeOffsetValueAndNotFollowViewport.xy);
		vec2 pe = pv - cv;
		vec2 ne = nv - cv;

		// 判断是否需要乘视口矩阵
		vec2 followViewport = getFollowViewport();
		vec2 notFollowViewport = vec2(1.0, 1.0) - followViewport;

		// 各种矩阵
		mat4 rotationMatrix = getRotationMatrix(translationAndRotation.z);
		// 缩放矩阵，如果设置了脱离视口，则需要计算一个反向缩放矩阵
		mat4 scaleMatrix = getScaleMatrix(getScaleVec(isTextAndBorderWidthAndDashedAndScale.w, followViewport, notFollowViewport));
		mat4 transMat = getTranslationMatrix(translationAndRotation.xy);
		mat4 converMat = getScaleMatrix(uConversionVec2.xy);
		// 视口矩阵
		mat4 vpScaleMatrix = getScaleMatrix(uViewportScale);
		mat4 vpTranslationMatrix = getTranslationMatrix(uViewportTranslation);
		mat4 vpRotationMatrix = getRotationMatrix(uViewportRotation);
		mat4 vpMat = vpTranslationMatrix * vpScaleMatrix * converMat * vpRotationMatrix;

		// 求相邻两边交点向量
		vec2 intersection = getIntersectionVertex(pe, ne, vertexAndEdgeOffsetValueAndNotFollowViewport.z * uvAndEdgeOffsetRatio.z);

		vec4 posOrigin = transMat * scaleMatrix * rotationMatrix * vec4(cv, 0.0, 1.0);
		vec4 posBorder = rotationMatrix * vec4(intersection, 0.0, 0.0);
		posBorder = converMat * vec4(vec2(vpRotationMatrix * posBorder) * followViewport + posBorder.xy * notFollowViewport, 0, 0);
		posOrigin = vec4(vec2(vpMat * posOrigin) * followViewport + vec2(converMat * posOrigin) * notFollowViewport, 0.0, 1.0);

		gl_Position = posOrigin + posBorder;

		// out
		// 如果材质宽度为0 则标志为无材质
		vHasTexture = step(0.0, UVRect.z);
		vTexCoord = uvAndEdgeOffsetRatio.xy * UVRect.zw + UVRect.xy;
		vBgColor = backgroundColor;
		vIsText = isTextAndBorderWidthAndDashedAndScale.x;
		vTextBorderWidth = isTextAndBorderWidthAndDashedAndScale.y;
		vTextBorderColor = textBorderColor;
		vNotBorder = step(vertexAndEdgeOffsetValueAndNotFollowViewport.z, 0.0);

		vPos = rotationMatrix * vec4(cv, 0.0, 1.0); // 用于边框渲染计算
		vPos = vec4(vec2(vpRotationMatrix * vPos) * followViewport + vPos.xy * notFollowViewport, 0.0, 1.0);

		vBorderDashed = isTextAndBorderWidthAndDashedAndScale.z;
		vOpacity = opacityAndDisplayAndVpScaleAndVpTrans.x * uOpacity.x;
		vDisplay = opacityAndDisplayAndVpScaleAndVpTrans.y;
	}
`;
</pre
    >

<h3>片段着色器</h3>
<pre>
片段着色器(像素着色器)的功能就是：输出颜色；
varying vec4 v_color;
void main()
{
    gl_FragColor = v_color;
}

片段着色器(像素着色器)也是并行的，不过执行的次数不是顶点个数，而是屏幕像素个数。
假如绘制一个960x540的长方形，每一个像素点的颜色，都是通过执行一次片段着色器来得到，那么GPU需要执行960x540次

顶点数越多，顶点着色器执行次数越多。
屏幕分辨率越高，片段着色器执行次数越多。
这里可以推出手游常见的两种优化方式：减少顶点、降低分辨率

绘制一个200x200 左右大小的正方形
正方形四个顶点，顶点着色器只需要执行4次，而面对200x200个像素，片段着色器，需要执行200x200次。
只有正方形四个顶点的那四个像素，才能直接从顶点着色器拿到颜色数据，那中间的像素颜色数据从哪里来？

插值
中间的像素颜色，都是插值得到的。

左上角顶点颜色是红色，右上角顶点颜色是蓝色，可以看到中间颜色是由红色、蓝色插值混合而成。

注意：所有从顶点着色器输出到片段着色器的数据，都会插值

export const fragmentString = `
  #version 300 es
	precision mediump float;
	uniform sampler2D uSampler;
	// uniform vec2 uConversionVec2;	// 坐标转换
	in vec2 vTexCoord; // 从顶点着色器传入的纹理坐标
	in vec4 vBgColor; // 从顶点着色器传入的背景颜色
	in float vIsText;
	in float vTextBorderWidth;
	in vec4 vTextBorderColor;
	in float vHasTexture;
	in vec4 vPos;
	in float vNotBorder;
	in float vBorderDashed;
	in float vOpacity;
	in float vDisplay;
	out vec4 fragColor; // 片段着色器的输出颜色，将被用于最终的像素颜色

    // 确定一个片段是否应该被渲染为虚线边框的一部分
	float inBorderDashed() {
		// 是否绘制虚线
		float hasDashed = 1.0 - step(vBorderDashed, 0.0);
		vec2 fw = fwidth(vPos.xy);
		float k = fw.y * (1.0/fw.x);
		// 如果k在 0.95 和 1.05 之间
		float c1 = step(0.95, k) * step(k, 1.05);
		// 如果 c1 == 0.1 则 c2 = 0.0 否则 c2 = 1.0
		float c2 = 1.0 - c1;
		// 如果 c1 条件成立 则 gl_FragCoord.x 否则 ...
		float d = gl_FragCoord.x * c1 + (step(1.0, k) * gl_FragCoord.y + step(k, 1.0) * gl_FragCoord.x) * c2;
		return step(mod(floor( d * (1.0/vBorderDashed) ), 2.0), 0.0) * hasDashed;
	}

	vec4 drawText(vec4 texture) {
		// 文字边框是否大于0
		float c1 = step(0.1, vTextBorderWidth);
		// 文字边框是否小于等于0
		float c2 = 1.0 - c1;
		// 第一个插值阶梯
		float start = max(0.0, 0.5 - vTextBorderWidth * 0.1);
		// 边框插值系数
		float r1 = smoothstep(start, start + 0.2, texture.r) * c1;
		// 文字插值系数
		float r2 = smoothstep(0.5, 0.85, texture.r);

		return vec4(mix(vTextBorderColor.rgb, vBgColor.rgb, r2), r2+(1.0-r2)*r1);
	}

	vec4 drawNormal(vec4 texture, vec4 bgColor) {
		float a1 = texture.a * vHasTexture;
		float a2 = bgColor.a;
		return vec4(mix(bgColor.rgb, texture.rgb, a1), a1+(1.0-a1)*a2);
	}

	void main(void) {
        // 丢弃不显示的片段
		if(vDisplay == 0.0 || vOpacity == 0.0) {
			discard;
			return;
		}

		// ib == 0.0 则正常渲染， ib == 1.0 则渲染反色
		float ib = inBorderDashed();
		vec4 bgColor = vec4(vBgColor.rgb * (1.0 - ib) + (vec3(1.0, 1.0, 1.0) - vBgColor.rgb) * ib, vBgColor.a);

		// 材质
		vec4 tColor = texture(uSampler, vTexCoord);
		// 绘制字体
		vec4 textColor = drawText(tColor);
		// 绘制普通对象
		vec4 normalColor = drawNormal(tColor, bgColor);

		vec4 color = vIsText * textColor + (1.0 - vIsText) * normalColor;
		color.a *= vOpacity;
		fragColor = color;
	}
`;
</pre>

<div>
	<h3>贴图显示逻辑</h3>
	<pre>
顶点色能做到的效果有限，所以有另一套机制:UV坐标。
UV坐标指的是顶点对应在图片的哪个位置，仍旧拿上面的效果举例，4个顶点(左下、右下、右上、左上)分别和图片的4个角对应，那么UV坐标就是下面这样:

static const glm::vec3 Positions[6] =
{
    //第一个三角形
    { -1.0f, -1.0f, 0.0f},//左下
    {  1.0f, -1.0f, 0.0f},//右下
    {  1.0f,  1.0f, 0.0f},//右上
    //第二个三角形
    {  1.0f,  1.0f, 0.0f},//右上
    { -1.0f,  1.0f, 0.0f},//左上
    { -1.0f, -1.0f, 0.0f} //左下
};
static const glm::vec2 UVs[6] = 
{
    //第一个三角形
    {  0.0f,  0.0f},//左下
    {  1.0f,  0.0f},//右下
    {  1.0f,  1.0f},//右上
    //第二个三角形
    {  1.0f,  1.0f},//右上
    {  0.0f,  1.0f},//左上
    {  0.0f,  0.0f} //左下
}

UV坐标范围是[0,1]；顶点坐标和图片对应起来的操作，一般叫做UV映射
	</pre>
</div>

<section>
<pre>
CPU与GPU的通信方式：

CPU和GPU是一种CS模式，即客户端-服务器模式。
客户端不能直接访问服务器资源，客户端想对服务器资源进行操作，只能通过网络协议交互，由服务器进行操作。
CPU就是客户端，GPU就是服务器。

上传图片数据到显卡分为几步
1   glGenTextures	通知显卡创建纹理对象，返回句柄;
2	glBindTexture	将纹理绑定到特定纹理目标;
3	glTexImage2D	将图片rgb数据上传到GPU;

上面的API都是阻塞式的。
所以在游戏中，需要减小图片尺寸减少上传时间，需要打包图集减少上传次数

</pre>
</section>

<pre>
引擎主循环每执行一次，都需要上传顶点数据到GPU
在实际项目中是不可行的，游戏同屏顶点数普遍超过10w，每一帧都上传10w顶点数据到GPU，想想都可怕。

针对性的优化有2点：
1.减少上传数据量---- 顶点索引
2.在GPU上缓存数据---- 缓冲区对象


顶点坐标数据是一个数组，那么顶点索引就是这个数组的index; 将顶点坐标去重，然后新建数组存储下标
一个顶点，包含了顶点坐标、顶点颜色、UV坐标这三个数据
使用顶点索引(kVertexIndexVector)进行绘制，需要引入新的API - glDrawElements

glDrawElements 通过顶点索引进行绘制，大幅度减少了上传到GPU的数据，但是仍然是每一帧都上传一次。
是否可以将数据缓存在GPU，这样只需要上传一次即可？ OpenGL引入了Buffer Object，即缓冲区对象;
顶点数据上传到GPU之后，就缓存起来，后续渲染直接从显存获取,

使用缓冲区对象进行绘制分为以下步骤：
创建VBO(顶点缓冲区对象) 和 EBO(索引缓冲区对象)，并上传数据
将Shader变量和缓冲区对象进行关联
使用EBO绘制
</pre>

<p> openGL3.0 </p>
<pre>
从 #version 110 升级为 #version 330
增加了顶点数组对象(Vertex Array Object，简称VAO)
使用关键字in 替代 attribute
使用关键字out 替代varying
采样函数从texture2D变为texture
片段着色器的输出，可以使用关键字out指定自定义变量。

顶点着色器
#version 330 core
uniform mat4 u_mvp;
layout(location = 0) in  vec3 a_pos;
layout(location = 1) in  vec4 a_color;
out vec4 v_color;
void main()
{
    gl_Position = u_mvp * vec4(a_pos, 1.0);
    v_color = a_color;
};

片段着色器
#version 330 core
in vec4 v_color;
layout(location = 0) out vec4 o_fragColor;
void main()
{
    o_fragColor = v_color;
}

顶点数组对象(Vertex Array Object，简称VAO)可以减少OpenGL API的调用次数。
VAO就像一个容器，在GPU端记录了一次绘制的顶点的状态。

每次绘制时，需要绑定VBO、EBO，这就调用了2次API
//指定当前使用的VBO
glBindBuffer(GL_ARRAY_BUFFER, kVBO);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, kEBO);

// 生成一个VAO
glGenVertexArrays(1,kVAO);
glBindVertexArray(kVAO);
{
    //指定当前使用的VBO
    glBindBuffer(GL_ARRAY_BUFFER, kVBO);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, kEBO);
}
glBindBuffer(GL_ARRAY_BUFFER, 0);

在绘制的时候只要绑定VAO
glBindVertexArray(kVAO);
{
    glDrawElements(GL_TRIANGLES,36,GL_UNSIGNED_SHORT,0);//使用顶点索引进行绘制，最后的0表示数据偏移量。
}
glBindVertexArray(0);

将非动态的内容，都可以设置到VAO里面

<h3>Mesh</h3>
<p>模型就是指Mesh</p>
mesh包含一些列顶点数据，静态模型

相机的作用就是提供View、Projection这两个矩阵，MeshRenderer拿到这两个矩阵和模型世界坐标相乘得到mvp，传入GPU。
多相机渲染，就是要遍历多个相机，用当前 index 相机的View、Projection矩阵，提供给MeshRenderer拿去做计算

所谓材质，就是一系列属性的集合。
模型材质，是渲染这个模型所需要的一系列属性的集合，例如指定贴图、颜色。
物理材质，就是物体用于物理计算所需要的一系列属性的集合，例如摩擦系数、弹性系数

</pre>


<pre>
代码主逻辑：
OpenGL初始化，创建视口。
初始化着色器。
关联着色器变量和顶点数据
执行主循环

主循环：
坐标系转换
上传mvp矩阵
调用 glDrawArrays 上传顶点数据并进行绘制(这就是一个DrawCall完成)
</pre>


  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
.home {
  padding-left: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
