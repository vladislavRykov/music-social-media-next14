'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { decrypt } from '@/lib/sessions';
import { Models } from '@/models/models';
import { SessionPayload } from '@/types/types';
import bcrypt from 'bcryptjs';
import { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

export const verifyEmail = async (token: string) => {
  try {
    const user = await Models.User.findOne({ verifyToken: token });

    if (!user) {
      return { ok: false, message: 'Неверный код подтверждения' };
    }
    const isExpired = new Date(user.verifyTokenExpiry) < new Date();
    if (isExpired) {
      return { ok: false, message: 'У кода подтверждения истек срок действия' };
    }

    user.isVerfied = true;
    if (user.newEmail) {
      user.email = user.newEmail;
      await Models.User.updateOne(
        { verifyToken: token }, // Критерий поиска документа для обновления
        { $unset: { newEmail: 1 } }, // Оператор $unset для удаления поля
      );
    }
    await user.save();
    await Models.User.updateOne(
      { verifyToken: token }, // Критерий поиска документа для обновления
      { $unset: { verifyToken: 1, verifyTokenExpiry: 1 } }, // Оператор $unset для удаления поля
    );

    return { ok: true, message: 'Подтверждение прошло успешно' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: 'Ошибка при верификация токена' };
    }
    return { ok: false, message: 'Непредвиденная ошибка при подтверждении почты' };
  }
};
export const verificationPassChange = async (token: string, password: string) => {
  try {
    const user = await Models.User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return { ok: false, message: 'Неверный код подтверждения' };
    }
    const isExpired = new Date(user.forgotPasswordTokenExpiry) < new Date();
    if (isExpired) {
      return { ok: false, message: 'У кода подтверждения истек срок действия' };
    }
    const hashPassword = await bcrypt.hash(password, 3);

    user.password = hashPassword;

    await user.save();
    await Models.User.updateOne(
      { forgotPasswordToken: token }, // Критерий поиска документа для обновления
      { $unset: { forgotPasswordToken: 1, forgotPasswordTokenExpiry: 1 } }, // Оператор $unset для удаления поля
    );

    return { ok: true, message: 'Смена пароля прошла успешно.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: 'Ошибка при верификация токена.' };
    }
    return { ok: false, message: 'Непредвиденная ошибка при подтверждении почты.' };
  }
};
export async function verifySession2() {
  await mongooseConnect();
  const session = (await cookies()).get('session')?.value;
  const payload = (await decrypt(session)) as undefined | (SessionPayload & JWTPayload);
  const token = await Models.Token.findOne({ refreshToken: session });
  if (!payload?.userId || !session || !token) {
    return null;
  }
  return token;
}
