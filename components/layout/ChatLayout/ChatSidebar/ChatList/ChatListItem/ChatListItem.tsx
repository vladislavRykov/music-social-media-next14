'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import s from './ChatListItem.module.scss';
import CircleDefault from '@/components/UI/Circle/CircleDefault';
import defaultChatImg from '@/public/avatars/default.jpg';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { useAppSelector } from '@/hooks/reduxHooks';
import { MessageTypes } from '@/types/messageT';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import GoToProfile from '@/components/shared/Popups/ChatPopup/GoToProfile/GoToProfile';
import { RelationStatus } from '@/types/relationT';
const ChatPopup = dynamic(() => import('@/components/shared/Popups/ChatPopup/ChatPopup'));
import { FaUserFriends } from 'react-icons/fa';
import { ImBlocked } from 'react-icons/im';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {ru} from 'date-fns/locale';
import { format } from 'date-fns';

type Props = {
  lastMessage: {
    from: { userId: string; username: string };
    type: string;
    message?: string;
    time: string;
  } | null;
  type: string; //'group-chat' 'dialog'
  chatName: string; // либо берем поле chatName либо ник автора диалога (если тип group-chat)
  chatImg: StaticImageData | string | null; // аналогично chatName
  chatId: string;
  selectedChat: string | null;
  isChatBlocked: boolean;
  relationStatus?: RelationStatus;
};

const ChatListItem = ({
  lastMessage,
  type,
  chatName,
  chatImg,
  chatId,
  selectedChat,
  isChatBlocked,
  relationStatus,
}: Props) => {
  const currentUserId = useAppSelector((state) => state.userReducer.user?._id);
  const [circles, setCircles] = useState<{ x: number; y: number; id: number }[]>([]); // Массив объектов с координатами кругов

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blockPosition, setBlockPosition] = useState({ x: '0', y: '0' });
const formatLastMessageTime = (date:Date) => {
  const now = new Date();

  // Если сообщение отправлено сегодня
  if (format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
    return format(date, 'HH:mm', { locale: ru });
  }

  // Иначе используем относительное представление времени
  return formatDistanceToNow(date, { addSuffix: true, locale: ru });
};
  const onRightMouseClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setBlockPosition({
      y: `${e.clientY}px`,
      x: `${e.clientX}px`,
    });
    setIsPopupOpen(true);
  };
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!containerRef?.current?.contains(e.target)) return;
    e.target;
    // Получаем координаты клика относительно контейнера
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Добавляем новый круг в массив
    setCircles((prevCircles) => [...prevCircles, { x, y, id: Date.now() }]); // используем timestamp как уникальный ключ
    // router.replace(`/chat/${chatId}`)
    // setSelectedChat(chatId)
    // window.history.pushState(window.history.state, "", `/chat/${chatId}`);
  };

  useEffect(() => {
    const timeoutIds: any = [];

    circles.forEach(({ id }) => {
      timeoutIds.push(
        setTimeout(() => {
          // Удаляем круг с соответствующим id через 500 мс
          setCircles((prevCircles) => prevCircles.filter((circle) => circle.id !== id));
        }, 500),
      );
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [circles]);
  // const formattedTime = lastMessage?.time.toTimeString().slice(0, 5);
  const isLastMessageFromCurrentUser = currentUserId === lastMessage?.from.userId;
  return (
    <div onContextMenu={onRightMouseClick} style={{ position: 'relative' }}>
      <Link
        href={`/chat/${chatId}`}
        replace
        onClick={handleClick}
        ref={containerRef}
        className={cn(s.chatListItem, { [s.chatListItem_selected]: selectedChat === chatId })}>
        <Image
          className={s.chatListItem_img}
          src={chatImg || defaultChatImg}
          alt="chat img"
          height={50}
          width={50}
        />
        <div className={s.chatListItem_rightBlock}>
          <div className={s.chatListItem_nameAndTime}>
            <div className={s.chatListItem_nameAndStatus}>
              <h2
                className={cn(s.chatListItem_chatname)}
                // style={selectedChat === chatId ? { color: '#fafafa' } : {}}
              >
                {chatName}
              </h2>
              {relationStatus && relationStatus === RelationStatus.Blocked && (
                <div className={s.chatListItem_blockedStatus}>-{relationStatus}-</div>
              )}
            </div>
            <span className={s.chatListItem_time}>{lastMessage && formatLastMessageTime(new Date(lastMessage.time))}</span>
            {/* <span className={s.chatListItem_time}>{formattedTime || ''}</span> */}
          </div>
          {lastMessage && (
            <div className={s.chatListItem_lastMessageAndUnread}>
              <span className={s.chatListItem_lastMessage}>
                {isLastMessageFromCurrentUser ? 'Вы' : lastMessage.from.username}:{' '}
                {lastMessage.type === MessageTypes.Text
                  ? lastMessage.message
                  : '-Голосовое сообщение-'}
              </span>
              {/* <span  className={s.chatListItem_unRead}>60</span> */}
            </div>
          )}
        </div>
        {circles.map((circle) => (
          <CircleDefault {...circle} color={'#40436344'} key={circle.id} />
        ))}
      </Link>
      {isPopupOpen && (
        <ChatPopup
          styles={{ top: blockPosition.y, left: blockPosition.x, position: 'fixed' }}
          closePopup={() => setIsPopupOpen(false)}>
          {/* <DeleteMessage messageId={_id} closePopup={()=>{
            removeMessage(_id)
            setIsPopupOpen(false)
          }
          }/> */}
          <GoToProfile userName={chatName} closePopup={() => setIsPopupOpen(false)} />
        </ChatPopup>
      )}
      {relationStatus && relationStatus === RelationStatus.Friends && (
        <div className={s.chatListItem_relationStatusPin}>
          <FaUserFriends className={s.chatListItem_friendIcon} size={14} />
        </div>
      )}
      {relationStatus && relationStatus === RelationStatus.Blocked && (
        <div className={s.chatListItem_relationStatusPin}>
          <ImBlocked className={s.chatListItem_blockedIcon} size={14} />
        </div>
      )}
    </div>
  );
};

export default ChatListItem;
