// import bcrypt from 'bcryptjs';
// import { mongooseConnect } from '@/lib/mongoose';
// import { Models } from '@/models/models';
// import { LoginData, RegistrationData } from '@/types/types';
// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';
// import { generateTokens, removeToken, saveToken } from '@/services/token-service';

// type ResponseData = {
//   message: string;
// };

// export async function POST(req: NextRequest) {
//   await mongooseConnect();
//   try {
//     const refreshToken = req.cookies.get('refreshToken')?.value;
//     const token = await removeToken(refreshToken || '');
//     const response = NextResponse.json(token, { status: 200 });
//     response.cookies.set('refreshToken', '', {
//       httpOnly: true,
//       expires: new Date(0),
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json<ResponseData>({ message: error.message }, { status: 400 });
//   }
// }
