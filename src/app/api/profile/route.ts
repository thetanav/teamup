import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/server/profileActions";
import { auth } from "@/server/auth/index";
import { success } from "zod/v4";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await getProfile(session.user.email);
  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const updated = await updateProfile(session.user.email, data);
  console.log("u", updated);
  return NextResponse.json(updated);
} 