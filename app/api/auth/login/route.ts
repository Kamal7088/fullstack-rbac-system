import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/* 🔥 VERCEL DEPLOY FIX (NO LOGIC CHANGE) */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password, type } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email & password required" },
      { status: 400 }
    );
  }

  const role = type === "admin" ? "admin" : "user";

  const token = jwt.sign(
    { email, role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ token, role });

  // 🔥 COOKIE SET (middleware isi se role padhega)
  res.cookies.set("user_role", role, {
    httpOnly: false,
    path: "/",
  });

  return res;
}
