import { createStore } from "vuex";
import github from "@/store/github.store";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    github: {
      namespaced: true,
      ...github,
    },
  },
});
