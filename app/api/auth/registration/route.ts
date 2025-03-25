import bcrypt from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { RegistrationData } from '@/types/types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const body: RegistrationData = await req.json();
  try {
    const user = await Models.User.findOne({ email: body.email });
    if (user) {
      return NextResponse.json<ResponseData>(
        { message: 'Аккаунт с таким email уже существует' },
        { status: 400 },
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 3);
    // const isPassEq = await bcrypt.compare(body.password, hashPassword);
    const newUser = await Models.User.create({ ...body, password: hashPassword });
    const { password, ...newUserWithoutPass } = newUser._doc;
    // const [accessToken, refreshToken] = generateTokens(newUserWithoutPass);
    // await saveToken(newUserWithoutPass._id, refreshToken);
    // newUser.save();
    // const response = NextResponse.json(
    //   { ...newUserWithoutPass, accessToken, refreshToken },
    //   { status: 200 },
    // );
    // response.cookies.set('refreshToken', refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    // return response;
  } catch (error) {
    return NextResponse.json<ResponseData>(
      { message: 'Аккаунт с таким email уже существует' },
      { status: 400 },
    );
  }
}
