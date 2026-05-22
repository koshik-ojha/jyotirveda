import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session?.sub) {
    return Response.json({ user: null });
  }

  await connectDB();
  const user = await User.findById(session.sub);
  if (!user) return Response.json({ user: null });

  return Response.json({ user: user.toPublicJSON() });
}
