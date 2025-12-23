"use client";

import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { canPerformNL } from "@/lib/nl-rbac";

export default function NLRBACPage() {
  // ❌ role hardcoding removed
  // ❌ usePermissions(role) removed

  const { can } = usePermissions();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const checkPermission = () => {
    const allowed = canPerformNL(question, can);
    setAnswer(allowed ? "✅ YES, Allowed" : "❌ No, Not Allowed");
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">
        Natural Language RBAC
      </h1>

      <input
        className="border w-full p-3 rounded mb-4"
        placeholder="Can admin delete roles?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={checkPermission}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Check
      </button>

      {answer && (
        <p className="mt-4 text-lg font-semibold">
          {answer}
        </p>
      )}
    </div>
  );
}
