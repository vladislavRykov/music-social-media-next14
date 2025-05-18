import React, { useState } from 'react';
import s from './ChatMessage.module.scss';
import defaultAvatar from '@/public/avatars/default.jpg';
import Link from 'next/link';
import Image from 'next/image';
import ChatPopup from '@/components/shared/Popups/ChatPopup/ChatPopup';
import BlockUserOption from '@/components/shared/Popups/ChatPopup/BlockUserOption/BlockUserOption';
import GoToProfile from '@/components/shared/Popups/ChatPopup/GoToProfile/GoToProfile';
import { useRouter } from 'nextjs-toploader/app';

type Props = {
  userId: string;
  username: string;
  avatar?: string;
  isCurrentUserMessage: boolean;
};

const ChatMessageAvatar = ({ userId, avatar, username, isCurrentUserMessage }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blockPosition, setBlockPosition] = useState({ x: '0', y: '0' });
  const router = useRouter();
  const onRightMouseClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    setBlockPosition({
      y: `${e.nativeEvent.offsetY}px`,
      x: `${e.nativeEvent.offsetX - 90}px`,
    });
    setIsPopupOpen(true);
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/user/${username}`);
      }}
      onContextMenu={onRightMouseClick}
      className={s.chatMessage_imageLink}>
      <Image
        className={s.chatMessage_image}
        src={avatar || defaultAvatar}
        alt="avatar"
        height={40}
        width={40}
      />
      {isPopupOpen && (
        <ChatPopup
          styles={{ top: blockPosition.y, left: blockPosition.x }}
          closePopup={() => setIsPopupOpen(false)}>
          {!isCurrentUserMessage && (
            <BlockUserOption userIdToBlock={userId} closePopup={() => setIsPopupOpen(false)} />
          )}
          <GoToProfile userName={username} closePopup={() => setIsPopupOpen(false)} />
        </ChatPopup>
      )}
    </div>
  );
};

export default ChatMessageAvatar;
