'use client';
import React, { useEffect, useRef } from 'react';
import s from './ChatMain.module.scss';
import { CSSProperties } from 'styled-components';
import avatar from '@/public/avatar.jpg';
import chatBG from '@/public/chatBG2.jpg';
import LoadingSvg from '@/public/circleTube.svg';
import ChatMessage from './ChatMessage/ChatMessage';
import MessageBlock from './MessageBlock/MessageBlock';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useParams } from 'next/navigation';
import ChatMessagesList from './ChatMessagesList/ChatMessagesList';
import { useAsync } from '@/hooks/useFetching';
import { findMessagesByChatIdAction } from '@/actions/message';
import Image from 'next/image';
import { ChatMessageT } from '@/types/messageT';

const ChatMain = () => {
  const isPlayerShown = useAppSelector((state) => state.playerReducer.showPlayer);
  const params: { id: string } | null = useParams();

  const fetchMessages = async () => {
    if (params?.id) {
      const res = await findMessagesByChatIdAction(params?.id);
      if (!res.ok) throw new Error(res.message);
      return res.data;
    } else {
      return null;
    }
  };
  const { execute, status, data, error, helpers } = useAsync(fetchMessages, [params?.id]);
  useEffect(() => {
    const getMessages = async () => {
      if (!data || status === 'pending') return;
      if (params?.id) {
        const res = await findMessagesByChatIdAction(params?.id);
        console.log(res)
        if (!res.ok) return;
        helpers.setData(res.data);
      }
    };
    const intervalId = setInterval(getMessages, 5000); // Каждые 5 сек
    return () => clearInterval(intervalId);
  }, [params?.id,data,status]);

  const backgroundImageStyle: CSSProperties = {
    paddingBottom: isPlayerShown ? '80px' : '0px',
  };

  return (
    <div className={s.chatMain} style={backgroundImageStyle}>
      <div className={s.chatMain_content}>
        {status === 'error' && (
          <div
            style={{ textAlign: 'center', paddingTop: '100px', color: '#fff', fontSize: '20px' }}>
            {error.message}
          </div>
        )}
        {status === 'pending' && (
          <div className={s.loadingChat}>
            <Image src={LoadingSvg} height={100} width={100} alt="loading..." />
          </div>
        )}
        {status === 'success' && data && (
          <ChatMessagesList
            messages={data}
            removeMessage={(messageId: string) =>
              helpers.setData((prev) => prev && prev.filter((message) => message._id !== messageId))
            }
          />
        )}
      </div>
      {status === 'success' && params?.id && (
        <MessageBlock
          isChatLoading={status !== 'success'}
          updateChat={async () => {
            execute();
            return;
          }}
          addNewMessage={(data: ChatMessageT) => helpers.setData((prev) => prev && [...prev, data])}
          chatId={params?.id}
        />
      )}
    </div>
  );
};

export default ChatMain;
