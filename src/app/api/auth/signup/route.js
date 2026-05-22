import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signSession, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    const token = await signSession({ sub: user._id.toString(), email: user.email });
    await setSessionCookie(token);

    return Response.json({ user: user.toPublicJSON() }, { status: 201 });
  } catch (err) {
    console.error("[/api/auth/signup]", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
