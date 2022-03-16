<template>
  <Alert> </Alert>
  <div class="container mx-auto px-4 md:flex pt-12 justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { Options, Vue } from "vue-class-component";
import Alert from "./components/Alert.vue";
import { ref } from "@vue/reactivity";

@Options({
  components: {
    Alert,
  },
})
export default class App extends Vue {}
</script>

<style></style>
