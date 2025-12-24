import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

/* 🔥 VERCEL DEPLOY FINAL ADD-ONS (NO LOGIC CHANGE) */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";

/**
 * GET /api/me/permissions
 * Returns permissions of currently logged-in user
 */
export async function GET(req: Request) {
  try {
    /* =========================
       1. TOKEN READ FROM COOKIE
    ========================= */
    const cookie = req.headers.get("cookie");
    const token = cookie?.match(/token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json([], { status: 200 });
    }

    /* =========================
       2. VERIFY JWT
    ========================= */
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: number };

    /* =========================
       3. FETCH PERMISSIONS
    ========================= */
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

    /* =========================
       4. RETURN PERMISSION NAMES
    ========================= */
    return NextResponse.json(rows.map((r) => r.name));
  } catch (error) {
    console.error("ME PERMISSIONS ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}
