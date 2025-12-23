"use client";

import { useEffect, useState } from "react";

type Permission = {
  id: number;
  name: string;
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/permissions")
      .then((r) => r.json())
      .then(setPermissions);
  }, []);

  async function addPermission() {
    if (!name) return;

    await fetch("/api/permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    const res = await fetch("/api/permissions");
    setPermissions(await res.json());
  }

  async function deletePermission(id: number) {
    await fetch(`/api/permissions?id=${id}`, { method: "DELETE" });
    setPermissions(permissions.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 text-white">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-2">
        🔐 Permissions Management
      </h1>

      {/* INPUT BOX */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-xl mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          {/* ✅ FIXED INPUT */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter permission name"
            className="
              flex-1
              px-5 py-4
              rounded-xl
              border-2 border-indigo-500
              text-gray-900
              font-semibold
              text-lg
              placeholder-gray-400
              bg-white
              focus:outline-none
              focus:ring-4 focus:ring-indigo-300
              focus:border-indigo-600
              transition
            "
          />

          {/* ADD BUTTON */}
          <button
            onClick={addPermission}
            className="
              px-6 py-4
              rounded-xl
              font-bold text-white
              bg-gradient-to-r from-indigo-600 to-pink-600
              hover:scale-105 hover:shadow-lg
              transition
            "
          >
            ➕ Add Permission
          </button>

        </div>
      </div>

      {/* LIST */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {permissions.map((p) => (
          <div
            key={p.id}
            className="
              flex justify-between items-center
              px-6 py-4
              border-b
              hover:bg-indigo-50
              transition
            "
          >
            <span className="text-gray-900 font-semibold text-lg">
              {p.name}
            </span>

            <button
              onClick={() => deletePermission(p.id)}
              className="
                px-4 py-2
                bg-red-600 text-white
                rounded-lg
                hover:bg-red-700 hover:scale-105
                transition
              "
            >
              🗑 Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
