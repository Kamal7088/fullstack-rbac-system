"use client";

import { useEffect, useState } from "react";

type Role = {
  id: number;
  name: string;
};

type Permission = {
  id: number;
  name: string;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/roles").then(r => r.json()).then(setRoles);
    fetch("/api/permissions").then(r => r.json()).then(setPermissions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 p-6 md:p-10 text-white">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3">
          🚀 Roles Management
        </h1>

        <p className="mt-3 text-xl font-bold text-yellow-300">
          Select a role → Assign permissions → Control system access
        </p>

        <p className="text-indigo-300 mt-2">
          Centralized RBAC control panel
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white/95 text-gray-900 rounded-2xl shadow-2xl p-6">

          {/* ROLE NAME INPUT */}
          <label className="block font-bold text-lg mb-2">
            Role Name
          </label>

          <input
            placeholder="Enter role name..."
            className="
              w-full
              px-5 py-4
              text-xl font-semibold
              rounded-xl
              border-2 border-indigo-500
              bg-white
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:ring-4 focus:ring-indigo-300
              focus:border-indigo-600
              transition
            "
          />

          {/* ADD ROLE BUTTON */}
          <button
            className="
              mt-4
              px-6 py-3
              rounded-xl
              font-bold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:scale-105 hover:shadow-lg
              transition
            "
          >
            ➕ Add Role
          </button>

          {/* ROLES LIST */}
          <h2 className="text-xl font-bold mt-8 mb-1">
            Available Roles
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Click a role to highlight and manage permissions
          </p>

          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg
                  font-semibold transition-all
                  ${
                    selectedRole === r.id
                      ? "bg-indigo-600 text-white scale-[1.05] shadow-lg"
                      : "bg-gray-100 hover:bg-indigo-100"
                  }
                `}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/95 text-gray-900 rounded-2xl shadow-2xl p-6">

          <h2 className="text-xl font-bold mb-2">
            🔐 Assign Permissions
          </h2>

          <p className="text-indigo-600 font-semibold mb-4">
            Permissions define what actions a role can perform
          </p>

          {selectedRole === null && (
            <div className="border-2 border-dashed border-indigo-400 rounded-xl p-10 text-center font-bold text-indigo-600 animate-pulse">
              ⬅ Please select a role from the left panel
            </div>
          )}

          {selectedRole !== null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
              {permissions.map((p) => (
                <label
                  key={p.id}
                  className="
                    flex items-center gap-3
                    border rounded-lg px-4 py-3
                    bg-gray-50 hover:bg-indigo-50
                    transition cursor-pointer
                  "
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-lg">
                    {p.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-indigo-300 mt-12 text-sm">
        RBAC Roles & Permissions Panel — Secure • Scalable • Enterprise Ready
      </div>
    </div>
  );
}
