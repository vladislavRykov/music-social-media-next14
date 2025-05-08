import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const pageNumber = searchParams.get('page')
    const is_free = searchParams.get('is_free')
    const actual_since = searchParams.get('actual_since')
    const location = searchParams.get('location')
    const nextPageUrl = searchParams.get('next_page_url')
    console.log(123,nextPageUrl)

    try{
      // if(pageNumber){
      //   const res = await fetch(nextPageUrl)
      //     const data = await res.json()
    
      //     return NextResponse.json(data , { status: 200 });

      // }
    const res = await fetch(
        `https://kudago.com/public-api/v1.4/events/?lang=&fields=images,title,place,description,dates,site_url,tags,price,location,id&expand=&categories=concert,party,festival&order_by=&text_format=&ids=&location=${location}&actual_since=${actual_since}&is_free=${is_free}&page=${pageNumber}&page_size=20`
      )
      const data = await res.json()

      return NextResponse.json(data , { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: 400 });
}
  
}
