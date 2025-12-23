import { NextResponse } from "next/server";

export async function GET() {
  try {
    const permissions = [
      { id: 1, name: "READ_USERS" },
      { id: 2, name: "CREATE_USERS" },
    ];

    return NextResponse.json(permissions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}
