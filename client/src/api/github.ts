import { Octokit } from "octokit";
import type { OctokitResponse } from "@octokit/oauth-app/dist-types/middleware/types";

const per_page = 12;

export interface GitHubResponse {
  token: string;
  status: number;
}

interface GetTokenParamsType {
  state: string;
  code: string;
}
export async function getToken({
  state,
  code,
}: GetTokenParamsType): Promise<Array<GitHubResponse | null>> {
  try {
    const response = await fetch("/api/github/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        state,
      }),
    });
    const {
      authentication: { token },
    } = await response.json();

    return [null, { token, status: response.status }];
  } catch (error) {
    return [error as any, null];
  }
}

interface GetUserParamsType {
  token: string;
}

export function getUser({
  token,
}: GetUserParamsType): Promise<OctokitResponse> | undefined | any {
  const octokit = new Octokit({ auth: token });
  return octokit.request("GET /user");
}

interface GetAllReposParamsType {
  token: string;
  page: number;
}

export function getAllRepos({
  token,
  page,
}: GetAllReposParamsType): Promise<OctokitResponse> | undefined | any {
  const octokit = new Octokit({ auth: token });
  return octokit.request(`GET /user/repos`, {
    page,
    per_page,
    direction: "desc",
    type: "owner",
  });
}

interface SearchReposParamsType {
  search: string;
  token: string;
  page: number;
}

export function searchRepos({ search, token, page }: SearchReposParamsType) {
  const octokit = new Octokit({ auth: token });
  console.log("search", search);

  return octokit.request("GET /search/repositories", {
    q: `${search}+in:name+user:@me`,
    page,
    per_page,
  });
}
