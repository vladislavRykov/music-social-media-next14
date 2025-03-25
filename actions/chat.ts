'use server';

import { createChat, findAllCurrentUserChats, findDialogByMembers } from '@/dal/chat';
import { verifySession } from '@/lib/sessions';
import { ChatMongooseT } from '@/types/chatTypes';
import { Overwrite } from '@/types/common';
import { MessageMongoose } from '@/types/messageT';
import { UserProfileData } from '@/types/types';
import { Schema } from 'mongoose';

export const createDialogAction = async (otherMember: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
   const dialog = await  findDialogByMembers([otherMember,session.userId.toString()])
   if(dialog) return { ok: false, data: null, message: 'Такой чат уже существует' };
    const newChat = await createChat([session.userId.toString(), otherMember.toString()]);
    // console.log(newChat)
    return { ok: true, data: newChat._doc, message: 'Чат успешно создан' };
  } catch (error) {
    console.log(123,error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при создании чата' };
  }
};
type MessageWithAuthor = Overwrite<MessageMongoose,{author: {_id: Schema.Types.ObjectId,username:string}}>
export const findAllCurrentUserChatsAction = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const chats =await findAllCurrentUserChats<Overwrite<ChatMongooseT,{members: UserProfileData[],lastMessage: MessageWithAuthor | null }>[]>(session.userId,[{path:'members',select: '_id username avatar banner'},{path: 'lastMessage',populate:{ path: 'author', model: 'User',select: 'username' }}])
    console.log(chats[1])
    const formattedChars = chats.map(chat=>{
        

        const membersWithoutCurrentUser = chat.members.filter(member=>member._id.toString()!==session.userId.toString())

        const otherMember = membersWithoutCurrentUser.length===0 ? chat.members[0] :membersWithoutCurrentUser[0]
    
        return {...chat,chatName: otherMember.username,chatImg: otherMember.avatar}

    })
    return { ok: true, data: formattedChars, message: 'Чаты пользователя получены' };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, message: 'Неожиданная ошибка при получении чатов' };
  }
};
