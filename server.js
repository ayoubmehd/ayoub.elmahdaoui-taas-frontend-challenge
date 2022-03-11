const { OAuthApp, createNodeMiddleware } = require("@octokit/oauth-app");
const {} = require("@octokit/core");
const { Router } = require("express");

const express = require("express");

const app = express();

const ghApp = new OAuthApp({
  clientType: "oauth-app",
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

ghApp.on("token", async ({ token, octokit }) => {
  const { data } = await octokit.request("GET /user");
  console.log(`Token retrieved for ${data.login}`);
});

app.get("/gt/auth", (req, res) => {});

app.use("/api", createNodeMiddleware(ghApp));

app.listen(process.env.PORT || 5000);
