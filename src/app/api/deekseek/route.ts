export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { balance_infos: [] },
      { status: 200 }
    );
  }

  const res = await fetch("https://api.deepseek.com/user/balance", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}