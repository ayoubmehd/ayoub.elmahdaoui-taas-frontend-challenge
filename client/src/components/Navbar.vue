<template>
  <header v-if="user?.login" class="text-gray-600 body-font">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <a
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <svg class="text-indigo-400 w-10 h-10" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.59,2.6C11.37,1.81 12.63,1.81 13.41,2.6L21.4,10.59C22.19,11.37 22.19,12.63 21.4,13.41L13.41,21.4C12.63,22.19 11.37,22.19 10.59,21.4L2.6,13.41C1.81,12.63 1.81,11.37 2.6,10.59Z"
          />
        </svg>
        <span class="ml-3 text-xl">Github History</span>
      </a>
      <nav
        class="md:ml-auto flex flex-wrap items-center text-base justify-center px-1"
      >
        <a class="inline-flex items-center">
          <span class="flex-grow text-sm flex px-3">
            {{ user?.login }}
          </span>
          <img
            alt="blog"
            :src="user?.avatar_url"
            class="w-10 h-10 rounded-full flex-shrink-0 object-cover object-center"
          />
        </a>
      </nav>
      <button
        @click="logout"
        class="w-10 h-10 rounded-full inline-flex items-center bg-gray-100 border-0 py-0.5 px-2 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0"
      >
        <svg class="w- h-10 ml-1" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store?.state?.user);

    function logout() {
      localStorage.removeItem("token");
      router.push({ name: "Home" });
    }

    return {
      user,
      logout,
    };
  },
});
</script>

<style></style>
