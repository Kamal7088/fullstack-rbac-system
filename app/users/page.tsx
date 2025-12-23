"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  role: string | null;
};

type Role = {
  id: number;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  /* =====================
     LOAD USERS & ROLES
  ===================== */
  async function load() {
    const usersRes = await fetch("/api/user-roles");
    const rolesRes = await fetch("/api/roles");

    setUsers(await usersRes.json());
    setRoles(await rolesRes.json());
  }

  useEffect(() => {
    load();
  }, []);

  /* =====================
     ASSIGN ROLE TO USER
  ===================== */
  async function assignRole(userId: number, roleId: number) {
    setLoading(true);

    await fetch("/api/user-roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, roleId }),
    });

    setLoading(false);
    alert("✅ Role assigned successfully");
    load(); // refresh list
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
        p-6 md:p-10
        text-white
      "
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          User Role Management
        </h1>
        <p className="text-indigo-200 mt-2">
          Assign & manage roles securely
        </p>
      </div>

      {/* TABLE CARD */}
      <div
        className="
          max-w-7xl mx-auto
          bg-white/95 backdrop-blur
          rounded-2xl shadow-2xl
          overflow-hidden
          transition
          hover:shadow-indigo-500/30
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-800">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="text-left p-4 text-lg">
                  User
                </th>
                <th className="text-left p-4 text-lg">
                  Current Role
                </th>
                <th className="text-left p-4 text-lg">
                  Assign Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u.id}
                  className={`
                    transition
                    hover:bg-indigo-50
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  `}
                >
                  {/* USER EMAIL */}
                  <td className="p-4 border-b font-medium">
                    {u.email}
                  </td>

                  {/* CURRENT ROLE */}
                  <td className="p-4 border-b">
                    <span
                      className="
                        inline-block
                        px-3 py-1
                        rounded-full
                        text-sm font-semibold
                        bg-indigo-100 text-indigo-700
                      "
                    >
                      {u.role ?? "None"}
                    </span>
                  </td>

                  {/* ASSIGN ROLE */}
                  <td className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <select
                        defaultValue=""
                        className="
                          border
                          rounded-lg
                          px-3 py-2
                          focus:ring-2 focus:ring-indigo-400
                          outline-none
                          transition
                        "
                        onChange={(e) =>
                          assignRole(u.id, Number(e.target.value))
                        }
                      >
                        <option value="" disabled>
                          Select role
                        </option>

                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>

                      {loading && (
                        <span className="text-sm text-gray-500 animate-pulse">
                          saving...
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="p-10 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-indigo-300 mt-10 text-sm">
        RBAC User Role Management Panel
      </div>
    </div>
  );
}
