<template>
  <li class="flex items-center py-3 px-5">
    <router-link
      class="text-indigo-400 inline-flex items-center"
      :to="$attrs.to"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script lang="ts">
// import { toRefs } from "vue";
export default {};
</script>

<style></style>
