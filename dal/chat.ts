'use server';

import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { ChatMongooseT } from '@/types/chatTypes';

export const createChat = async (members: string[]) => {
  await mongooseConnect();
  const chat = await Models.Chat.create({
    members,
  });

  return chat;
};
export const findAllCurrentUserChats = async <T>(
  currentUserId: string,
  populate?: {
    path: string;
    select?: string;
    populate?: { path: string; model: string; select?: string };
  }[],
) => {
  await mongooseConnect();
  const query = Models.Chat.find({
    members: { $in: currentUserId },
  });

  if (populate) {
    query.populate(populate);
  }
  const chat = await query.sort({ updatedAt: -1 }).lean<T>().exec();
  return chat;
};
export const findDialogByMembers = async (members: string[]) => {
  await mongooseConnect();
  const chat = await Models.Chat.findOne({
    type: 'dialog',
    members: { $all: members },
  }).lean<ChatMongooseT>();

  return chat;
};
export const findChatById = async (chatId: string) => {
  await mongooseConnect();
  const chat = await Models.Chat.findById(chatId).lean<ChatMongooseT>();

  return chat;
};
export const findChatByIdPopulated = async <T>(
  chatId: string,
  populate?: {
    path: string;
    select?: string;
    populate?: { path: string; model: string; select?: string };
  }[],
) => {
  await mongooseConnect();
  const query = Models.Chat.findById(chatId).lean<T>();

  if (populate) {
    query.populate(populate);
  }
  const chat = await query.lean<T>().exec();
  return chat;
};
export const updateChatLastMessage = async (chatId: string, messageId: string) => {
  await mongooseConnect();
  const chat = await Models.Chat.findOneAndUpdate(
    { _id: chatId },
    { lastMessage: messageId },
    { new: true },
  ).lean<ChatMongooseT>();

  return chat;
};
export const updateChatRelation = async (chatId: string, relation: string) => {
  await mongooseConnect();
  const updatedChat = await Models.Chat.findByIdAndUpdate(
    { _id: chatId },
    { relation },
    { new: true },
  ).lean<ChatMongooseT>();

  return updatedChat;
};
