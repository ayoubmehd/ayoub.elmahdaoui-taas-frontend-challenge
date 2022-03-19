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
      <Loading v-if="isLoading" />
      <div class="">
        <Commit
          @reach-last-element="getCommits"
          v-for="(commit, index) in commits"
          :key="commit.id"
          :shoudObserve="index === commits.length - 1 && commits.length === 12"
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
import Loading from "../components/Loading.vue";

export default defineComponent({
  components: {
    NavItem,
    Sidebar,
    Select,
    Commit,
    Loading,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const repos = computed(() => store.state.github.repos);
    const user = computed(() => store.state.user);
    const branches = computed(() => store.state.repo.branches);
    const repoName = computed(() => route.params.name);
    const isLoading = computed(() => store.state.repo.isLoading);

    const selectedBranch = ref(-1);

    const getRepoMainBranch = store.getters["github/getRepoMainBranch"];

    const commits = computed(() => {
      return store.state.repo.commits;
    });

    async function getBranches() {
      if (!route.params.name) {
        return;
      }
      await store.dispatch("repo/fetchBranches", {
        repoName: route.params.name,
      });
    }

    function getCommits() {
      if (!route.params.name) {
        return;
      }

      if (selectedBranch.value === -1) {
        store.dispatch("repo/clearCommits");
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
        store.dispatch("repo/clearCommits");
        selectedBranch.value = getRepoMainBranch(route.params.name);

        getBranches();
        getCommits();
      }
    );

    // watch(commits, () => {
    //   createObserver();
    // });

    // onUnmounted(() => {
    //   if (lastElement) {
    //     observer.unobserve(lastElement);
    //   }
    // });

    watch(selectedBranch, () => {
      store.dispatch("repo/clearCommits");
      getCommits();
    });

    // Hooks
    onMounted(() => {
      (async () => {
        store.dispatch("loadToken");
        await store.dispatch("github/fetchUser");

        await store.dispatch("github/fetchRepos");
        await getBranches();
        await getCommits();
      })();
      selectedBranch.value = getRepoMainBranch(route.params.name);
    });

    return {
      repos,
      repoName,
      branches,
      selectedBranch,
      commits,
      isLoading,
      getCommits,
    };
  },
});
</script>

<style></style>
