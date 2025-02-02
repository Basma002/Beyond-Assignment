import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ error: errorData.error }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 201 });
}
