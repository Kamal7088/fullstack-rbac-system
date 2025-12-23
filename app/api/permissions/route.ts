import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT id, name FROM permissions ORDER BY id"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  await pool.query(
    "INSERT INTO permissions (name) VALUES ($1) ON CONFLICT DO NOTHING",
    [name.trim()]
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  await pool.query("DELETE FROM permissions WHERE id=$1", [id]);
  return NextResponse.json({ success: true });
}
