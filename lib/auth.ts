import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET || "default_secret_for_dev_only_change_in_prod";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(password: string) {
  // Simple password check against env
  if (password === (process.env.ADMIN_PASSWORD || "admin123")) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ admin: true, expires });

    (await cookies()).set("admin_session", session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
    return true;
  }
  return false;
}

export async function logout() {
  (await cookies()).set("admin_session", "", { expires: new Date(0) });
}

export async function getSession(req?: NextRequest) {
  const cookieStore = req ? req.cookies : await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (e) {
    return null;
  }
}
