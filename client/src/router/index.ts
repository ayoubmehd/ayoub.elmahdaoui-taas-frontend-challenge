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
  const token = localStorage.getItem("token");

  // if the route is public and token exist redirect to non public route
  if (token && to.meta.public) {
    return next({ name: "Repo" });
  }

  if (!to.meta.public) {
    if (!token) {
      return next({ name: "Home" });
    }

    // verify that the stored token is valid
    const res = await fetch("/api/github/oauth/token", {
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    // if token not valid remove it and redirect to home
    if (res.status !== 200) {
      localStorage.removeItem("token");
      return next({ name: "Home" });
    }
  }
  next();
});

export default router;
