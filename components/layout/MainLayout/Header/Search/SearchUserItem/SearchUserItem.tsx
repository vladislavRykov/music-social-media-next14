import { UserProfileData } from '@/types/types';
import React from 'react';
import s from './SearchUserItem.module.scss';
import Image from 'next/image';
import mockAvatar from '@/public/avatar2.webp';
import Link from 'next/link';
import { FaUserFriends } from 'react-icons/fa';
import { IoChatbubblesOutline } from 'react-icons/io5';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createDialogAction } from '@/actions/chat';
import { useLoading } from '@/hooks/useFetching';
import circleTube from '@/public/circleTube.svg';
import { FaBullseye } from 'react-icons/fa6';
import { sendFriendRequest } from '@/actions/user';

interface SearchUserItemProps extends UserProfileData {}

const SearchUserItem = ({ _id, avatar, username }: SearchUserItemProps) => {
  const router = useRouter();
  const onChatBtnClick = async () => {
    const res = await createDialogAction(_id);
    if (!res.ok && res.data) {
      router.push(`/chat/${res.data?._id}`);

      return;
    }
    if (!res.ok) return toast.error(res.message);
  };
  const onSendFriendRequstBtnClick = async () => {
    toast.info('Запрос отправляется. Пожайлуста, подождите.');
    const res = await sendFriendRequest(_id);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
  };

  const [onChatBtnClickLoading, isLoading] = useLoading(onChatBtnClick, false);
  const [onSendFRCLoading, isLoadingFR] = useLoading(onSendFriendRequstBtnClick, false);
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
        <button
          onClick={onSendFRCLoading}
          title="Отправить запрос в друзья"
          className={cn(s.searchUserItem_btn, s.searchUserItem_addFriendBtn)}>
          {!isLoadingFR ? (
            <FaUserFriends color="#fff" size={18} />
          ) : (
            <Image
              className={s.searchUserItem_btnLoading}
              height={18}
              width={18}
              src={circleTube}
              alt="loading"
            />
          )}
          {/* <p className={s.btnDescription}>Отправить запрос в друзья</p> */}
        </button>
        <button
          onClick={onChatBtnClickLoading}
          title="Написать сообщение"
          className={cn(s.searchUserItem_btn, s.searchUserItem_chatBtn)}>
          {!isLoading ? (
            <IoChatbubblesOutline color="#fff" size={18} />
          ) : (
            <Image
              className={s.searchUserItem_btnLoading}
              height={18}
              width={18}
              src={circleTube}
              alt="loading"
            />
          )}
          {/* <p className={s.btnDescription}>Написать сообщение</p> */}
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default SearchUserItem;
