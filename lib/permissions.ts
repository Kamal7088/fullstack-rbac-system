export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: [
    "dashboard:view",
    "users:view",
    "roles:view",
    "permissions:view",
    "roles:create",
    "roles:delete",
    "users:assign",
  ],
  user: [
    "dashboard:view",
  ],
};
