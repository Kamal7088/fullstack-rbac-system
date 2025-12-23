import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!userRes.rows.length) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = userRes.rows[0];
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
