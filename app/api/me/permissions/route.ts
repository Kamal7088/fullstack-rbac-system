import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

/* 🔥 VERCEL FINAL FIX */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/me/permissions
 * Returns permissions of currently logged-in user
 */
export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    const token = cookie?.match(/token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json([], { status: 200 });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: number };

    const { rows } = await pool.query(
      `
      SELECT DISTINCT p.name
      FROM permissions p
      INNER JOIN role_permissions rp 
        ON rp.permission_id = p.id
      INNER JOIN user_roles ur 
        ON ur.role_id = rp.role_id
      WHERE ur.user_id = $1
      `,
      [payload.id]
    );

    return NextResponse.json(rows.map((r) => r.name));
  } catch (error) {
    console.error("ME PERMISSIONS ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}
