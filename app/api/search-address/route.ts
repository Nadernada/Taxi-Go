import { NextResponse } from "next/server";

const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest'

export async function GET(
  request: Request
) {

  const { searchParams } = new URL(request.url)

  const searchText = searchParams.get('q')

  const res = await fetch(BASE_URL + '?q=' + searchText + '&language=en&session_token=0a1f4412-b20b-4aa1-88a8-e91a8c10ca71&' + '&access_token=' + process.env.MAPBOX_TOKEN, {
    headers: {
      "Content-type": "application/json"
    }
  })

  const searchResult = await res.json()

  return NextResponse.json(searchResult)
}

