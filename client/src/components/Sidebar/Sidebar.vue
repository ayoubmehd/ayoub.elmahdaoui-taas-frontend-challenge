<template>
  <aside
    class="bg-gray-100 shadow-sm rounded sticky max-h-screen overflow-auto top-4 md:w-3/12 mb-auto mx-2"
  >
    <ul class="flex md:flex-col justify-center">
      <slot></slot>
    </ul>
    <div class="w-full px-5 py-3">
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
