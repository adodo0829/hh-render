# Three.js

## 场景

Scene https://threejs.org/docs/?q=scene#api/zh/scenes/Scene
介绍：场景能够让你在什么地方、摆放什么东西来交给 three.js 来渲染，这是你放置物体、灯光和摄像机的地方。
初始化：new THREE.Scene()

### 场景渲染

WebGLRenderer https://threejs.org/docs/#api/zh/renderers/WebGLRenderer
介绍：用 WebGL 渲染出你精心制作的场景。

初始化：new THREE.WebGLRenderer({ antialias: true });
初始化可选参数：
canvas - 一个供渲染器绘制其输出的 canvas  它和下面的 domElement 属性对应。 如果没有传这个参数，会创建一个新 canvas
context - 可用于将渲染器附加到已有的渲染环境(RenderingContext)中。默认值是 null
precision - 着色器精度. 可以是  "highp", "mediump"  或者  "lowp". 如果设备支持，默认为"highp" .
alpha - controls the default clear alpha value. When set to true, the value is 0. Otherwise it's 1. Default is false.
premultipliedAlpha - renderer 是否假设颜色有  premultiplied alpha. 默认为 true
antialias - 是否执行抗锯齿。默认为 false.
stencil - 绘图缓存是否有一个至少 8 位的模板缓存(stencil buffer)。默认为 true
preserveDrawingBuffer -是否保留缓直到手动清除或被覆盖。 默认 false.
powerPreference - 提示用户代理怎样的配置更适用于当前 WebGL 环境。 可能是"high-performance", "low-power"  或  "default"。默认是"default". 详见 WebGL spec
failIfMajorPerformanceCaveat - 检测渲染器是否会因性能过差而创建失败。默认为 false。详见  WebGL spec for details.
depth - 绘图缓存是否有一个至少 6 位的深度缓存(depth buffer )。 默认是 true.
logarithmicDepthBuffer - 是否使用对数深度缓存。如果要在单个场景中处理巨大的比例差异，就有必要使用。

### 说明文档

- 属性：
  .autoClear : Boolean
  定义渲染器是否在渲染每一帧之前自动清除其输出。
  .autoClearColor : Boolean
  如果 autoClear 为 true, 定义 renderer 是否清除颜色缓存。 默认是 true
  .autoClearDepth : Boolean
  如果 autoClear 是 true, 定义 renderer 是否清除深度缓存。 默认是 true
  .autoClearStencil : Boolean
  如果 autoClear 是 true, 定义 renderer 是否清除模板缓存. 默认是 true
  .debug : Object
  - checkShaderErrors: 如果为 true，定义是否检查材质着色器程序 编译和链接过程中的错误。 禁用此检查生产以获得性能增益可能很有用。 强烈建议在开发期间保持启用这些检查。 如果着色器没有编译和链接 - 它将无法工作，并且相关材料将不会呈现。 默认是 true
  .domElement : DOMElement
  一个 canvas，渲染器在其上绘制输出。
  渲染器的构造函数会自动创建(如果没有传入 canvas 参数);你需要做的仅仅是像下面这样将它加页面里去:
  document.body.appendChild( renderer.domElement );

- 方法：
  .clear ( color : Boolean, depth : Boolean, stencil : Boolean ) : undefined
  告诉渲染器清除颜色、深度或模板缓存. 此方法将颜色缓存初始化为当前颜色。参数们默认都是 true
  .clearColor ( ) : undefined
  清除颜色缓存。 相当于调用.clear( true, false, false )
  .clearDepth ( ) : undefined
  清除深度缓存。相当于调用.clear( false, true, false )
  .clearStencil ( ) : undefined
  清除模板缓存。相当于调用.clear( false, false, true )
  .compile ( scene : Object3D, camera : Camera ) : undefined
  使用相机编译场景中的所有材质。这对于在首次渲染之前预编译着色器很有用。
  .dispose ( ) : undefined
  处理当前的渲染环境
  .getClearAlpha () : Float
  返回一个表示当前 alpha 值的 float，范围 0 到 1
  .getClearColor ( target : Color ) : Color
  返回一个表示当前颜色值的 THREE.Color 实例
  .getContext () : WebGL2RenderingContext
  返回当前 WebGL 环境
  .getContextAttributes () : WebGLContextAttributes
  返回一个对象，这个对象中存有在 WebGL 环境在创建的时候所设置的属性
  .getRenderTarget () : RenderTarget
  如果当前存在 RenderTarget，则返回该值；否则返回 null。
  .getCurrentViewport () : RenderTarget
  返回当前视口
  .getDrawingBufferSize () : Object
  返回一个包含渲染器绘图缓存宽度和高度(单位像素)的对象。
  .getPixelRatio () : number
  返回当前使用设备像素比
  .getSize ( target : Vector2 ) : Vector2
  返回包含渲染器输出 canvas 的宽度和高度(单位像素)的对象。
  .resetGLState ( ) : undefined
  将 GL 状态重置为默认值。WebGL 环境丢失时会内部调用
  .render ( scene : Object3D, camera : Camera ) : undefined
  用相机(camera)渲染一个场景(scene)或是其它类型的 object。
  渲染一般是在 canvas 上完成的，或者是 renderTarget(如果有指定)
  如果 forceClear 值是 true，那么颜色、深度及模板缓存将会在渲染之前清除，即使渲染器的 autoClear 属性值是 false
  即便 forceClear 设为 true, 也可以通过将 autoClearColor、autoClearStencil 或 autoClearDepth 属性的值设为 false 来阻止对应缓存被清除。
  .resetState () : undefined
  可用于重置内部 WebGL 状态。此方法主要与跨多个 WebGL 库共享单个 WebGL 上下文的应用程序相关。
  .setClearAlpha ( alpha : Float ) : undefined
  设置 alpha。合法参数是一个 0.0 到  1.0 之间的浮点数
  .setClearColor ( color : Color, alpha : Float ) : undefined
  设置颜色及其透明度
  .setPixelRatio ( value : number ) : undefined
  设置设备像素比。通常用于避免 HiDPI 设备上绘图模糊
  .setRenderTarget ( renderTarget : WebGLRenderTarget, activeCubeFace : Integer, activeMipmapLevel : Integer ) : undefined
  renderTarget -- 需要被激活的 renderTarget(可选)。若此参数为空，则将 canvas 设置成活跃 render target。
  activeCubeFace -- Specifies the active cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) of WebGLCubeRenderTarget. When passing a WebGLArrayRenderTarget or WebGL3DRenderTarget this indicates the z layer to render in to (optional).
  activeMipmapLevel -- Specifies the active mipmap level (optional).

该方法设置活跃 rendertarget。
.setScissor ( x : Integer, y : Integer, width : Integer, height : Integer ) : undefined
将剪裁区域设为(x, y)到(x + width, y + height) Sets the scissor area from
.setScissorTest ( boolean : Boolean ) : undefined
启用或禁用剪裁检测. 若启用，则只有在所定义的裁剪区域内的像素才会受之后的渲染器影响。
.setSize ( width : Integer, height : Integer, updateStyle : Boolean ) : undefined
将输出 canvas 的大小调整为(width, height)并考虑设备像素比，且将视口从(0, 0)开始调整到适合大小 将 updateStyle 设置为 false 以阻止对 canvas 的样式做任何改变。
.setViewport ( x : Integer, y : Integer, width : Integer, height : Integer ) : undefined
将视口大小设置为(x, y)到 (x + width, y + height).

## 3D 立体框

LineSegments = （LineBasicMaterial/LineDashedMaterial) + BufferGeometry  https://threejs.org/docs/?q=LineSegments#api/zh/objects/LineSegments
介绍：在若干对的顶点之间绘制的一系列的线。
初始化：
let geometry =newTHREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([line1StartX,line1StartY,line1StartZ,line1EndX,line1EndY,line1EndZ], 3));

let material = new THREE.LineBasicMaterial();
let line = new THREE.LineSegments(geometry , material);
说明文档
构造器
LineSegments( geometry : BufferGeometry, material : Material )
geometry —— 表示每条线段的两个顶点。
material —— 线的材质，默认值是 LineBasicMaterial。
属性
共有属性请参见其基类 Object3D。
.geometry : BufferGeometry
表示线段的顶点。
.isLine : Boolean
Read-only flag to check if a given object is of type Line.
.isLineSegments : Boolean
Read-only flag to check if a given object is of type LineSegments.
.material : Material 线的材质。

## 点组

Group = Mesh(BoxGeometry+ LineBasicMaterial) + Line(BufferGeometry + LineBasicMaterial) https://threejs.org/docs/?q=Group#api/zh/objects/Group
介绍：它几乎和 Object3D 是相同的，其目的是使得组中对象在语法上的结构更加清晰。
初始化：const group = new THREE.Group();
group.add(mesh);
group.add(line);
属性
共有属性请参见其基类 Object3D。
.isGroup : Boolean
Read-only flag to check if a given object is of type Group.
.type : String
一个字符串：“Group”。这个属性不应当被改变。

## 点云

Points = BufferGeometry + PointsMaterial https://threejs.org/docs/?q=Points#api/zh/objects/Points
介绍：一个用于显示点云的类。
初始化：
const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(center.x, center.y, center.z), radius);
    const material = new THREE.PointsMaterial({
      vertexColors: true,
    });
    material.sizeAttenuation = false;
    new THREE.Points(geometry, material);
属性
共有属性请参见其基类 Object3D。
.geometry : BufferGeometry
一个 BufferGeometry 的实例（或者派生类），定义了物体的结构。
.isPoints : Boolean
Read-only flag to check if a given object is of type Points.
.material : Material
Material 的实例。定义了物体的外观。默认值是一个的 PointsMaterial。

## ROI

圆形  Line = ArcCurve + LineBasicMaterial https://threejs.org/docs/?q=Line#api/zh/objects/Line
初始化：
  const arc = new THREE.ArcCurve(0, 0, radius, 0, 2 \* Math.PI)
  const points2 = arc.getPoints(128);
  // 转成 3 维的点
  const points3 = points2.map(item => { return new THREE.Vector3(item.x, item.y, 1) });
  geometry = new THREE.BufferGeometry ();
  geometry.setFromPoints(points3);

const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ linewidth: 1 }));

矩形  Line = BufferGeometry + LineBasicMaterial https://threejs.org/docs/?q=Line#api/zh/objects/Line
初始化：
  const material = new THREE.LineBasicMaterial({ color: 0xfff400 });
  const geometry = new THREE.BufferGeometry ();
  const xLen = roiConfig.rangeX[1]-roiConfig.rangeX[0];
  const yLen = roiConfig.rangeY[1]-roiConfig.rangeY[0];
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(xLen, 0, 0));
  points.push(new THREE.Vector3(xLen, yLen, 0));
  points.push(new THREE.Vector3(0, yLen, 0));
  points.push(new THREE.Vector3(0, 0, 0));

geometry.setFromPoints(points)
  const line = new THREE.Line(geometry, material);
  line.position.x = roiConfig.rangeX[0];
  line.position.y = roiConfig.rangeY[0];
  line.position.z = 0;

## 立体矩形  

LineSegments = LineBasicMaterial + BufferGeometry  https://threejs.org/docs/?q=LineSegments#api/zh/objects/LineSegments

初始化：
  let x_min = roiConfig.rangeX[0];
  let y_min = roiConfig.rangeY[0];
  let z_min = roiConfig.rangeZ ? roiConfig.rangeZ[0] : -0.3;
  let x_max = roiConfig.rangeX[1];
  let y_max = roiConfig.rangeY[1];
  let z_max = roiConfig.rangeZ ? roiConfig.rangeZ[1] : 2.5;

const center = {
    x: (x_max + x_min) / 2,
    y: (y_max + y_min) / 2,
    z: (z_max + z_min) / 2,
  };

const scale = {
    x: x_max - x_min,
    y: y_max - y_min,
    z: z_max - z_min,
  };
let geometry =newTHREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(cubeBodyPointsArr, 3));
let material = new THREE.LineBasicMaterial();
let line = new THREE.LineSegments(geometry , material);
line.position.x = center.x
line.position.y = center.y
line.position.z = center.z
line.scale .x = scale .x
line.scale .y = scale .y
line.scale .z = scale .z

## 相机

透视相机（默认视图）PerspectiveCamera 
https://threejs.org/docs/?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera

介绍：这一摄像机使用 perspective projection（透视投影）来进行投影。这一投影模式被用来模拟人眼所看到的景象，它是 3D 场景的渲染中使用得最普遍的投影模式。
初始化：
  let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 800);
  camera.position.x = 0;
  camera.position.z = 50;
  camera.position.y = 0;
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

说明文档
构造器
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
fov — 摄像机视锥体垂直视野角度
aspect — 摄像机视锥体长宽比
near — 摄像机视锥体近端面
far — 摄像机视锥体远端面
这些参数一起定义了摄像机的 viewing frustum（视锥体）。

属性
共有属性请参见其基类  Camera 。
请注意，在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix 来使得这些改变生效。
.aspect : Float
摄像机视锥体的长宽比，通常是使用画布的宽/画布的高。默认值是 1（正方形画布）。
.far : Float
摄像机的远端面，默认值是 2000。

该值必须大于 near plane（摄像机视锥体近端面）的值。
.filmGauge : Float
胶片尺寸，其默认值为 35（毫米）。 这个参数不会影响摄像机的投影矩阵，除非.filmOffset 被设置为了一个非零的值。
.filmOffset : Float
水平偏离中心偏移量，和.filmGauge 单位相同。默认值为 0。
.focus : Float
用于立体视觉和景深效果的物体的距离。 这个参数不会影响摄像机的投影矩阵，除非使用了 StereoCamera。 默认值是 10。
.fov : Float
摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示。默认值是 50。
.isPerspectiveCamera : Boolean
Read-only flag to check if a given object is of type PerspectiveCamera.
.near : Float
摄像机的近端面，默认值是 0.1。

其有效值范围是 0 到当前摄像机 far plane（远端面）的值之间。 请注意，和 OrthographicCamera 不同，0 对于 PerspectiveCamera 的近端面来说不是一个有效值。
.view : Object
Frustum window specification or null. 这个值使用.setViewOffset 方法来进行设置，使用.clearViewOffset 方法来进行清除。
.zoom : number
获取或者设置摄像机的缩放倍数，其默认值为 1。

方法
共有方法请参见其基类 Camera。
.clearViewOffset () : undefined
清除任何由.setViewOffset 设置的偏移量。
.getEffectiveFOV () : Float
结合.zoom（缩放倍数），以角度返回当前垂直视野角度。
.getFilmHeight () : Float
返回当前胶片上图像的高，如果.aspect 小于或等于 1（肖像格式、纵向构图），则结果等于.filmGauge。
.getFilmWidth () : Float
返回当前胶片上图像的宽，如果.aspect 大于或等于 1（景观格式、横向构图），则结果等于.filmGauge。
.getFocalLength () : Float
返回当前.fov（视野角度）相对于.filmGauge（胶片尺寸）的焦距。
.setFocalLength ( focalLength : Float ) : undefined
通过相对于当前.filmGauge 的焦距，设置 FOV。

默认情况下，焦距是为 35mm（全画幅）摄像机而指定的。
.setViewOffset ( fullWidth : Float, fullHeight : Float, x : Float, y : Float, width : Float, height : Float ) : undefined
fullWidth — 多视图的全宽设置
fullHeight — 多视图的全高设置
x — 副摄像机的水平偏移
y — 副摄像机的垂直偏移
width — 副摄像机的宽度
height — 副摄像机的高度
在较大的 viewing frustum（视锥体）中设置偏移量，对于多窗口或者多显示器的设置是很有用的。
.updateProjectionMatrix () : undefined
更新摄像机投影矩阵。在任何参数被改变以后必须被调用。

正交相机（鸟瞰视图）
OrthographicCamera https://threejs.org/docs/?q=OrthographicCamera#api/zh/cameras/OrthographicCamera
介绍：这一摄像机使用 orthographic projection（正交投影）来进行投影。在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染 2D 场景或者 UI 元素是非常有用的。
初始化：
  let width = window.innerWidth;
  let height = window.innerHeight;
  let asp = width / height;

camera = new THREE.OrthographicCamera(-asp _ 200, asp _ 200, 200, -200, -200, 200);
  camera.position.z = 50;

// 给 OrbitControls 翻面的参数 不能改 改了就废
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

说明文档
构造器
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
left — 摄像机视锥体左侧面。
right — 摄像机视锥体右侧面。
top — 摄像机视锥体上侧面。
bottom — 摄像机视锥体下侧面。
near — 摄像机视锥体近端面。
far — 摄像机视锥体远端面。

这些参数一起定义了摄像机的 viewing frustum（视锥体）。
属性
共有属性请参见其基类 Camera。
请注意，在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix 来使得这些改变生效。
.bottom : Float
摄像机视锥体下侧面。
.far : Float
摄像机视锥体远端面，其默认值为 2000。

该值必须大于 near plane（摄像机视锥体近端面）的值。
.isOrthographicCamera : Boolean
Read-only flag to check if a given object is of type OrthographicCamera.
.left : Float
摄像机视锥体左侧面。
.near : Float
摄像机视锥体近端面。其默认值为 0.1.

其值的有效范围介于 0 和 far（摄像机视锥体远端面）之间。
请注意，和 PerspectiveCamera 不同，0 对于 OrthographicCamera 的近端面来说是一个有效值。
.right : Float
摄像机视锥体右侧面。
.top : Float
摄像机视锥体上侧面。
.view : Object
这个值是由 setViewOffset 来设置的，其默认值为 null。
.zoom : number
获取或者设置摄像机的缩放倍数，其默认值为 1。
方法
共有方法请参见其基类 Camera。
.setViewOffset ( fullWidth : Float, fullHeight : Float, x : Float, y : Float, width : Float, height : Float ) : undefined
fullWidth — 多视图的全宽设置
fullHeight — 多视图的全高设置
x — 副摄像机的水平偏移
y — 副摄像机的垂直偏移
width — 副摄像机的宽度
height — 副摄像机的高度

在较大的 viewing frustum（视锥体）中设置偏移量，对于多窗口或者多显示器的设置是很有用的。 对于如何使用它，请查看 PerspectiveCamera 中的示例。
.clearViewOffset () : undefined
清除任何由.setViewOffset 设置的偏移量。
.updateProjectionMatrix () : undefined
更新摄像机投影矩阵。在任何参数被改变以后必须被调用。

补充说明（继承自 Object3D 的属性及方法）：
.up : Vector3
这个属性由 lookAt 方法所使用，例如，来决定结果的朝向。 默认值是 Object3D.DEFAULT_UP，即( 0, 1, 0 )。
.lookAt ( vector : Vector3 ) : undefined
.lookAt ( x : Float, y : Float, z : Float ) : undefined
vector - 一个表示世界空间中位置的向量。

也可以使用世界空间中 x、y 和 z 的位置分量。

旋转物体使其在世界空间中面朝一个点。

这一方法不支持其父级被旋转过或者被位移过的物体。

## 相机轨道控制器

OrbitControls https://threejs.org/docs/?q=TransformControls#examples/zh/controls/OrbitControls
介绍：Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。要使用这一功能，就像在/examples（示例）目录中的所有文件一样， 您必须在 HTML 中包含这个文件。OrbitControls 是一个附加组件，必须显式导入。
初始化：
  let orbit = new OrbitControls(camera, dom);
  orbit.screenSpacePanning = false
  orbit.update();
  orbit.addEventListener('change', () => {
    render();
  });
  orbit.addEventListener('end', () => {
    render();
  });
  orbit.enabled = true;

说明文档
构造器
OrbitControls( object : Camera, domElement : HTMLDOMElement )
object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。

domElement: 用于事件监听的 HTML 元素。

事件
change
Fires when the camera has been transformed by the controls.
start
Fires when an interaction was initiated.
end
Fires when an interaction has finished.
属性
.autoRotate : Boolean
将其设为 true，以自动围绕目标旋转。
请注意，如果它被启用，你必须在你的动画循环里调用.update()。
.autoRotateSpeed : Float
当.autoRotate 为 true 时，围绕目标旋转的速度将有多快，默认值为 2.0，相当于在 60fps 时每旋转一周需要 30 秒。
请注意，如果.autoRotate 被启用，你必须在你的动画循环里调用.update()。
.dampingFactor : Float
当.enableDamping 设置为 true 的时候，阻尼惯性有多大。 Default is 0.05.
请注意，要使得这一值生效，你必须在你的动画循环里调用.update()。
.domElement : HTMLDOMElement
该 HTMLDOMElement 用于监听鼠标/触摸事件，该属性必须在构造函数中传入。在此处改变它将不会设置新的事件监听。
.enabled : Boolean
当设置为 false 时，控制器将不会响应用户的操作。默认值为 true。
.enableDamping : Boolean
将其设置为 true 以启用阻尼（惯性），这将给控制器带来重量感。默认值为 false。
请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
.enablePan : Boolean
启用或禁用摄像机平移，默认为 true。
.enableRotate : Boolean
启用或禁用摄像机水平或垂直旋转。默认值为 true。
请注意，可以通过将 polar angle 或者 azimuth angle  的 min 和 max 设置为相同的值来禁用单个轴， 这将使得水平旋转或垂直旋转固定为所设置的值。
.enableZoom : Boolean
启用或禁用摄像机的缩放。
.keyPanSpeed : Float
当使用键盘按键的时候，相机平移的速度有多快。默认值为每次按下按键时平移 7 像素。
.keys : Object
这一对象包含了用于控制相机平移的按键代码的引用。默认值为 4 个箭头（方向）键。controls.keys = { LEFT: 'ArrowLeft', //left arrow UP: 'ArrowUp', // up arrow RIGHT: 'ArrowRight', // right arrow BOTTOM: 'ArrowDown' // down arrow }请参阅 KeyboardEvent.code 来查看所有按键的代码列表。
.maxAzimuthAngle : Float
你能够水平旋转的角度上限。如果设置，其有效值范围为[-2 * Math.PI，2 * Math.PI]，且旋转角度的上限和下限差值小于 2 _ Math.PI。默认值为无穷大。
.maxDistance : Float
你能够将相机向外移动多少（仅适用于 PerspectiveCamera），其默认值为 Infinity。
.maxPolarAngle : Float
你能够垂直旋转的角度的上限，范围是 0 到 Math.PI，其默认值为 Math.PI。
.maxZoom : Float
你能够将相机缩小多少（仅适用于 OrthographicCamera），其默认值为 Infinity。
.minAzimuthAngle : Float
你能够水平旋转的角度下限。如果设置，其有效值范围为[-2 _ Math.PI，2 _ Math.PI]，且旋转角度的上限和下限差值小于 2 _ Math.PI。默认值为无穷大。
.minDistance : Float
你能够将相机向内移动多少（仅适用于 PerspectiveCamera），其默认值为 0。
.minPolarAngle : Float
你能够垂直旋转的角度的下限，范围是 0 到 Math.PI，其默认值为 0。
.minZoom : Float
你能够将相机放大多少（仅适用于 OrthographicCamera），其默认值为 0。
.mouseButtons : Object
该对象包含由控件所使用的鼠标操作的引用。controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
.object : Camera
正被控制的摄像机。
.panSpeed : Float
位移的速度，其默认值为 1。
.position0 : Vector3
由.saveState 和.reset 方法在内部使用。
.rotateSpeed : Float
旋转的速度，其默认值为 1。
.screenSpacePanning : Boolean
定义当平移的时候摄像机的位置将如何移动。如果为 true，摄像机将在屏幕空间内平移。 否则，摄像机将在与摄像机向上方向垂直的平面中平移。当使用 OrbitControls 时， 默认值为 true；当使用 MapControls 时，默认值为 false。
.target0 : Vector3
由.saveState 和.reset 方法在内部使用。
.target : Vector3
控制器的焦点，.object 的轨道围绕它运行。 它可以在任何时候被手动更新，以更改控制器的焦点。
.touches : Object
该对象包含由控件所使用的触摸操作的引用。controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }
.zoom0 : Float
由.saveState 和.reset 方法在内部使用。
.zoomSpeed : Float
摄像机缩放的速度，其默认值为 1。
Methods
.dispose () : undefined
移除所有的事件监听。
.getAzimuthalAngle () : radians
获得当前的水平旋转，单位为弧度。
.getPolarAngle () : radians
获得当前的垂直旋转，单位为弧度。
.getDistance () : Float
Returns the distance from the camera to the target.
.listenToKeyEvents ( domElement : HTMLDOMElement ) : undefined
为指定的 DOM 元素添加按键监听。推荐将 window 作为指定的 DOM 元素。
.reset () : undefined
将控制器重置为上次调用.saveState 时的状态，或者初始状态。
.saveState () : undefined
保存当前控制器的状态。这一状态可在之后由.reset 所恢复。
.stopListenToKeyEvents () : undefined
Removes the key event listener previously defined with .listenToKeyEvents().
.update () : Boolean
更新控制器。必须在摄像机的变换发生任何手动改变后调用， 或如果.autoRotate 或.enableDamping 被设置时，在 update 循环里调用。

## 标注物变换控制器

TransformControls https://threejs.org/docs/?q=TransformControls#examples/zh/controls/TransformControls
介绍：该类可提供一种类似于在数字内容创建工具（例如 Blender）中对模型进行交互的方式，来在 3D 空间中变换物体。 和其他控制器不同的是，变换控制器不倾向于对场景摄像机的变换进行改变。TransformControls 期望其所附加的 3D 对象是场景图的一部分。TransformControls 是一个附加组件，必须显式导入。 See Installation / Addons.
初始化：
let transformControl = new TransformControls(camera, dom);
  transformControl.setSpace('local');
  transformControl.addEventListener('mouseDown', (e) => {
    // MoveStart
    const { mode, target } = e;
    onBoxChangeStart(target, mode);
  });

transformControl.addEventListener('mouseUp', (e) => {
    // MoveEnd
    const { mode, target } = e;
    onBoxChangeEnd(target, mode);
  });

transformControl.addEventListener('change', () => render());
  transformControl.addEventListener('objectChange', function (e) {
    debounceOnBoxChanged(e.target.object);
  });

transformControl.addEventListener('dragging-changed', function (event) {
    orbit.enabled = !event.value;
  });

说明文档
构造函数
TransformControls( camera : Camera, domElement : HTMLDOMElement )
camera: 被控制的摄像机。
domElement: 用于事件监听的 HTML 元素。
创建一个新的 TransformControls 实例。

事件
change
如果发生了任何类型的改变（对象或属性的改变）则触发该事件。 属性改变是单独的事件，你也可以为此添加单独的事件监听；该事件类型为"propertyname-changed"（“属性名称-changed”）。
mouseDown
如果指针（鼠标/触摸）为活动状态则触发该事件。
mouseUp
如果指针（鼠标/触摸）不再为活动状态则触发该事件。
objectChange
如果被控制的 3D 对象发生改变则触发该事件。
属性
共有属性请参见其基类 Object3D。
.axis : String
当前变换轴。
.camera : Camera
渲染场景的摄像机。
.domElement : HTMLDOMElement
该 HTMLDOMElement 用于监听鼠标/触摸事件，该属性必须在构造函数中传入。在此处改变它将不会设置新的事件监听。
.dragging : Boolean
当前是否正在拖动。只读属性。
.enabled : Boolean
是否启用控制器。默认为 true。
.mode : String
当前的变换模式。可能的值包括"translate"、"rotate" 和 "scale"。默认为 translate。
.object : Object3D
正在被控制的 3D 对象。
.rotationSnap : Number
默认情况下，3D 对象是可以被连续旋转的。如果你将该值设为一个数值（弧度），则你将可以定义每次旋转 3D 对象时的步幅。 默认为 null。
.showX : Boolean
x 轴手柄是否显示。默认为 true。
.showY : Boolean
y 轴手柄是否显示。默认为 true。
.showZ : Boolean
z 轴手柄是否显示。默认为 true。
.size : Number
手柄 UI（轴/平面）的大小。默认为 1。
.space : String
定义了在哪种坐标空间中进行变换。可能的值有"world" 和 "local"。默认为 world。
.translationSnap : Number
默认情况下，3D 对象是可以被连续平移的。如果你将该值设为一个数值（世界单位），则你将可以定义每次平移 3D 对象时的步幅。 默认为 null。
方法
共有方法请参见其基类 Object3D。
.attach ( object : Object3D ) : TransformControls
object: 应当变换的 3D 对象。
设置应当变换的 3D 对象，并确保控制器 UI 是可见的。
.detach () : TransformControls
从控制器中移除当前 3D 对象，并确保控制器 UI 是不可见的。
.dispose () : undefined
若不再需要该控制器，则应当调用此函数。
.getRaycaster () : Raycaster
返回用于用户交互的  Raycaster  对象。 此对象在所有实例之间共享 变换控件。 如果您设置 TransformControls 的  .layers  属性，您还需要 使用匹配值设置  Raycaster  上的  .layers  属性，否则设置 TransformControls 不会按预期工作。
.getMode () : String
返回变换模式。
.setMode ( mode : String ) : undefined
mode: 变换模式。
设置变换模式。
.setRotationSnap ( rotationSnap : Number ) : undefined
rotationSnap: 旋转捕捉步幅。
设置旋转捕捉。
.setSize ( size : Number ) : undefined
size: 手柄 UI 的大小。
设置手柄 UI 的大小。
.setSpace ( space : String ) : undefined
space: 应用变换的坐标空间。
设置应用变换的坐标空间。
.setTranslationSnap ( translationSnap : Number ) : undefined
translationSnap: 平移捕捉步幅。
设置平移捕捉。

## 场景中的选中

Raycaster https://threejs.org/docs/?q=Raycaster#api/zh/core/Raycaster
介绍：这个类用于进行 raycasting（光线投射）。
光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

初始化：
const raycaster = new THREE.Raycaster();
// 控制对于各种类型对象的投射范围
raycaster.params.Points.threshold = 5;
raycaster.params.Line.threshold = 0.5;
// 通过摄像机和鼠标位置更新射线
raycaster.setFromCamera( pointer, camera );
// 计算物体和射线的焦点
const intersects = raycaster.intersectObjects( scene.children );

说明文档
构造器
Raycaster( origin : Vector3, direction : Vector3, near : Float, far : Float )
origin —— 光线投射的原点向量。
direction —— 向射线提供方向的方向向量，应当被标准化。
near —— 返回的所有结果比 near 远。near 不能为负值，其默认值为 0。
far —— 返回的所有结果都比 far 近。far 不能小于 near，其默认值为 Infinity（正无穷。）
这将创建一个新的 raycaster 对象。
属性
.far : Float
raycaster 的远距离因数（投射远点）。这个值表明哪些对象可以基于该距离而被 raycaster 所丢弃。 这个值不应当为负，并且应当比 near 属性大。
.near : Float
raycaster 的近距离因数（投射近点）。这个值表明哪些对象可以基于该距离而被 raycaster 所丢弃。 这个值不应当为负，并且应当比 far 属性小。
.camera : Camera
The camera to use when raycasting against view-dependent objects such as billboarded objects like Sprites. This field can be set manually or is set when calling "setFromCamera". Defaults to null.
.layers : Layers
Used by Raycaster to selectively ignore 3D objects when performing intersection tests. The following code example ensures that only 3D objects on layer 1 will be honored by the instance of Raycaster.raycaster.layers.set( 1 ); object.layers.enable( 1 );
.params : Object
具有以下属性的对象：{ Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} }Where threshold is the precision of the raycaster when intersecting objects, in world units.
.ray : Ray
用于进行光线投射的 Ray（射线）。
方法
.set ( origin : Vector3, direction : Vector3 ) : undefined
origin —— 光线投射的原点向量。
direction —— 为光线提供方向的标准化方向向量。
使用一个新的原点和方向来更新射线。
.setFromCamera ( coords : Vector2, camera : Camera ) : undefined
coords —— 在标准化设备坐标中鼠标的二维坐标 —— X 分量与 Y 分量应当在-1 到 1 之间。
camera —— 射线所来源的摄像机。
使用一个新的原点和方向来更新射线。
.intersectObject ( object : Object3D, recursive : Boolean, optionalTarget : Array ) : Array
object —— 检查与射线相交的物体。
recursive —— 若为 true，则同时也会检查所有的后代。否则将只会检查对象本身。默认值为 true。
optionalTarget — （可选）设置结果的目标数组。如果不设置这个值，则一个新的 Array 会被实例化；如果设置了这个值，则在每次调用之前必须清空这个数组（例如：array.length = 0;）。

检测所有在射线与物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个。
该方法返回一个包含有交叉部分的数组:
[ { distance, point, face, faceIndex, object }, ... ]
distance —— 射线投射原点和相交部分之间的距离。
point —— 相交部分的点（世界坐标）
face —— 相交的面
faceIndex —— 相交的面的索引
object —— 相交的物体
uv —— 相交部分的点的 UV 坐标。
uv1 —— Second set of U,V coordinates at point of intersection
normal - 交点处的内插法向量
instanceId – The index number of the instance where the ray intersects the InstancedMesh
当计算这条射线是否和物体相交的时候，Raycaster 将传入的对象委托给 raycast 方法。 这将可以让 mesh 对于光线投射的响应不同于 lines 和 pointclouds。
请注意：对于网格来说，面必须朝向射线的原点，以便其能够被检测到。 用于交互的射线穿过面的背侧时，将不会被检测到。如果需要对物体中面的两侧进行光线投射， 你需要将 material 中的 side 属性设置为 THREE.DoubleSide。
.intersectObjects ( objects : Array, recursive : Boolean, optionalTarget : Array ) : Array

- objects —— 检测和射线相交的一组物体。
- recursive —— 若为 true，则同时也会检测所有物体的后代。否则将只会检测对象本身的相交部分。默认值为 true。
- optionalTarget —— （可选）设置结果的目标数组。如果不设置这个值，则一个新的 Array 会被实例化；如果设置了这个值，则在每次调用之前必须清空这个数组（例如：array.length = 0;）。

  检测所有在射线与这些物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个），相交部分和.intersectObject 所返回的格式是相同的。

## 3D 框相交判断

OBB https://threejs.org/docs/?q=OBB#examples/en/math/OBB
介绍：Represents an oriented bounding box (OBB) in 3D space. OBB 是一个附加组件，必须显式导入。 See Installation / Addons.
初始化：

```js
const obb = new OBB(undefined, new THREE.Vector3(0.5, 0.5, 0.5));
const anotherBoxObb = new OBB(undefined, new THREE.Vector3(0.5, 0.5, 0.5));
obb.applyMatrix4(box.matrixWorld);
anotherBoxObb.applyMatrix4(anotherBox.matrixWorld);
const res = obb.intersectsOBB(anotherBoxObb);
```

说明文档
Constructor
OBB( center : Vector3, halfSize : Vector3, rotation : Matrix3 )

- center — The center of the OBB. (optional)
- halfSize — Positive halfwidth extents of the OBB along each axis. (optional)
- rotation — The rotation of the OBB. (optional)
  Creates a new OBB.

Properties
.center : Vector3
The center of the OBB. Default is ( 0, 0, 0 ).
.halfSize : Vector3
Positive halfwidth extents of the OBB along each axis. Default is ( 0, 0, 0 ).
.rotation : Matrix3
The rotation of the OBB. Default is the identity matrix.

Methods
.applyMatrix4 ( matrix : Matrix4 ) : this
matrix — A 4x4 transformation matrix.
Applies the given transformation matrix to this OBB. This method can be used to transform the bounding volume with the world matrix of a 3D object in order to keep both entities in sync.

.clampPoint ( point : Vector3, clampedPoint : Vector3 ) : Vector3
point — The point that should be clamped within the bounds of this OBB.
clampedPoint — The result will be copied into this vector.
Clamps the given point within the bounds of this OBB.

.clone () : OBB
Creates a cloned OBB for this instance.

.containsPoint ( point : Vector3 ) : Boolean
point — The point to test.
Whether the given point lies within this OBB or not.

.copy ( obb : OBB ) : this
obb — The OBB to copy.
Copies the properties of the given OBB to this OBB.

.equals ( obb : OBB ) : Boolean
obb — The OBB to test.
Whether the given OBB is equal to this OBB or not.

.fromBox3 ( box3 : Box3 ) : this
box3 — An AABB.
Defines an OBB based on the given AABB.

.getSize ( size : Vector3 ) : Vector3
size — The result will be copied into this vector.
Returns the size of this OBB into the given vector.

.intersectsBox3 ( box3 : Box3 ) : Boolean
box3 — The AABB to test.
Whether the given AABB intersects this OBB or not.

.intersectsSphere ( sphere : Sphere ) : Boolean
sphere — The bounding sphere to test.
Whether the given bounding sphere intersects this OBB or not.

.intersectsOBB ( obb : OBB, epsilon : Number ) : Boolean
obb — The OBB to test.
epsilon — An optional numeric value to counteract arithmetic errors. Default is Number.EPSILON.
Whether the given OBB intersects this OBB or not.

.intersectsRay ( ray : Ray ) : Boolean
ray — The ray to test.
Whether the given ray intersects this OBB or not.

.intersectRay ( ray : Ray, intersectionPoint : Vector3 ) : Vector3
ray — The ray to test.
intersectionPoint — The result will be copied into this vector.
Performs a Ray/OBB intersection test and stores the intersection point to the given 3D vector. If no intersection is detected, null is returned.

.set ( center : Vector3, halfSize : Vector3, rotation : Matrix3 ) : this
center — The center of the OBB.
halfSize — Positive halfwidth extents of the OBB along each axis.
rotation — The rotation of the OBB.
Defines the OBB for the given values.
