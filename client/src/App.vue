<template>
  <Alert></Alert>
  <Navbar />
  <div class="container min-h-screen mx-auto px-4 md:flex pt-8 justify-center">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import Alert from "./components/Alert.vue";
import { computed, watch } from "vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Alert,
    Navbar,
  },
};
</script>

<style></style>
