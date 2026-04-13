import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function getKey() {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.warn("JWT_SECRET is missing");
    }
    return new TextEncoder().encode("dev-only-secret-do-not-use-in-prod");
  }

  return new TextEncoder().encode(secretKey);
}

// 🔐 Encrypt (JWT Sign)
export async function encrypt(payload: Record<string, unknown>) {
  const key = getKey(); // ✅ FIXED

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(key);
}

// 🔓 Decrypt (JWT Verify)
export async function decrypt(input: string): Promise<Record<string, unknown> | null> {
  try {
    const key = getKey(); // ✅ FIXED

    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

// 🔑 Login
export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return false;
  }

  if (password === adminPassword) {
    const expires = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8h

    const session = await encrypt({
      admin: true,
      expires: expires.toISOString(),
    });

    (await cookies()).set("admin_session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return true;
  }

  return false;
}

// 🚪 Logout
export async function logout() {
  (await cookies()).set("admin_session", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

// 📦 Get Session
export async function getSession(req?: NextRequest) {
  const cookieStore = req ? req.cookies : await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) return null;

  return await decrypt(session);
}