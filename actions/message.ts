'use server';

import {
  createChat,
  findAllCurrentUserChats,
  findChatById,
  findChatByIdPopulated,
  findDialogByMembers,
} from '@/dal/chat';
import {
  createAudioMessage,
  createMessage,
  deleteMessageById,
  findMessagesByChatId,
} from '@/dal/message';
import { verifySession } from '@/lib/sessions';
import { ChatMongooseT } from '@/types/chatTypes';
import { Overwrite } from '@/types/common';
import { AudioMessageCreateFields, MessageCreateFields, MessageMongoose } from '@/types/messageT';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';
import { UserProfileData } from '@/types/types';
import mongoose from 'mongoose';

export const sendMessageAction = async (data: Omit<MessageCreateFields, 'author'>) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const newMessage = await createMessage({ ...data, author: session.userId });
    return { ok: true, data: newMessage, message: 'Сообщение отправлено' };
  } catch (error) {
    console.log(123, error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при отправке сообщения' };
  }
};
export const sendAudioMessageAction = async (data: Omit<AudioMessageCreateFields, 'author'>) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const newMessage = await createAudioMessage({ ...data, author: session.userId });
    return { ok: true, data: newMessage, message: 'Сообщение отправлено' };
  } catch (error) {
    console.log(123, error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при отправке сообщения' };
  }
};
export const findMessagesByChatIdAction = async (chatId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const chat = await findChatByIdPopulated<
      Overwrite<
        ChatMongooseT,
        {
          relation?: RelationMongooseT;
        }
      >
    >(chatId, [{ path: 'relation' }]);

    if (!chat) return { ok: false, data: null, message: 'Такого чата не существует' };
    console.log(222, chat.members.includes(session.userId));
    if (chat.members.filter((member) => member.toString() === session.userId).length === 0)
      return { ok: false, data: null, message: 'Вы не участник этого чата' };
    if (chat.relation?.status === RelationStatus.Blocked) {
      if (chat.relation.userA.toString() === session.userId) {
        return { ok: false, data: null, message: 'Вы заблокировали этот чат' };
      } else {
        return { ok: false, data: null, message: 'Пользователь заблокировал вас. Чат недоступен' };
      }
    }

    const messages = await findMessagesByChatId<
      Overwrite<MessageMongoose, { author: UserProfileData }>[]
    >(chatId, [{ path: 'author', select: '_id username avatar banner' }]);
    console.log(messages);
    const formattedChars = messages.map((message) => {
      return {
        ...message,
        isCurrentUserMessage: message.author._id.toString() === session.userId,
      };
    });
    return { ok: true, data: formattedChars, message: 'Сообщения чата получены' };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при получении сообщений чата' };
  }
};
export const deleteMessageByIdAction = async (messageId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const deletedMessage = await deleteMessageById(messageId);
    return { ok: true, data: deletedMessage, message: 'Сообщение удалено' };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при удалении сообщения чата' };
  }
};
