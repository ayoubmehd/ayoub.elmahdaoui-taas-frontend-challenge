<template>
  <Sidebar>
    <NavItem
      v-for="repo in repos"
      :key="repo.id"
      :to="`/repositories/${repo.name}`"
      >{{ repo.name }}</NavItem
    >
  </Sidebar>
  <main class="md:w-3/4 mx-2 min-h-full p-4">
    <h1 class="text-3xl font-bold">{{ repoName }}</h1>
    <div>
      <div class="flex">
        <div class="mb-3 xl:w-40">
          <Select v-model="selectedBranch" class="w-full">
            <option :value="-1" disabled selected>Selected Branch</option>
            <option
              v-for="branch in branches"
              :value="branch.name"
              :key="branch.id"
            >
              {{ branch.name }}
            </option>
          </Select>
        </div>
      </div>
    </div>
    <div>
      <div class="">
        <Commit
          v-for="commit in commits"
          :key="commit.id"
          :data="{
            message: commit?.commit?.message,
            avatar: commit?.author?.avatar_url,
            user: commit?.author?.login,
            date: commit?.committer?.date,
          }"
        ></Commit>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, onMounted, watch, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import NavItem from "../components/Sidebar/NavItem.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Select from "../components/Form/Select.vue";
import Commit from "../components/Commit.vue";

export default defineComponent({
  components: {
    NavItem,
    Sidebar,
    Select,
    Commit,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const repos = computed(() => store.state.github.repos);
    const user = computed(() => store.state.user);
    const branches = computed(() => store.state.repo.branches);
    const repoName = computed(() => route.params.name);
    const selectedBranch = ref(-1);

    const getRepoMainBranch = store.getters["github/getRepoMainBranch"];

    const commits = computed(() => {
      return store.state.repo.commits;
    });

    function getBranches() {
      if (!route.params.name) {
        return;
      }
      store.dispatch("repo/fetchBranches", { repoName: route.params.name });
    }

    function getCommits() {
      if (!route.params.name) {
        return;
      }

      if (selectedBranch.value === -1) {
        store.dispatch("clearCommits");
        return;
      }

      store.dispatch("repo/fetchCommits", {
        repoName: route.params.name,
        branch: selectedBranch.value,
      });
    }

    watch(user, () => {
      store.dispatch("github/fetchRepos");
    });

    watch(
      () => route.params.name,
      () => {
        selectedBranch.value = getRepoMainBranch(route.params.name);

        getBranches();
        getCommits();
      }
    );

    watch(selectedBranch, getCommits);

    onMounted(() => {
      store.dispatch("loadToken");
      store.dispatch("github/fetchRepos");
      getBranches();
    });

    return {
      repos,
      repoName,
      branches,
      selectedBranch,
      commits,
    };
  },
});
</script>

<style></style>
