import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signSession, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+passwordHash"
    );
    if (!user) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await signSession({ sub: user._id.toString(), email: user.email });
    await setSessionCookie(token);

    return Response.json({ user: user.toPublicJSON() });
  } catch (err) {
    console.error("[/api/auth/login]", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
