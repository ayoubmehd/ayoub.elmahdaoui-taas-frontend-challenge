<template>
  <h2 class="mb-2">Date {{ new Date() }}</h2>
  <ul class="ml-2">
    <li>
      <Commit></Commit>
      <Commit></Commit>
      <Commit></Commit>
      <Commit></Commit>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Commit from "./Commit.vue";

@Options({
  components: {
    Commit,
  },
})
export default class Repository extends Vue {}
</script>

<style></style>
