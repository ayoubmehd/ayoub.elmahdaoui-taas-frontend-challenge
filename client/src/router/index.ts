import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      public: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/repositories/:name?",
    name: "Repo",
    component: () => import("@/views/Repository.vue"),
  },
  {
    path: "/continue",
    name: "Continue",
    meta: {
      public: true,
    },
    component: () => import("@/views/Continue.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.meta.public) {
    const token = localStorage.getItem("token");
    if (!token) {
      return next({ name: "Home" });
    }
    const res = await fetch("/api/github/oauth/token", {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      return next({ name: "Home" });
    }
  }
  next();
});

export default router;
