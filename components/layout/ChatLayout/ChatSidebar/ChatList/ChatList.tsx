'use client';
import React, { useEffect, useState } from 'react';
import s from './ChatList.module.scss';
import chatImg from '@/public/avatar.jpg';
import ChatListItem from './ChatListItem/ChatListItem';
import LoadingSvg from '@/public/circleTube.svg';
import { useParams } from 'next/navigation';
import { useAsync } from '@/hooks/useFetching';
import { findAllCurrentUserChatsAction } from '@/actions/chat';
import Image from 'next/image';
import { UserProfileData } from '@/types/types';
import { MessageWithAuthor } from '@/types/chatTypes';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentUserChatsThunk } from '@/redux/slices/ChatsSlice';
import { chatsDataSelector } from '@/redux/selectors/chatSelectors';

const ChatList = () => {
  const params: { id: string } | null = useParams();
  const { isLoading, chats, errorMessage } = useAppSelector(chatsDataSelector);
  const dispatch = useAppDispatch();

  // const getChats = async () => {
  //   const res = await findAllCurrentUserChatsAction();
  //   console.log(res)
  //   if (!res.ok) throw new Error(res.message);
  //   return res.data;
  // };

  // const { status, data: chats, error ,helpers} = useAsync(getChats);
  useEffect(() => {
    dispatch(getCurrentUserChatsThunk());
  }, []);

  return (
    <div className={s.chatList}>
      {/* {status === 'pending' && <div style={{textAlign: 'center'}}> */}
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          <Image src={LoadingSvg} alt="loading..." height={100} width={100} />
        </div>
      )}
      {!isLoading &&
        chats &&
        chats.map((chat, idx) => {
          return (
            <ChatListItem
              relationStatus={chat.relation?.status}
              isChatBlocked={chat.relation?.status === RelationStatus.Blocked}
              chatId={chat._id}
              selectedChat={params?.id || null}
              key={chat._id}
              chatName={chat.chatName}
              type={chat.type}
              chatImg={chat.chatImg || null}
              lastMessage={
                chat.lastMessage && {
                  from: {
                    userId: chat.lastMessage.author._id.toString(),
                    username: chat.lastMessage.author.username,
                  },
                  message: chat.lastMessage.text,
                  type: chat.lastMessage.type,
                  time: chat.lastMessage.createdAt,
                }
              }
            />
          );
        })}
    </div>
  );
};

export default ChatList;
