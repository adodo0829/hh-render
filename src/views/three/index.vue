<template>
  <div class="wrapper">
    <canvas id="map"></canvas>

    <div
      id="cameraInfo"
      style="
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
      "
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, controls, raycaster, mouse;
let INTERSECTED = null;
const shelves = [];

export default {
  components: {},
  data() {
    return {
      rafId: null,
    };
  },
  mounted() {
    this.init();
    this.renderLoop();
  },
  beforeDestroy() {
    this.rafId && cancelAnimationFrame(this.rafId);
    renderer.dispose();
  },
  methods: {
    renderLoop() {
      this.rafId = window.requestAnimationFrame(this.renderLoop);
      controls.update();
      const pos = camera.position;
      const target = controls.target;

      cameraInfo.innerHTML = `
    <b>Camera Pos:</b><br/>
    x: ${pos.x.toFixed(2)},
    y: ${pos.y.toFixed(2)},
    z: ${pos.z.toFixed(2)}<br/>
    <b>Look At:</b><br/>
    x: ${target.x.toFixed(2)},
    y: ${target.y.toFixed(2)},
    z: ${target.z.toFixed(2)}
  `;

      renderer.render(scene, camera);
    },
    init() {
      let ele = document.getElementById("map");
      console.log(ele.offsetLeft, ele.offsetWidth, ele.offsetHeight);

      // 场景树
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // 相机视角
      camera = new THREE.PerspectiveCamera(
        60,
        ele.offsetWidth / ele.offsetHeight,
        0.1,
        1000
      );
      camera.position.set(30, 30, 40);

      // 渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true, canvas: ele });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(ele.offsetWidth, ele.offsetHeight);

      // 控制器
      // 平移操作：右键拖动 或者 Shift + 左键
      // 旋转操作：左键拖动
      // 缩放操作：滚动
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 灯光
      scene.add(new THREE.AmbientLight(0x888888));
      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(20, 40, 20);
      scene.add(light);

      // 仓库墙壁
      // const warehouse = new THREE.Mesh(
      //   new THREE.BoxGeometry(60, 30, 40),
      //   new THREE.MeshPhongMaterial({
      //     color: 0xcccccc,
      //     transparent: true,
      //     opacity: 0.15,
      //     side: THREE.BackSide,
      //   })
      // );
      // scene.add(warehouse);

      // 地面
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 40),
        new THREE.MeshPhongMaterial({ color: 0xdddddd })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -15;
      scene.add(floor);

      // 货架
      const shelfMaterial = new THREE.MeshPhongMaterial({ color: 0x3366cc });
      for (let i = -20; i <= 20; i += 10) {
        for (let j = -10; j <= 10; j += 10) {
          const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(4, 10, 8),
            shelfMaterial.clone()
          );
          shelf.position.set(i, -10, j);
          shelf.userData = { type: "shelf", id: `S-${i}-${j}`, capacity: 10 };
          scene.add(shelf);
          shelves.push(shelf);

          // 货物放在货架上
          for (let k = 0; k < 3; k++) {
            const cargo = new THREE.Mesh(
              new THREE.BoxGeometry(2, 2, 2),
              new THREE.MeshPhongMaterial({ color: 0xff9933 })
            );
            cargo.position.set(i, -5 + k * 2.5, j);
            cargo.userData = {
              type: "cargo",
              id: `C-${i}-${j}-${k}`,
              weight: 10 + k * 2 + "kg",
            };
            scene.add(cargo);
            shelves.push(cargo);
          }
        }
      }

      // 光线投射：用于进行鼠标拾取
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      window.addEventListener("resize", onWindowResize, false);
      window.addEventListener("click", onClick, false);

      function onWindowResize() {
        camera.aspect = ele.offsetWidth / ele.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(ele.offsetWidth, ele.offsetHeight);
      }

      function onClick(e) {
        mouse.x = ((e.clientX - ele.offsetLeft) / ele.offsetWidth) * 2 - 1;
        mouse.y = -(e.clientY / ele.offsetWidth) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(shelves);
        if (intersects.length > 0) {
          const obj = intersects[0].object;
          if (INTERSECTED) {
            INTERSECTED.material.emissive?.setHex(0x000000); // 取消高亮
          }
          INTERSECTED = obj;
          INTERSECTED.material.emissive?.setHex(0x444400); // 高亮

          // 显示信息
          console.log(obj);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
