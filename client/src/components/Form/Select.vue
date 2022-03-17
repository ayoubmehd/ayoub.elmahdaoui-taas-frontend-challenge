<template>
  <select
    v-model="computedValue"
    class="form-select form-select-sm appearance-none block px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    aria-label=".form-select-sm example"
  >
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { AppContext, computed, defineComponent } from "@vue/runtime-core";
export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number],
      default: "master",
    },
  },
  setup(props, context) {
    const computedValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
      },
    });

    return { computedValue };
  },
});
</script>

<style></style>
