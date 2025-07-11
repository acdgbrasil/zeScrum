import { GITHUB_SPRINTS } from "../infra/kaban/github/github.ts";

export const actualSprintNameFormatted = (sprint: GITHUB_SPRINTS): string => {
  const sprintNumber = sprint.split("º")[0].trim();
  return `SPRINT_${sprintNumber}`;
};
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function matchResult<T, E>(
  result: Result<T, E>
): {
  onSuccess: <U>(fn: (v: T) => U) => U | undefined;
  onError: <U>(fn: (e: E) => U) => U | undefined;
} {
  return {
    onSuccess: (fn) => result.ok ? fn(result.value) : undefined,
    onError: (fn) => !result.ok ? fn(result.error) : undefined
  };
}