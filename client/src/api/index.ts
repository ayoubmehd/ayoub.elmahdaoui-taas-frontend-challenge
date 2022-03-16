import type { GitHubResponse } from "./github";

export function test(): Promise<any> {
  return fetch("/gt");
}
