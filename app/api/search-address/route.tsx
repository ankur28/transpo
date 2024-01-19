import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  const res = await fetch(
    `${BASE_URL}?q=${searchText}?language=en&limit=8&session_token=076431d0-2074-4711-88ce-fa1b9e304a31&country=US&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
  {
    headers: {
        "Content-Type" : "application/json"
    }
  } );
  const searchRes = await res.json()
  return NextResponse.json( searchRes  );
}
