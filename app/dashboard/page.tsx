"use client";

import { useEffect, useState } from "react";
import { usePermissions } from "@/app/hooks/usePermissions";

export default function DashboardPage() {
  const { hasPermission, loading } = usePermissions();
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/me/permissions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPermissions(data.map((p: any) => p.name));
        }
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 hover:shadow-lg transition">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-gray-600">Welcome to RBAC System</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* USER INFORMATION */}
        <div className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            👤 User Information
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li><b>Status:</b> Logged In</li>
            <li><b>Access Type:</b> User</li>
            <li><b>Account:</b> Active</li>
            <li><b>Login Method:</b> Email & Password</li>
            <li><b>Last Login:</b> Today</li>
          </ul>
        </div>

        {/* PERMISSIONS */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2 hover:-translate-y-1 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🔐 Your Permissions
          </h2>

          {/* 🔥 LARGE EMPTY STATE ADD-ON */}
          {permissions.length === 0 && (
            <div
              tabIndex={0}
              className="
                flex flex-col items-center justify-center
                border-2 border-dashed border-red-400
                rounded-xl p-10 text-center
                bg-red-50 text-red-700
                text-lg font-semibold
                transition-all duration-300
                hover:scale-105 hover:shadow-xl hover:bg-red-100
                focus:outline-none focus:ring-4 focus:ring-red-300
                animate-pulse
              "
            >
              <span className="text-4xl mb-3">🚫</span>
              <p className="text-2xl font-bold mb-2">
                No Permissions Assigned
              </p>
              <p className="text-base text-red-600">
                Please contact the administrator to request access.
              </p>
            </div>
          )}

          {/* PERMISSION LIST */}
          {permissions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permissions.map((perm, i) => (
                <div
                  key={i}
                  className="border rounded-lg px-4 py-2 bg-gray-50 hover:bg-indigo-50 transition"
                >
                  ✅ {perm}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-3 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            ⚡ Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            {/* RBAC FUNCTIONALITY MAINTAINED */}
            {hasPermission("user.read") && (
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition">
                View Users
              </button>
            )}

            {hasPermission("user.write") && (
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 hover:scale-105 transition">
                Create User
              </button>
            )}

            <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black hover:scale-105 transition">
              View Profile
            </button>

            <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition">
              Contact Support
            </button>
          </div>
        </div>

        {/* EXTRA SECTIONS */}
        <div className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4">📊 Activity</h2>
          <p>Actions performed: <b>12</b></p>
          <p>Permissions used: <b>{permissions.length}</b></p>
          <p>System Status: <b className="text-green-600">Normal</b></p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4">🛡 Security</h2>
          <p>2FA: <b>Disabled</b></p>
          <p>Password Strength: <b>Strong</b></p>
          <p>Last Password Change: <b>Recently</b></p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-4">⚙ Settings</h2>
          <p>Theme: <b>Light</b></p>
          <p>Notifications: <b>Enabled</b></p>
          <p>Language: <b>English</b></p>
        </div>

      </div>
    </div>
  );
}
