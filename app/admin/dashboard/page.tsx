import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900
      flex items-center justify-center
      p-6
    ">
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-indigo-200">
            Control Users, Roles & Permissions
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Manage Users */}
          <Link href="/users">
            <div
              tabIndex={0}
              className="
                cursor-pointer
                bg-white/95 backdrop-blur
                rounded-2xl p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                hover:bg-indigo-50
                focus:outline-none
                focus:ring-4 focus:ring-indigo-400
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                👤
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Manage Users
              </h2>
              <p className="text-gray-600">
                Assign roles to users
              </p>
            </div>
          </Link>

          {/* Manage Roles */}
          <Link href="/roles">
            <div
              tabIndex={0}
              className="
                cursor-pointer
                bg-white/95 backdrop-blur
                rounded-2xl p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                hover:bg-purple-50
                focus:outline-none
                focus:ring-4 focus:ring-purple-400
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                👑
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Manage Roles
              </h2>
              <p className="text-gray-600">
                Create & manage roles
              </p>
            </div>
          </Link>

          {/* Assign Permissions */}
          <Link href="/permissions">
            <div
              tabIndex={0}
              className="
                cursor-pointer
                bg-white/95 backdrop-blur
                rounded-2xl p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                hover:bg-red-50
                focus:outline-none
                focus:ring-4 focus:ring-red-400
                transition-all duration-300
                group
              "
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                🔐
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Assign Permissions
              </h2>
              <p className="text-gray-600">
                Control role permissions
              </p>
            </div>
          </Link>

        </div>

        {/* FOOTER */}
        <div className="mt-14 text-center text-indigo-300 text-sm">
          Secure RBAC Admin Panel
        </div>

      </div>
    </div>
  );
}
