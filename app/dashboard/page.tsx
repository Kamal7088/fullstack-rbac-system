"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
        flex items-center justify-center
        p-6
      "
    >
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            RBAC System
          </h1>
          <p className="mt-3 text-indigo-200">
            Login as Admin or User
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ADMIN LOGIN */}
          <Link href="/auth/login?type=admin">
            <div className="
              cursor-pointer
              bg-white/95 backdrop-blur
              rounded-2xl p-10
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              hover:bg-purple-50
              transition-all duration-300
            ">
              <div className="text-6xl mb-4">👑</div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                Admin Login
              </h2>
              <p className="text-gray-600">
                Manage users, roles & permissions
              </p>
            </div>
          </Link>

          {/* USER LOGIN */}
          <Link href="/auth/login?type=user">
            <div className="
              cursor-pointer
              bg-white/95 backdrop-blur
              rounded-2xl p-10
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              hover:bg-indigo-50
              transition-all duration-300
            ">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                User Login
              </h2>
              <p className="text-gray-600">
                Access user dashboard
              </p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}
