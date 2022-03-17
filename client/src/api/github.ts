import { Octokit } from "octokit";
import type { OctokitResponse } from "@octokit/oauth-app/dist-types/middleware/types";

export interface GitHubResponse {
  token: string;
  status: number;
}
export async function getToken({
  state,
  code,
}: {
  state: string;
  code: string;
}): Promise<Array<GitHubResponse | null>> {
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

export function getUser({
  token,
}: {
  token: string;
}): Promise<OctokitResponse> | undefined | any {
  const octokit = new Octokit({ auth: token });
  return octokit.request("GET /user");
}

export function getAllRepos({
  token,
  page,
}: {
  token: string;
  page: number;
}): Promise<OctokitResponse> | undefined | any {
  const octokit = new Octokit({ auth: token });
  return octokit.request(`GET /user/repos`, {
    page,
    per_page: 6,
    direction: "desc",
    type: "owner",
  });
}
