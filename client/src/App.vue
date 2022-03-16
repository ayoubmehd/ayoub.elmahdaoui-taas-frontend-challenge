<template>
  <Alert> </Alert>
  <div class="container mx-auto px-4 md:flex pt-12 justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import Alert from "./components/Alert.vue";
import { computed, watch } from "vue";

export default {
  components: {
    Alert,
  },
  setup() {
    const store = useStore();

    const token = computed(() => store.state.github.token);

    watch(token, () => {
      store.dispatch("github/fetchUser");
    });
  },
};
</script>

<style></style>
