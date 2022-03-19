import { createStore } from "vuex";
import github from "@/store/github.store";
import repo from "@/store/repo.store";

export interface StoreRootState {
  alertMessage: string;
  showAlert: boolean;
  token: string;
  user: { login: string } | null;
}

export default createStore<StoreRootState>({
  state: {
    alertMessage: "",
    user: null,
    token: "",
    showAlert: false,
  },
  mutations: {
    setAlertMessage(state, payload) {
      state.alertMessage = payload;
    },
    setShowAlert(state, payload) {
      state.showAlert = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    showAlert({ commit, dispatch }, { message, amount }) {
      commit("setAlertMessage", message);
      commit("setShowAlert", true);
      setTimeout(() => {
        dispatch("hideMessage");
      }, amount || 5000);
    },
    hideMessage({ commit }) {
      commit("setShowAlert", false);
    },
    loadToken({ commit }) {
      const token = localStorage.getItem("token") ?? null;

      if (token) {
        commit("setToken", token, { root: true });
      }
    },
  },
  modules: {
    github,
    repo,
  },
});
