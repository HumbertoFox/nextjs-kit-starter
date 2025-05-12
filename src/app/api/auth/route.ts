import { getUser } from "@/lib/dal"
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await verifySession()
    if (!session) return new Response(null, { status: 401 });

    const user = await getUser();

    return NextResponse.json(user);
}