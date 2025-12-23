"use client";

import { useEffect, useState } from "react";

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/me/permissions")
      .then((res) => res.json())
      .then(setPermissions);
  }, []);

  const can = (permission: string) =>
    permissions.includes(permission);

  return { can };
}
