<template>
  <aside
    class="bg-gray-100 shadow-sm rounded sticky top-4 md:w-3/12 mb-auto mx-2"
  >
    <ul class="flex md:flex-col h-screen-70 overflow-auto">
      <slot></slot>
    </ul>
    <div class="w-full sticky bottom-0 bg-gray-100 px-5 py-3">
      <Button @click="laodMore">Load More</Button>
    </div>
  </aside>
</template>

<script>
import Button from "../Form/Button.vue";
import { useStore } from "vuex";

export default {
  components: {
    Button,
  },
  setup() {
    const store = useStore();

    function laodMore() {
      store.dispatch("github/fetchRepos");
    }

    return { laodMore };
  },
};
</script>

<style></style>
