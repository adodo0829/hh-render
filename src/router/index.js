import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import GLSL from "@/views/GLSL.vue";
import Coord from "@/views/Coord.vue";
import Vector from "@/views/Vector.vue";
import Matrix from "@/views/Matrix.vue";
import TEST_GL_API from "@/views/TEST_GL_API.vue";

import interview from "@/views/interview/index.vue";
import html from "@/views/interview/1.html.vue";
import css from "@/views/interview/2.css.vue";

const routes = [
  {
    path: "/",
    redirect: "/GLSL",
  },
  {
    path: "/GLSL",
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
  {
    path: "/TEST_GL_API",
    name: "TEST_GL_API",
    component: TEST_GL_API,
  },
  {
    path: "/interview",
    name: "interview",
    component: interview,
    redirect: "/interview/html",
    children: [
      {
        path: "/interview/html",
        name: "html",
        component: html,
      },
      {
        path: "/interview/css",
        name: "css",
        component: css,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
