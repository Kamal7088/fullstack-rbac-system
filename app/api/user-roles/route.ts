import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

/* ================= GET ================= */
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        u.id AS user_id,
        u.email,
        r.id AS role_id,
        r.name AS role
      FROM user_roles ur
      JOIN users u ON u.id = ur.user_id
      JOIN roles r ON r.id = ur.role_id
      ORDER BY u.email
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("USER ROLES GET ERROR:", error);
    return NextResponse.json([], { status: 200 });
  }
}

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const { userId, roleId } = await req.json();

    if (!userId || !roleId) {
      return NextResponse.json(
        { error: "userId and roleId required" },
        { status: 400 }
      );
    }

    await pool.query(
      `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [userId, roleId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("USER ROLE POST ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
