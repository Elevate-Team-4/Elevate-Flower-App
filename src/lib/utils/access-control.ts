const policies: Record<"admin" | "user", string[]> = {
  admin: ["view:dashboard", "view:publicPages"],
  user: ["view:publicPages"],
};

export function hasPermission(permission: string, role?: "admin" | "user") {
  if (!role) return false;
  return policies[role]?.includes(permission) ?? false;
}
