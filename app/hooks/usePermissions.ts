"use client";

import { useEffect, useState } from "react";

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/permissions")
      .then((res) => res.json())
      .then((data) => {
        setPermissions(data.map((p: any) => p.name));
      })
      .finally(() => setLoading(false));
  }, []);

  const hasPermission = (perm: string) =>
    permissions.includes(perm);

  return { permissions, hasPermission, loading };
}
