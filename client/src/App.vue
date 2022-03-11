<template>
  <Alert>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, id!
  </Alert>
  <div class="container mx-auto px-4 md:flex pt-12 justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Alert from "@/components/Alert.vue";

@Options({
  components: {
    Alert,
  },
})
export default class App extends Vue {}
</script>

<style></style>
