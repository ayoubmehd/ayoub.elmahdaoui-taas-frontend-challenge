<template>
  <div class="self-center">
    <a
      :href="url"
      class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
    >
      Authorize Access to Github
    </a>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { oauthAuthorizationUrl } from "@octokit/oauth-authorization-url";

@Options({
  components: {},
})
export default class Home extends Vue {
  url = "";

  mounted() {
    const { url, clientId, redirectUrl, login, state } = oauthAuthorizationUrl({
      clientType: "oauth-app",
      clientId: process.env.VUE_APP_GITHUB_CLIENT_ID,
      redirectUrl: `${process.env.VUE_APP_URL}/${process.env.VUE_APP_REDIRECT_URI}`,
      scopes: ["repo"],
    });
    this.url = url;
  }
}
</script>
