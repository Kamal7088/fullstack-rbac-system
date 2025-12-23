import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { roleId, permissionId } = await req.json();

  if (!roleId || !permissionId) {
    return NextResponse.json(
      { error: "roleId & permissionId required" },
      { status: 400 }
    );
  }

  await pool.query(
    `
    INSERT INTO role_permissions (role_id, permission_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [roleId, permissionId]
  );

  return NextResponse.json({ success: true });
}
