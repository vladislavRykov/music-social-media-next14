import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
        await mongooseConnect();
    const token = await Models.Token.findOne({ refreshToken: body.session });
    return NextResponse.json(token, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ResponseData>({ message: error.message }, { status: 400 });
    }
    return NextResponse.json<ResponseData>({ message: 'Что-то пошло не так' }, { status: 400 });
  }
}
