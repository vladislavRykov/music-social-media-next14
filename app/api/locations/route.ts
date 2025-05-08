import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const { searchParams } = new URL(req.url);

    try{
    const res = await fetch(
        `https://kudago.com/public-api/v1.4/locations/?lang=&fields=&order_by=`
      )
      const data: Location[] = await res.json()

      return NextResponse.json(data , { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: 400 });
}
  
}
