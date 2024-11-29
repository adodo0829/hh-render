import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import GLSL from "@/views/GLSL.vue";
import Coord from "@/views/Coord.vue";
import Vector from "@/views/Vector.vue";
import Matrix from "@/views/Matrix.vue";
import TEST_GL_API from "@/views/TEST_GL_API.vue";

import study from "@/views/study/index.vue";
import html from "@/views/study/1.html.vue";
import css from "@/views/study/2.css.vue";
import js from "@/views/study/3.js.vue";
import browser from "@/views/study/4.browser.vue";
import network from "@/views/study/5.network.vue";
import git from "@/views/study/6.git.vue";
import vuereact from "@/views/study/7.vue-react.vue";
import webpack from "@/views/study/8.webpack.vue";
import ts from "@/views/study/9.ts.vue";
import optimize from "@/views/study/10.optimize.vue";
import designmode from "@/views/study/11.design-mode.vue";
import aigorithm from "@/views/study/12.aigorithm.vue";
import bussiness1 from "@/views/study/13.bussiness1.vue";

import logicCode from "@/views/study/16.logicCode.vue";

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
    path: "/study",
    name: "Study",
    component: study,
    redirect: "/study/html",
    children: [
      {
        path: "/study/html",
        name: "html",
        component: html,
      },
      {
        path: "/study/css",
        name: "css",
        component: css,
      },
      {
        path: "/study/js",
        name: "js",
        component: js,
      },
      {
        path: "/study/browser",
        name: "浏览器",
        component: browser,
      },
      {
        path: "/study/network",
        name: "network",
        component: network,
      },
      {
        path: "/study/git",
        name: "Git管理",
        component: git,
      },
      {
        path: "/study/vuereact",
        name: "框架vue-react",
        component: vuereact,
      },
      {
        path: "/study/webpack",
        name: "webpack",
        component: webpack,
      },
      {
        path: "/study/ts",
        name: "ts",
        component: ts,
      },
      {
        path: "/study/optimize",
        name: "优化手段",
        component: optimize,
      },
      {
        path: "/study/designmode",
        name: "设计模式",
        component: designmode,
      },
      {
        path: "/study/aigorithm",
        name: "算法",
        component: aigorithm,
      },
      {
        path: "/study/bussiness1",
        name: "业务1",
        component: bussiness1,
      },
      {
        path: "/study/test",
        name: "logicCode",
        component: logicCode,
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
