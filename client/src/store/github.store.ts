import { getToken, getUser, getAllRepos } from "@/api/github";
import { Module } from "vuex";

interface Repo {
  id: string;
}

interface GitHubStoreStateType {
  token: string;
  status: number;
  error: any;
  user: { login: string } | null;
  repos: Repo[];
}

const store: Module<GitHubStoreStateType, any> = {
  namespaced: true,
  state: {
    token: "",
    status: 0,
    error: null,
    user: null,
    repos: [],
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setRepos(state, payload) {
      state.repos = payload;
    },
  },
  actions: {
    async fetchToken({ commit }, { state, code }) {
      const [err, result] = await getToken({ state, code });

      if (err) {
        return commit("setError", err);
      }

      if (result) {
        commit("setToken", result.token);
        commit("setStatus", result.status);
      }
    },
    async fetchUser({ state, commit }) {
      const user = await getUser({ token: state.token });
      commit("setUser", user);
    },
    async fetchRepos({ state, commit }) {
      if (!state.user) return;
      const repos = await getAllRepos({
        login: state.user.login,
        token: state.token,
      });
      commit("setRepos", repos);
    },
  },
};

export default store;
