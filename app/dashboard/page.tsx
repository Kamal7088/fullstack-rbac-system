"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simple auth check (example)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to RBAC Dashboard</p>
    </div>
  );
}
