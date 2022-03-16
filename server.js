import express, { json } from "express";
import { OAuthApp, createNodeMiddleware } from "@octokit/oauth-app";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const expressApp = express();

// expressApp.use(json());

const octokitApp = new OAuthApp({
  clientType: "oauth-app",
  clientId,
  clientSecret,
});

expressApp.use(createNodeMiddleware(octokitApp));

expressApp.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
