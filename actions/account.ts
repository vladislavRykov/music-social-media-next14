'use server';

import { setNewUserName } from '@/dal/user';
import { sendEmail } from '@/lib/mails';
import { deleteSession, verifySession } from '@/lib/sessions';
import { generateVerifyToken } from '@/lib/verifyToken';
import { Models } from '@/models/models';
import bcrypt from 'bcryptjs';

export const changeUserName = async (newName: string) => {
  const session = await verifySession();
  if (!session) {
    return { ok: false, message: 'Вы не авторизированы' };
  }
  const res = await setNewUserName(newName, session.userId);
  return res;
};
export const sendTokenToChangeEmail = async (newEmail: string) => {
  const session = await verifySession();
  if (!session) {
    return { ok: false, message: 'Вы не авторизированы' };
  }
  try {
    const user = await Models.User.findOne({ _id: session.userId });
    if (!user) {
      return { ok: false, message: 'Такого аккаунта не существует.' };
    }
    user.newEmail = newEmail;
    await user.save();
    const token = await generateVerifyToken(user.email);
    const confirmationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token.verifyToken}`;
    const res = await sendEmail({
      to: newEmail,
      token: token.verifyToken,
      title: 'Изменение email',
      confirmationLink,
    });
    if (!res.ok) {
      return { ok: false, message: res.message };
    }
    return { ok: true, message: 'Ссылка с кодом для изменения email была отправлена на почту' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Ошибка при попытке сменить email' };
  }
};
export const changeAccountPassword = async (newPassword: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const user = await Models.User.findOne({ _id: session.userId });
    if (!user) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const hashPassword = await bcrypt.hash(newPassword, 3);

    user.password = hashPassword;

    await user.save();
    return { ok: true, message: 'Смена пароля прошла успешно' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
};
export const deleteAccount = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const res = await deleteSession();
    if (!res.success) {
      return { ok: false, message: 'Не удалось выйти из сессии.' };
    }
    const user = await Models.User.findByIdAndDelete(session.userId);
    return { ok: true, message: 'Аккаунт удален.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка.' };
  }
};
