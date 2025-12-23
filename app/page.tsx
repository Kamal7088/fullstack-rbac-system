import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
        px-4
      "
    >
      {/* CARD */}
      <div
        className="
          w-full max-w-md
          bg-white rounded-2xl
          shadow-2xl
          p-8
          text-center
          transition-all duration-300
          hover:scale-[1.03] hover:shadow-purple-500/50
        "
      >
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          RBAC Configuration Tool
        </h1>

        <p className="text-gray-600 mb-8">
          Secure Role Based Access Control System
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4">

          {/* ADMIN LOGIN */}
          <Link href="/auth/login?type=admin">
            <button
              className="
                w-full py-3 rounded-xl
                font-semibold text-white
                bg-red-600
                transition-all duration-300
                hover:bg-red-700 hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-red-300
              "
            >
              Admin Login
            </button>
          </Link>

          {/* USER LOGIN */}
          <Link href="/auth/login?type=user">
            <button
              className="
                w-full py-3 rounded-xl
                font-semibold text-white
                bg-blue-600
                transition-all duration-300
                hover:bg-blue-700 hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-blue-300
              "
            >
              User Login
            </button>
          </Link>

          {/* REGISTER */}
          <Link href="/auth/register">
            <button
              className="
                w-full py-3 rounded-xl
                font-semibold
                border border-gray-300
                transition-all duration-300
                hover:bg-gray-100 hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-gray-300
              "
            >
              Register New User
            </button>
          </Link>

        </div>

        {/* FOOTER TEXT */}
        <p className="text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} RBAC System
        </p>
      </div>
    </div>
  );
}
