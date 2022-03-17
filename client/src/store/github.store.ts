import { getToken, getUser, getAllRepos } from "@/api/github";
import { Module } from "vuex";

interface Repo {
  id: string;
}

interface GitHubStoreStateType {
  status: number;
  error: any;
  reposPage: number;
  repos: Repo[];
}

const store: Module<GitHubStoreStateType, any> = {
  namespaced: true,
  state: {
    status: 0,
    error: null,
    reposPage: 1,
    repos: [],
  },
  mutations: {
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
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
        commit("setToken", result.token, { root: true });
        commit("setStatus", result.status);
      }
    },
    async fetchUser({ commit, rootState }) {
      const user = await getUser({ token: rootState.token });
      commit("setUser", user.data, { root: true });
    },
    async fetchRepos({ state, commit, rootState }) {
      if (!rootState.user) return;

      const repos = await getAllRepos({
        token: rootState.token,
        page: state.reposPage,
      });
      commit("setRepos", [...state.repos, ...repos.data]);
      commit("nextRepoPage");
    },
  },
};

export default store;
