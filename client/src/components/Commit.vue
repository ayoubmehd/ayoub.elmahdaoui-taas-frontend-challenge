<template>
  <div
    class="h-full bg-gray-100 bg-opacity-75 px-4 pt-3 pb-4 mb-2 rounded-lg overflow-hidden relative"
  >
    <h1 class="title-font text-md font-medium text-gray-900 mb-2">
      {{ message }}
    </h1>
    <a class="inline-flex items-center">
      <img
        alt="blog"
        :src="avatar"
        class="w-6 h-6 rounded-full flex-shrink-0 object-cover object-center"
      />
      <span class="flex-grow text-sm flex pl-3">
        <span class="title-font font-medium text-gray-900"> {{ user }} </span>
        &nbsp;{{ date }}
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    data: {
      type: Object,
    },
  },
  setup(props) {
    const message = computed(() => props?.data?.message);
    const avatar = computed(() => props?.data?.avatar);
    const user = computed(() => props?.data?.user);
    const date = computed(() => props?.data?.date);

    return {
      message,
      avatar,
      user,
      date,
    };
  },
});
</script>

<style></style>
