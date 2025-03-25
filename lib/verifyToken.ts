'use server';
import { Models } from '@/models/models';
import { UserDataMongoose } from '@/types/types';
import { v4 as uuid4 } from 'uuid';

export const generateVerifyToken = async (email: string) => {
  try {
  } catch (error) {}
  const token = uuid4();
  const expires = new Date().getTime() + 1000 * 60 * 60; //1 час

  const user = await Models.User.findOne({ email });

  user.verifyToken = token;
  user.verifyTokenExpiry = expires;
  await user.save();

  return { verifyToken: token, verifyTokenExpiry: expires };
};
export const generateForgotPassVerifyToken = async (email: string) => {
  try {
  } catch (error) {}
  const token = uuid4();
  const expires = new Date().getTime() + 1000 * 60 * 60; //1 час

  const user = await Models.User.findOne({ email });

  user.forgotPasswordToken = token;
  user.forgotPasswordTokenExpiry = expires;
  await user.save();

  return { forgotPasswordToken: token, forgotPasswordTokenExpiry: expires };
};
