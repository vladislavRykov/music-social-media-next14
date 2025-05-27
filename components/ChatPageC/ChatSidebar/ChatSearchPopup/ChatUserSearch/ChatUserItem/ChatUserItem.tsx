'use client';
import Image from 'next/image';
import React from 'react';
import defaultAvatar from '@/public/avatars/default.jpg';
import defaultBanner from '@/public/bannerDefault.jpg';
import s from './ChatUserItem.module.scss';
import { createDialogAction } from '@/actions/chat';
import { toast } from 'react-toastify';
import { useRouter } from 'nextjs-toploader/app';
import { UserProfileData } from '@/types/types';
import Link from 'next/link';

interface Props extends UserProfileData {
  closePopup: () => void;
}

const ChatUserItem = ({ avatar, _id, username, closePopup, banner }: Props) => {
  const router = useRouter();
  const onUserClick = async () => {
    const res = await createDialogAction(_id);
    if (!res.ok && res.data) {
      router.push(`/chat/${res.data?._id}`);
    } else if (!res.ok) {
      toast.error(res.message);
    }
    router.push(`/chat/${res.data?._id}`);
    closePopup();
  };

  return (
    <div className={s.chatUserItem}>
      <Image
        alt="banner"
        className={s.chatUserItem_background}
        fill
        src={banner || defaultBanner}
      />
      <div className={s.chatUserItem_shadow}></div>
      <div className={s.chatUserItem_content}>
        <Link href={`/user/${username}`}>
          <Image
            className={s.chatUserItem_ava}
            src={avatar || defaultAvatar}
            alt="avatar"
            height={40}
            width={40}
          />
        </Link>
        <Link href={`/user/${username}`}>
          <div className={s.chatUserItem_username}>{username}</div>
        </Link>
        <button className={s.chatUserItem_dialogBtn} onClick={onUserClick}>
          Написать сообщение
        </button>
      </div>
    </div>
  );
};

export default ChatUserItem;
