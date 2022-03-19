// import { getToken, getUser, getAllRepos } from "@/api/github";
import { getBranches, getCommits } from "@/api/repo";
import { Module } from "vuex";
import { StoreRootState } from ".";

interface Branch {
  id: string;
}

interface Commit {
  id: string;
}

interface GitHubStoreStateType {
  branches: Branch[];
  commits: Commit[];
  page: number;
  isLoading: boolean;
}

const store: Module<GitHubStoreStateType, StoreRootState> = {
  namespaced: true,
  state: {
    branches: [],
    commits: [],
    page: 1,
    isLoading: false,
  },
  mutations: {
    setBranches(state, payload) {
      state.branches = payload;
    },
    setCommits(state, payload) {
      state.commits = payload;
    },
    nextCommitPage(state) {
      state.page = state.page + 1;
    },
    resetCommitPage(state) {
      state.page = 1;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchBranches({ commit, rootState }, { repoName }) {
      if (!rootState.user) {
        return;
      }

      commit("setLoading", true);
      const branches = await getBranches({
        login: rootState.user.login,
        token: rootState.token,
        repoName,
      });
      commit("setLoading", false);
      commit("setBranches", branches.data);
    },
    async fetchCommits({ commit, rootState, state }, { repoName, branch }) {
      if (!rootState.user) {
        return;
      }

      commit("setLoading", true);
      const commits = await getCommits({
        login: rootState.user.login,
        repoName,
        token: rootState.token,
        branch,
        page: state.page,
      });

      commit("setLoading", false);
      commit("nextCommitPage");

      commit("setCommits", [...state.commits, ...commits.data]);
    },
    clearCommits({ commit }) {
      commit("setCommits", []);
      commit("resetCommitPage");
    },
  },
};

export default store;
