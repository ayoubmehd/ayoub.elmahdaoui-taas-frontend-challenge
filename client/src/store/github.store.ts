import { getToken, getUser, getAllRepos, searchRepos } from "@/api/github";
import { Module } from "vuex";

interface Repo {
  id: string;
  name: string;
  default_branch: string;
}

interface GitHubStoreStateType {
  status: number;
  error: any;
  reposPage: number;
  repos: Repo[];
  isLoading: boolean;
}

const store: Module<GitHubStoreStateType, any> = {
  namespaced: true,
  state: {
    status: 0,
    error: null,
    reposPage: 1,
    repos: [],
    isLoading: false,
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
    setReposSearch(state, payload) {
      state.repos = payload;
    },
    clearReposSearch(state) {
      state.repos = [];
      state.reposPage = 1;
    },
    nextRepoPage(state) {
      state.reposPage = state.reposPage + 1;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchToken({ commit }, { state, code }) {
      commit("setLoading", true);
      const [err, result] = await getToken({ state, code });

      commit("setLoading", false);
      if (err) {
        return commit("setError", err);
      }

      if (result) {
        commit("setToken", result.token, { root: true });
        localStorage.setItem("token", result.token);
        commit("setStatus", result.status);
      }
    },
    async fetchUser({ commit, rootState }) {
      commit("setLoading", true);
      const user = await getUser({ token: rootState.token });

      commit("setLoading", false);
      commit("setUser", user.data, { root: true });
    },
    async fetchRepos({ state, commit, rootState }) {
      if (!rootState.user) return;

      commit("setLoading", true);
      const repos = await getAllRepos({
        token: rootState.token,
        page: state.reposPage,
      });

      commit("setLoading", false);
      commit("setRepos", [...state.repos, ...repos.data]);
      // commit("nextRepoPage");
    },
    async searchRepos({ state, commit, rootState }, { search }) {
      if (!rootState.user) return;

      commit("clearReposSearch");

      commit("setLoading", true);
      const repos = await searchRepos({
        token: rootState.token,
        page: state.reposPage,
        search,
      });

      commit("setLoading", false);
      commit("setRepos", [...state.repos, ...repos.data.items]);
      // commit("nextRepoPage");
    },
  },
  getters: {
    getRepoMainBranch({ repos }) {
      return (repoName: string) => {
        return (
          repos && repos.find((repo) => repo.name === repoName)?.default_branch
        );
      };
    },
  },
};

export default store;
