export const dynamic = "force-static";
export const revalidate = 3600;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  return Response.json(data);
}