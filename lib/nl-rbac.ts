export function canPerformNL(
  question: string,
  can: (permission: string) => boolean
) {
  const q = question.toLowerCase();

  if (q.includes("delete role")) {
    return can("roles:edit");
  }

  if (q.includes("view users")) {
    return can("users:view");
  }

  if (q.includes("view permissions")) {
    return can("permissions:view");
  }

  return false;
}
