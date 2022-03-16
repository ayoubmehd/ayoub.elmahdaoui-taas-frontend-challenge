import { createStore } from "vuex";
import github from "@/store/github.store";

export default createStore<{ alertMessage: string; showAlert: boolean }>({
  state: {
    alertMessage: "",
    showAlert: false,
  },
  mutations: {
    setAlertMessage(state, payload) {
      state.alertMessage = payload;
    },
    setShowAlert(state, payload) {
      state.showAlert = payload;
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
  },
  modules: {
    github,
  },
});
