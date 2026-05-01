import { NextResponse } from "next/server";
import { buildLogoutCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const cookie = buildLogoutCookie();
  response.cookies.set(cookie);
  return response;
}
