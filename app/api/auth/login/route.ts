// import bcrypt from 'bcryptjs';
// import { mongooseConnect } from '@/lib/mongoose';
// import { Models } from '@/models/models';
// import { LoginData, RegistrationData } from '@/types/types';
// import mongoose from 'mongoose';
// import { NextRequest, NextResponse } from 'next/server';
// import { generateTokens, saveToken } from '@/services/token-service';

// type ResponseData = {
//   message: string;
// };

// export async function POST(req: NextRequest) {
//   await mongooseConnect();
//   const body: LoginData = await req.json();
//   try {
//     const user = await Models.User.findOne({ email: body.email });
//     if (!user) {
//       return NextResponse.json<ResponseData>(
//         { message: 'Неверный пароль или email' },
//         { status: 400 },
//       );
//     }
//     const isPassEq = await bcrypt.compare(body.password, user.password);
//     if (!isPassEq) {
//       return NextResponse.json<ResponseData>(
//         { message: 'Неверный пароль или email' },
//         { status: 400 },
//       );
//     }

//     const { password, ...userWithoutPass } = user._doc;

//     const [accessToken, refreshToken] = generateTokens(userWithoutPass);
//     await saveToken(userWithoutPass._id, refreshToken);
//     user.save();
//     const response = NextResponse.json(
//       { ...userWithoutPass, accessToken, refreshToken },
//       { status: 200 },
//     );
//     response.cookies.set('refreshToken', refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json<ResponseData>(
//       { message: 'Неверный пароль или email' },
//       { status: 400 },
//     );
//   }
// }
