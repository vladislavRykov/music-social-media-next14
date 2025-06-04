'use server';

import { createChat, findAllCurrentUserChats, findDialogByMembers } from '@/dal/chat';
import { isUserBlocked } from '@/dal/relation';
import { verifySession } from '@/lib/sessions';
import { ChatMongooseT } from '@/types/chatTypes';
import { Overwrite } from '@/types/common';
import { MessageMongoose } from '@/types/messageT';
import { RelationMongooseT } from '@/types/relationT';
import { UserProfileData } from '@/types/types';
import { Schema } from 'mongoose';

export const createDialogAction = async (otherMember: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const isBlocked = await isUserBlocked({
      currentUserId: session.userId,
      otherUserId: otherMember,
    });
    if (isBlocked) return { ok: false, message: 'Пользователь вас заблокировал.' };
    const dialog = await findDialogByMembers([otherMember, session.userId.toString()]);
    if (dialog) return { ok: false, data: dialog, message: 'Такой чат уже существует' };
    const newChat = await createChat([session.userId.toString(), otherMember.toString()]);
    return { ok: true, data: newChat._doc, message: 'Чат успешно создан' };
  } catch (error) {
    console.log(123, error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при создании чата' };
  }
};
type MessageWithAuthor = Overwrite<
  MessageMongoose,
  { author: { _id: Schema.Types.ObjectId; username: string } }
>;
export const findAllCurrentUserChatsAction = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const chats = await findAllCurrentUserChats<
      Overwrite<
        ChatMongooseT,
        {
          members: UserProfileData[];
          lastMessage: MessageWithAuthor | null;
          relation?: RelationMongooseT;
        }
      >[]
    >(session.userId, [
      { path: 'members', select: '_id username avatar banner' },
      { path: 'lastMessage', populate: { path: 'author', model: 'User', select: 'username' } },
      { path: 'relation' },
    ]);
    const formattedChars = chats.map((chat) => {
      const membersWithoutCurrentUser = chat.members.filter(
        (member) => member._id.toString() !== session.userId.toString(),
      );
      const serializedMembers: UserProfileData[] = chat.members.map((member) => ({
        ...member,
        _id: member._id.toString(),
      }));
      const otherMember =
        membersWithoutCurrentUser.length === 0 ? chat.members[0] : membersWithoutCurrentUser[0];

      return {
        ...chat,
        _id: chat._id.toString(),
        members: serializedMembers,
        relation:
          chat.relation &&
          ({
            ...chat.relation,
            _id: chat.relation._id.toString(),
            userA: chat.relation.userA.toString(),
            userB: chat.relation.userB.toString(),
          } as RelationMongooseT),
        lastMessage: chat.lastMessage && {
          ...chat.lastMessage,
          _id: chat.lastMessage._id.toString(),
          chat: chat.lastMessage.chat.toString(),
          author: { ...chat.lastMessage.author, _id: chat.lastMessage.author._id.toString() },
        },
        chatName: otherMember.username,
        chatImg: otherMember.avatar,
      };
    });
    return { ok: true, data: formattedChars, message: 'Чаты пользователя получены' };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при получении чатов' };
  }
};
