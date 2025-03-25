import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionPayload } from '@/types/types';
import { mongooseConnect } from './mongoose';
import { Models } from '@/models/models';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const secretKey = process.env.NEXTJWT_REFRESH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}
export async function generateTokens(userId: any): Promise<[string, Date]> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  return [session, expiresAt];
}
export async function createSession(userId: string) {
  await mongooseConnect();
  const [session, expiresAt] = await generateTokens(userId);
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  await saveToken(userId, session);
}

export async function verifySession() {
  await mongooseConnect();
  const session = (await cookies()).get('session')?.value;
  const payload = (await decrypt(session)) as undefined | (SessionPayload & JWTPayload);
  const token = await Models.Token.findOne({ refreshToken: session });
  if (!payload?.userId || !session || !token) {
    return null;
  }
  return payload;
}

export async function updateSession() {
  await mongooseConnect();
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    throw new Error('Вы не были авторизованны.');
  }
  const token = await Models.Token.findOne({ refreshToken: session });
  if (!token) {
    throw new Error('Вы не были авторизованны.');
  }
  await createSession(payload.userId as string);
  return { success: true, message: 'Сессия успешно обновлена' };
}
export async function deleteSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    throw new Error('Вы не были авторизованны.');
  }

  await removeToken(session);
  cookieStore.delete('session');
  return { success: true, message: 'Успешный выход из сессии' };
}
export async function saveToken(userId: string, session: string) {
  await mongooseConnect();
  const tokenData = await Models.Token.findOne({ userId });
  if (tokenData) {
    tokenData.refreshToken = session;
    return tokenData.save();
  }
  const token = Models.Token.create({
    userId: userId,
    refreshToken: session,
  });
  return token;
}
export async function removeToken(refreshToken: string) {
  await mongooseConnect();
  const tokenData = await Models.Token.deleteOne({ refreshToken });
  return tokenData;
}
