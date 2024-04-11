import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24 Hours from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(username: string, email: string, firstName: string, lastName: string, rollNumber: any) {
  // Verify credentials && get the user

  const user = { username: username, email: email, firstName: firstName, lastName: lastName, rollNumber: rollNumber };

  // Create the session
  const hoursToExpire = 24;
  const millisecondsInHour = 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
  const expires = new Date(Date.now() + hoursToExpire * millisecondsInHour);
  const session = await encrypt({ user, expires });

  // console.log(session);
  

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}
export async function teacherlogin(email: string, username: string, full_name: string) {
  // Verify credentials && get the user

  const user = { email: email, username: username, full_name: full_name};

  // Create the session
  const hoursToExpire = 6;
  const millisecondsInHour = 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
  const expires = new Date(Date.now() + hoursToExpire * millisecondsInHour);
  const session = await encrypt({ user, expires });

  // console.log(session);
  

  // Save the session in a cookie
  cookies().set("ad_session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  cookies().set("ad_session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
export async function getAdSession() {
  const session = cookies().get("ad_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  const hoursToExpire = 1;
  const millisecondsInHour = 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
  parsed.expires = new Date(Date.now() + hoursToExpire * millisecondsInHour);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}