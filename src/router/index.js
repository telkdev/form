import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import { checkIsInitialized } from "../helpers/localStorageProvider";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "text-yellow-300 underline",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "about") {
    const isInitialized = checkIsInitialized();

    if (!isInitialized) {
      next({ name: "about" });
    } else next();
  } else next();
});

export default router;
