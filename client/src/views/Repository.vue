<template>
  <Sidebar>
    <NavItem v-for="repo in repos" :key="repo.node_id">{{ repo.name }}</NavItem>
  </Sidebar>
  <main class="md:w-3/4 mx-2 min-h-full p-4">
    <h1 class="text-3xl font-bold">Repository Name</h1>
    <div>
      <div class="flex">
        <div class="mb-3 xl:w-96">
          <Select>
            <option selected>Selected Branch</option>
            <option value="1">One Branch</option>
            <option value="2">Two Branch</option>
            <option value="3">Three Branch</option>
          </Select>
        </div>
      </div>
    </div>
    <div>
      <div class="">
        <ul class="">
          <li>
            <Commits></Commits>
          </li>
          <li>
            <Commits></Commits>
          </li>
          <li>
            <Commits></Commits>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import NavItem from "../components/Sidebar/NavItem.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Select from "../components/Form/Select.vue";
import Commits from "../components/Commits.vue";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    NavItem,
    Sidebar,
    Select,
    Commits,
  },
  setup() {
    const store = useStore();
    const repos = computed(() => store.state.github.repos);
    const user = computed(() => store.state.github.user);
    watch(user, () => {
      store.dispatch("github/fetchRepos");
    });

    return { repos };
  },
};
</script>

<style></style>
