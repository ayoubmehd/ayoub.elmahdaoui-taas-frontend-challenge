<template>
  <aside
    class="bg-gray-100 shadow-sm rounded sticky top-4 md:w-3/12 mb-auto mx-2"
  >
    <div class="relative pt-3 px-5">
      <input
        v-model.lazy="search"
        @keydown.enter="searchRepos"
        type="search"
        placeholder="Search repos"
        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <!-- <div class="absolute left-0 w-full px-5">
        <ul class="bg-white w-full">
          <li>Lorem ipsum dolor sit.</li>
        </ul>
      </div> -->
    </div>
    <ul class="flex md:flex-col h-screen-70 overflow-auto">
      <slot></slot>
      <Loading v-if="isLoading" />
    </ul>
    <div class="w-full sticky bottom-0 bg-gray-100 px-5 py-3">
      <Button @click="laodMore">Load More</Button>
    </div>
  </aside>
</template>

<script>
import Button from "../Form/Button.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "@vue/runtime-core";
import Loading from "../Loading.vue";

export default {
  components: {
    Button,
    Loading,
  },
  setup() {
    const store = useStore();
    const search = ref("");
    const isLoading = computed(() => store.state.github.isLoading);

    function searchRepos() {
      store.dispatch("github/searchRepos", { search: search.value });
    }

    function laodMore() {
      store.dispatch("github/fetchRepos");
    }

    watch(search, searchRepos);

    return { laodMore, search, searchRepos, isLoading };
  },
};
</script>

<style></style>
