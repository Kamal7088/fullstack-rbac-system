"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    router.push("/auth/login?type=user");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8
        transition-all duration-300 hover:scale-[1.02]">

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join the RBAC system securely
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300
              focus:outline-none focus:ring-4 focus:ring-indigo-400
              transition
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300
              focus:outline-none focus:ring-4 focus:ring-purple-400
              transition
            "
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full py-3 rounded-xl
            text-white font-bold tracking-wide
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-700 hover:to-purple-700
            focus:outline-none focus:ring-4 focus:ring-purple-300
            transition-all duration-300
            hover:scale-105
            disabled:opacity-50
          "
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login?type=user"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
