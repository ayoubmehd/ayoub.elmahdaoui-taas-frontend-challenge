import { Octokit } from "octokit";

export function getBranches({
  repoName,
  token,
  login,
}: {
  repoName: string;
  token: string;
  login: string;
}) {
  const octokit = new Octokit({ auth: token });

  return octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: login,
    repo: repoName,
  });
}

export function getCommits({
  repoName,
  token,
  login,
  branch,
}: {
  repoName: string;
  token: string;
  login: string;
  branch: string;
}) {
  const octokit = new Octokit({ auth: token });

  return octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: login,
    repo: repoName,
    sha: branch,
  });
}
