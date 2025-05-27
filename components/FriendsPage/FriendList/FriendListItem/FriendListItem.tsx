import { UserProfileData } from '@/types/types';
import React from 'react';
import s from './FriendListItem.module.scss';
import Image from 'next/image';
import defaultAvatar from '@/public/avatars/default.jpg';
import defaultBanner from '@/public/bannerDefault.jpg';
import Link from 'next/link';

type Props = {
  friend: UserProfileData;
};

const FriendListItem = ({ friend }: Props) => {
  return (
    <div className={s.friendListItem}>
        <Image
          alt="banner"
          className={s.friendListItem_background}
          fill
          src={friend.banner || defaultBanner}
        />
        <div className={s.friendListItem_shadow}></div>
      <div className={s.friendListItem_content}>
        <Link href={`/user/${friend.username}`}>
          <Image
            className={s.friendListItem_img}
            height={40}
            width={40}
            alt="Avatar"
            src={friend.avatar || defaultAvatar}
          />
        </Link>
        <Link href={`/user/${friend.username}`}>
          <span className={s.friendListItem_nickname}>{friend.username}</span>
        </Link>
      </div>
        <div className={s.friendListItem_linkWrap}>
          <Link href={`/user/${friend.username}/library`} className={s.friendListItem_link}>
            Библиотека
          </Link>
          <Link href={`/user/${friend.username}/events`} className={s.friendListItem_link}>
            Мероприятия
          </Link>
          <Link href={`/user/${friend.username}/posts?sort=DESC`} className={s.friendListItem_link}>
            Посты
          </Link>
        </div>
    </div>
  );
};

export default FriendListItem;
