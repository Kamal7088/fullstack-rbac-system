"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      router.push("/auth/login");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900
        px-4
      "
    >
      <form
        onSubmit={handleRegister}
        className="
          w-full max-w-md
          bg-white/95 backdrop-blur
          p-8 md:p-10
          rounded-2xl
          shadow-2xl
          transition-all duration-300
          hover:shadow-indigo-500/40
          hover:-translate-y-1
        "
      >
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Register
        </h1>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="
            w-full mb-4
            px-4 py-3
            border rounded-lg
            bg-gray-50
            outline-none
            transition-all
            focus:ring-2 focus:ring-indigo-500
            hover:border-indigo-400
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full mb-6
            px-4 py-3
            border rounded-lg
            bg-gray-50
            outline-none
            transition-all
            focus:ring-2 focus:ring-indigo-500
            hover:border-indigo-400
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-indigo-600 text-white
            py-3 rounded-lg
            font-semibold
            transition-all duration-300
            hover:bg-indigo-700
            hover:shadow-lg
            hover:scale-[1.02]
            active:scale-95
            disabled:opacity-60
          "
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Secure RBAC Registration
        </p>
      </form>
    </div>
  );
}
