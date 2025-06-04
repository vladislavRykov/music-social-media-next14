import React from 'react';
import s from './ChatLayout.module.scss';
import ChatSidebar from './ChatSidebar/ChatSidebar';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={s.chat}>
      <div className={s.flex}>
        <ChatSidebar />
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
