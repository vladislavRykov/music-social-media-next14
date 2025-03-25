import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { LoginData, RegistrationData, SessionPayload } from '@/types/types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessions';
import { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    // const session = await verifySession();
    const token = await Models.Token.findOne({ refreshToken: body.session });
    return NextResponse.json(token, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ResponseData>({ message: error.message }, { status: 400 });
    }
    return NextResponse.json<ResponseData>({ message: 'Что-то пошло не так' }, { status: 400 });
  }
}
