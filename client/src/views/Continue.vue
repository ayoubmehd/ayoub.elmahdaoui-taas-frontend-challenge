<template>
  <div></div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const github = reactive(store.state.github);
watch(github, () => {
  if (github.status < 300) {
    store.dispatch("showAlert", { message: "GitHub Connected sucessfully" });
    router.push({ name: "Repo" });
  }
});
onMounted(async () => {
  const { state, code } = route.query;

  await store.dispatch("github/fetchToken", { state, code });
  router.push({ name: "Repo" });
});
</script>

<style></style>
