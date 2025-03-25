'use server';

import { sendEmail } from '@/lib/mails';
import { mongooseConnect } from '@/lib/mongoose';
import { createSession, deleteSession, updateSession } from '@/lib/sessions';
import { generateForgotPassVerifyToken, generateVerifyToken } from '@/lib/verifyToken';
import { Models } from '@/models/models';
import { LoginData, RegistrationData } from '@/types/types';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const signUp = async (body: RegistrationData) => {
  await mongooseConnect();
  try {
    const user = await Models.User.findOne({ email: body.email });
    if (user) {
      throw new Error('Аккаунт с таким email уже существует');
    }
    const hashPassword = await bcrypt.hash(body.password, 3);
    const newUser = await Models.User.create({ ...body, password: hashPassword });
    const { password, ...newUserWithoutPass } = newUser._doc;
    newUser.save();
    // const [accessToken, refreshToken] = generateTokens(newUserWithoutPass);
    // await saveToken(newUserWithoutPass._id, refreshToken);
    // await createSession(newUser._id);
    const token = await generateVerifyToken(newUserWithoutPass.email);
    const confirmationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token.verifyToken}`;
    const res = await sendEmail({
      to: newUserWithoutPass.email,
      token: token.verifyToken,
      title: 'Подтверждение email',
      confirmationLink,
    });
    if (!res.ok) {
      throw new Error(res.message);
    }
    return { ok: true, message: 'Код подтверждения бы отправлен на почту' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Ошибка при регистрации' };
  }
};

export const signIn = async (body: LoginData) => {
  await mongooseConnect();
  try {
    const user = await Models.User.findOne({ email: body.email });
    if (!user) {
      throw new Error('Неверны пароль или email');
    }
    const isPassEq = await bcrypt.compare(body.password, user.password);
    if (!isPassEq) {
      throw new Error('Неверный пароль или email');
    }
    if (!user.isVerfied) {
      throw new Error('Аккаунт не подтвержден.');
    }
    user.save();
    const { password, ...userWithoutPass } = user._doc;
    await createSession(user._id);

    return { ok: true, message: 'Аутентификация прошла успешно' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Ошибка при входе в аккаунт со стороны сервера' };
  }
};
export const logout = async () => {
  try {
    const res = await deleteSession();
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Произошла ошибка со стороны сервера при выходе' };
  }
};
export const refresh = async () => {
  try {
    const res = await updateSession();
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'Произошла ошибка со стороны сервера при выходе' };
  }
};
export const sendTokenToChangePass = async (email: string) => {
  try {
    const user = await Models.User.findOne({ email });
    if (!user) {
      return { ok: false, message: 'Такого аккаунта не существует.' };
    }
    if (!user.isVerfied) {
      return { ok: false, message: 'Нельзя изменить пароль у неподтвержденного аккаунта.' };
    }
    const token = await generateForgotPassVerifyToken(email);
    const confirmationLink = `${process.env.NEXTAUTH_URL}/forgot/change-pass?token=${token.forgotPasswordToken}`;
    const res = await sendEmail({
      to: email,
      token: token.forgotPasswordToken,
      title: 'Изменение пароля',
      confirmationLink,
    });
    if (!res.ok) {
      return { ok: false, message: res.message };
    }
    return { ok: true, message: 'Ссылка с кодом для изменения пароля была отправлена на почту' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Ошибка при попытке сменить пароль' };
  }
};
export const sendTokenToVerifyEmail = async (email: string) => {
  try {
    const user = await Models.User.findOne({ email });
    if (!user) {
      return { ok: false, message: 'Такого аккаунта не существует.' };
    }
    if (user.isVerfied) {
      return { ok: false, message: 'Аккаунт уже подтвержден' };
    }
    const token = await generateVerifyToken(email);
    const confirmationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token.verifyToken}`;
    const res = await sendEmail({
      to: email,
      token: token.verifyToken,
      title: 'Изменение пароля',
      confirmationLink,
    });
    if (!res.ok) {
      return { ok: false, message: res.message };
    }
    return { ok: true, message: 'Ссылка с кодом для изменения пароля была отправлена на почту' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Ошибка при попытке сменить пароль' };
  }
};
