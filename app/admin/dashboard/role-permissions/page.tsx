"use client";
import { useEffect, useState } from "react";

export default function RolePermissionPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [roleId, setRoleId] = useState("");
  const [permissionId, setPermissionId] = useState("");

  useEffect(() => {
    fetch("/api/roles").then(r => r.json()).then(setRoles);
    fetch("/api/permissions").then(r => r.json()).then(setPermissions);
  }, []);

  const assign = async () => {
    await fetch("/api/role-permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId, permissionId }),
    });
    alert("Permission Assigned");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Assign Permission to Role
      </h1>

      <select onChange={(e) => setRoleId(e.target.value)} className="border p-2 mr-2">
        <option value="">Select Role</option>
        {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>

      <select onChange={(e) => setPermissionId(e.target.value)} className="border p-2 mr-2">
        <option value="">Select Permission</option>
        {permissions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <button onClick={assign} className="bg-black text-white px-4 py-2">
        Assign
      </button>
    </div>
  );
}
