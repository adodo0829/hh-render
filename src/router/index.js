import Vue from "vue";
import VueRouter from "vue-router";
import GLSL from "@/views/GLSL.vue";

const Coord = () => import(/* webpackChunkName: "Coord" */ "@/views/Coord.vue");

const Vector = () =>
  import(/* webpackChunkName: "Vector" */ "@/views/Vector.vue");

const Matrix = () =>
  import(/* webpackChunkName: "Matrix" */ "@/views/Matrix.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GLSL",
    component: GLSL,
  },
  {
    path: "/Coord",
    name: "Coord",
    component: Coord,
  },
  {
    path: "/Vector",
    name: "Vector",
    component: Vector,
  },
  {
    path: "/Matrix",
    name: "Matrix",
    component: Matrix,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
