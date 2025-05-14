import { UserProfileData } from '@/types/types';
import React from 'react';
import s from './SearchUserItem.module.scss';
import Image from 'next/image';
import mockAvatar from '@/public/avatar2.webp';
import Link from 'next/link';
import { FaUserFriends } from 'react-icons/fa';
import { IoChatbubblesOutline } from 'react-icons/io5';
import cn from 'classnames';

interface SearchUserItemProps extends UserProfileData {}

const SearchUserItem = ({ _id, avatar, username }: SearchUserItemProps) => {
  return (
    <div className={s.searchUserItem}>
      <div className={s.searchUserItem_userInfo}>
        <Link href={`/user/${username}`}>
          <Image
            className={s.searchUserItem_image}
            src={avatar || mockAvatar}
            height={38}
            width={38}
            alt="avatar"
            placeholder="blur"
            blurDataURL="/loader1.gif"
          />
        </Link>
        <Link href={`/user/${username}`} className={s.searchUserItem_username}>
          <span>{username}</span>
        </Link>
      </div>
      <div className={s.searchUserItem_buttons}>
        <div title='Отправить запрос в друзья' className={cn(s.searchUserItem_btn, s.searchUserItem_addFriendBtn)}>
          <FaUserFriends color='#fff' size={18}/>
          {/* <p className={s.btnDescription}>Отправить запрос в друзья</p> */}
        </div>
        <div title='Написать сообщение' className={cn(s.searchUserItem_btn, s.searchUserItem_chatBtn)}>
          <IoChatbubblesOutline color='#fff' size={18}/>
          {/* <p className={s.btnDescription}>Написать сообщение</p> */}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SearchUserItem;
