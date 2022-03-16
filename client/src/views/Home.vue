<template>
  <a
    :href="url"
    class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
  >
    Authorize Access to Github
  </a>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { test } from "../api/index";
import { oauthAuthorizationUrl } from "@octokit/oauth-authorization-url";

@Options({
  components: {},
})
export default class Home extends Vue {
  url = "";

  created() {
    const { url, clientId, redirectUrl, login, state } = oauthAuthorizationUrl({
      clientType: "oauth-app",
      clientId: "c1bdaf5d98a6e734df13",
      redirectUrl: "http://localhost:8080/continue",
      login: "octocat",
      scopes: ["repo"],
    });
    this.url = url;
  }
}
</script>
