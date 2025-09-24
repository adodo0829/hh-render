<template>
  <div>
    <p>
      <button @click="handledebounce1()">防抖1,执行函数不传参</button>
      <button @click="handledebounce2('xx', { oo: 1 })">
        防抖2，执行函数传参
      </button>
      <button @click="handledebounce3()">防抖3,首次立即执行</button>
    </p>
    <p>
      <button @click="handleThrollte1()">节流1,执行函数不传参</button>
      <button @click="handleThrollte2('xx', { oo: 1 })">
        节流2，执行函数传参
      </button>
    </p>

    <div class="if">
      <iframe
        id="childFrame"
        src="http://localhost:8504/web-wcs-show-test/home"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from "@/utils";

function dbfunc(p1, p2) {
  console.log("dbfunc", p1, p2);
}

function throttleFunc(p) {
  console.log("throttle", p);
}

export default {
  name: "xxx",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handledebounce1: debounce(dbfunc, 2000),
    handledebounce2: debounce(dbfunc, 2000),
    handledebounce3: debounce(dbfunc, 2000, true),
    handleThrollte1: throttle(throttleFunc, 2000),
    handleThrollte2: throttle(throttleFunc, 2000),
  },
};
</script>

<style lang="scss">
.if {
  width: 500px;
  height: 300px;
  background-color: #ccc;
}
#childFrame {
  width: 100%;
  height: 100%;
}
</style>
