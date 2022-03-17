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
}

const store: Module<GitHubStoreStateType, StoreRootState> = {
  namespaced: true,
  state: {
    branches: [],
    commits: [],
  },
  mutations: {
    setBranches(state, payload) {
      state.branches = payload;
    },
    setCommits(state, payload) {
      state.commits = payload;
    },
  },
  actions: {
    async fetchBranches({ commit, rootState }, { repoName }) {
      if (!rootState.user) return;

      const branches = await getBranches({
        login: rootState.user.login,
        token: rootState.token,
        repoName,
      });
      commit("setBranches", branches.data);
    },
    async fetchCommits({ commit, rootState }, { repoName, branch }) {
      if (!rootState.user) {
        return;
      }

      const commits = await getCommits({
        login: rootState.user.login,
        repoName,
        token: rootState.token,
        branch,
      });

      commit("setCommits", commits.data);
    },
    clearCommits({ commit }) {
      commit("setCommits", []);
    },
  },
};

export default store;
