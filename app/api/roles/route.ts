import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const result = await pool.query("SELECT id, name FROM roles ORDER BY id");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Role name required" }, { status: 400 });
  }

  await pool.query(
    "INSERT INTO roles (name) VALUES ($1) ON CONFLICT DO NOTHING",
    [name.trim()]
  );

  return NextResponse.json({ success: true });
}
