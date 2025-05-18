'use client';
import React, { useState } from 'react';
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
import { useAppSelector } from '@/hooks/reduxHooks';

type Props = {
  chats:
    | {
        chatName: string;
        chatImg: string | undefined;
        _id: string;
        type: string;
        members: UserProfileData[];
        lastMessage: MessageWithAuthor | null;
        relation?: RelationMongooseT;
      }[]
    | null;
};

const ChatList = ({ chats }: Props) => {
  const currentUserId = useAppSelector((state) => state.userReducer.user?._id);
  const params: { slug?: string[] } | null = useParams();
  console.log('chatlist');

  // const {execute,status,data:responseData,error}=useAsync(fetchChats)

  return (
    <div className={s.chatList}>
      {/* {status ==='pending' && <Image src={LoadingSvg} alt='loading...' height={100} width={100}/>} */}
      {/* {status ==='success' && responseData?.data && responseData.data.map((chat,idx)=><ChatListItem chatId={chat._id} selectedChat={params?.slug?.[0]||null} key={idx} chatName={chat.chatName} type={chat.type} chatImg={chat.chatImg||null} lastMessage={chat.lastMessage &&  {from: {userId: chat.lastMessage.author._id.toString(),username: chat.lastMessage.author.username},message: chat.lastMessage.text, type: chat.lastMessage.type,    time: chat.lastMessage.createdAt}}/>)} */}
      {chats &&
        chats.map((chat, idx) => {
          // if (
          //   chat.relation?.status === RelationStatus.Blocked &&
          //   currentUserId === chat.relation.userA
          // )
          //   return;
          return (
            <ChatListItem
              relationStatus={chat.relation?.status}
              isChatBlocked={chat.relation?.status === RelationStatus.Blocked}
              chatId={chat._id}
              selectedChat={params?.slug?.[0] || null}
              key={idx}
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
