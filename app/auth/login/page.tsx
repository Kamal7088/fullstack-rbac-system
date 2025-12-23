"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const loginType = searchParams.get("type"); // admin | user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    // 🔀 SAME REDIRECT LOGIC (UNCHANGED)
    if (loginType === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-2">
          {loginType === "admin" ? "Admin Login" : "User Login"}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Secure RBAC Authentication
        </p>

        {/* EMAIL */}
        <input
          placeholder="Email"
          type="email"
          className="
            border w-full p-3 mb-4 rounded-lg
            focus:outline-none focus:ring-4 focus:ring-indigo-300
            transition
          "
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          placeholder="Password"
          type="password"
          className="
            border w-full p-3 mb-6 rounded-lg
            focus:outline-none focus:ring-4 focus:ring-purple-300
            transition
          "
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-700 hover:to-purple-700
            hover:scale-[1.02]
            focus:ring-4 focus:ring-purple-300
            transition-all
            disabled:opacity-50
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Role Based Access Control System
        </p>
      </div>

      {/* FADE ANIMATION */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
