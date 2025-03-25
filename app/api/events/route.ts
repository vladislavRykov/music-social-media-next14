import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const pageNumber = searchParams.get('page')
    const is_free = searchParams.get('is_free')
    try{
    const res = await fetch(
        `https://kudago.com/public-api/v1.4/events/?lang=&fields=images,title,place,description,dates,site_url,tags,price,location,id&expand=&categories=concert,party,festival&order_by=&text_format=&ids=&location=spb&actual_since=1740531791&is_free=${is_free}&lon=&lat=&radius=`
      )
      const data = await res.json()

      return NextResponse.json(data , { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: 400 });
}
  
}
