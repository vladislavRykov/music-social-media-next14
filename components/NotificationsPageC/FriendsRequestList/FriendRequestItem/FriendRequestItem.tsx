import { FriendRequestMongoosePopulatedT } from '@/types/relationT';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import mockAvatar from '@/public/avatar2.webp';
import s from './FriendRequestItem.module.scss';
import { IoIosCheckmark } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';
import cn from 'classnames';

interface Props extends FriendRequestMongoosePopulatedT {}

const FriendRequestItem = ({ status, from: potentialFriend, createdAt }: Props) => {
  return (
    <div className={s.friendRequestItem}>
      <div className={s.friendRequestItem_info}>
        <Link href={`/user/${potentialFriend.username}`}>
          <Image
            className={s.friendRequestItem_img}
            height={38}
            width={38}
            alt="avatar"
            src={potentialFriend.avatar || mockAvatar}
            blurDataURL="/loader1.gif"
            placeholder="blur"
          />
        </Link>
        <Link href={`/user/${potentialFriend.username}`}>
          <span className={s.friendRequestItem_username}>{potentialFriend.username}</span>
        </Link>
      </div>
      <div className={s.friendRequestItem_btns}>
        <button className={cn(s.friendRequestItem_button, s.friendRequestItem_accept)}>
          <IoIosCheckmark size={30} className={s.friendRequestItem_btnIcon} />
          <span>Принять</span>
        </button>
        <button className={cn(s.friendRequestItem_button, s.friendRequestItem_reject)}>
          <IoIosClose size={30} className={s.friendRequestItem_btnIcon} />

          <span>Отклонить</span>
        </button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
