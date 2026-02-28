import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });
  if (data?.data?.access_token) {
    const isProd = process.env.NODE_ENV === "production";
    const maxAgeSeconds = 60 * 60 * 24; // 1 day
    response.headers.append(
      "Set-Cookie",
      [
        `access_token=${data?.data?.access_token}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
        `Max-Age=${maxAgeSeconds}`,
        isProd ? "Secure" : "",
      ]
        .filter(Boolean)
        .join("; "),
    );
  }

  return response;
}