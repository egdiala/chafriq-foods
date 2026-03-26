import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const backendFormData = new FormData();
  backendFormData.append("file", file);

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/cooks/accounts/business-logo`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${req.cookies.get("access_token")?.value}`,
      },
      body: backendFormData,
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}