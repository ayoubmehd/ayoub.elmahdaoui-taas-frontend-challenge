import { Octokit } from "octokit";

const per_page = 12;
interface GetBranchesParamsType {
  repoName: string;
  token: string;
  login: string;
}

export function getBranches({ repoName, token, login }: GetBranchesParamsType) {
  const octokit = new Octokit({ auth: token });

  return octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: login,
    repo: repoName,
  });
}

interface GetCommitsParamsType {
  repoName: string;
  token: string;
  login: string;
  branch: string;
  page: number;
}

export function getCommits({
  repoName,
  token,
  login,
  branch,
  page,
}: GetCommitsParamsType) {
  const octokit = new Octokit({ auth: token });

  return octokit.request("GET /repos/{owner}/{repo}/commits", {
    owner: login,
    repo: repoName,
    sha: branch,
    page,
    per_page,
  });
}
