import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,context:any) {
    // const { searchParams } = new URL(req.url);
    const {params}=context

    try{
    const res = await fetch(
        `https://kudago.com/public-api/v1.4/locations/${params.slug}/?lang=&fields=slug,name`
      )
      const data: Location = await res.json()

      return NextResponse.json(data , { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Что-то пошло не так' }, { status: 400 });
}
  
}
