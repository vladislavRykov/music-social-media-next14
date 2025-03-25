import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { LoginData, RegistrationData, SessionPayload } from '@/types/types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessions';
import { JWTPayload } from 'jose';

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();
    // const session = await verifySession();
    // if (!session) {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }
    // const user = await Models.User.findById(session.userId);
    const user = await Models.User.findOne({ username: '123' });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json<ResponseData>({ message: error.message }, { status: 400 });
  }
}
