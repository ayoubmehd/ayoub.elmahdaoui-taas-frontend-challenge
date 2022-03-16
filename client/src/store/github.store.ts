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
  reposPage: number;
  repos: Repo[];
}

const store: Module<GitHubStoreStateType, any> = {
  namespaced: true,
  state: {
    token: "",
    status: 0,
    error: null,
    user: null,
    reposPage: 1,
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
    nextRepoPage(state) {
      state.reposPage = state.reposPage + 1;
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
      commit("setUser", user.data);
    },
    async fetchRepos({ state, commit }) {
      if (!state.user) return;

      const repos = await getAllRepos({
        token: state.token,
        page: state.reposPage,
      });
      commit("setRepos", [...state.repos, ...repos.data]);
      commit("nextRepoPage");
    },
  },
};

export default store;
