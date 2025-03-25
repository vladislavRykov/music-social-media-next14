import React from 'react';
import s from './Chat.module.scss';
import ChatSidebar from '@/components/ChatPageC/ChatSidebar/ChatSidebar';
import ChatMain from '@/components/ChatPageC/ChatMain/ChatMain';
import { findAllCurrentUserChatsAction } from '@/actions/chat';

const Chat = async() => {
  console.log('chat')
  const res =await findAllCurrentUserChatsAction()
  console.log(res)
  return <div className={s.chat}>
    <div className={s.flex}>

    <ChatSidebar chats={res.data}/>
    <ChatMain />
    </div>
  </div>;
};

export default Chat;
