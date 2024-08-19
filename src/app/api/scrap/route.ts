import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (!data)
    return NextResponse.json({ data: "Invalid url provided", status: 400 });
  const response = await fetch(`${process.env.BACKEND_URL}/api/scraper/scrap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: data.url }),
  });
  const responseData = await response.json();

  return NextResponse.json({ data: responseData.data, status: 200 });
  
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url)
    return NextResponse.json({ data: "Invalid url provided", status: 400 });

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/scraper/deep_scrap`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );
  const data = await response.json()
  return NextResponse.json({ data: data.data, status: 200 });
  
}
