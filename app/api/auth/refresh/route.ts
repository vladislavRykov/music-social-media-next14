// import bcrypt from 'bcryptjs';
// import { mongooseConnect } from '@/lib/mongoose';
// import { Models } from '@/models/models';
// import { LoginData, RegistrationData } from '@/types/types';
// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';
// import { generateTokens, saveToken, validateRefreshToken } from '@/services/token-service';

// type ResponseData = {
//   message: string;
// };

// export async function POST(req: NextRequest) {
//   try {
//     await mongooseConnect();
//     //   const body: LoginData = await req.json();
//     const refreshTokenC = req.cookies.get('refreshToken')?.value;
//     //   return NextResponse.json({ refreshToken }, { status: 200 });

//     if (!refreshTokenC) {
//       throw new Error('Вы не были авторизованы');
//     }
//     const userInfo = validateRefreshToken(refreshTokenC);
//     const token = await Models.Token.findOne({ refreshToken: refreshTokenC });
//     if (!userInfo || !token) {
//       throw new Error('Такого refreshToken не существует или он не валиден');
//     }

//     const user = await Models.User.findById(userInfo._id);
//     const { password, ...userWithoutPass } = user._doc;

//     const [accessToken, refreshToken] = generateTokens(userWithoutPass);
//     await saveToken(userWithoutPass._id, refreshToken);
//     const response = NextResponse.json(
//       { ...userWithoutPass, accessToken, refreshToken },
//       { status: 200 },
//     );
//     user.save();
//     response.cookies.set('refreshToken', refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }
