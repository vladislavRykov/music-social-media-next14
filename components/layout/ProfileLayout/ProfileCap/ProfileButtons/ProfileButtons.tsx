import { createDialogAction } from '@/actions/chat';
import { sendFriendRequest } from '@/actions/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { boolean } from 'yup';
import { IoIosArrowDown } from 'react-icons/io';
import s from './ProfileButtons.module.scss';
import HiddenBtns from './HiddenBtns/HiddenBtns';
import { useRouter } from 'nextjs-toploader/app';

type ProfileButtonsProps = {
  isCurrentUserProfile: boolean;
  profileUserId: string;
};

const ProfileButtons = ({ profileUserId, isCurrentUserProfile }: ProfileButtonsProps) => {
  const router = useRouter();
  const [isHiddenBtnOpen, setIsHiddenBtnOpen] = useState(false);

  const onChatBtnClick = async () => {
    const res = await createDialogAction(profileUserId);
    if (!res.ok && res.data) {
      router.push(`/chat/${res.data?._id}`);

      return;
    }
    if (!res.ok) return toast.error(res.message);
  };
  const onSendFriendRequstBtnClick = async () => {
    toast.info('Запрос отправляется. Пожайлуста, подождите.');
    const res = await sendFriendRequest(profileUserId);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
  };
  return (
    <div className={s.profileButtons}>
      <div className={s.profileButtons_btns}>
        <button onClick={onChatBtnClick} className={s.profileButtons_chat}>Написать</button>
        <button onClick={onSendFriendRequstBtnClick} className={s.profileButtons_addFriend}>Добавить в друзья</button>
      </div>
      <div className={s.profileButtons_hiddenBtns}>
        <IoIosArrowDown
          onClick={() => setIsHiddenBtnOpen(true)}
          className={s.profileButtons_arrow}
          size={18}
        />
        {isHiddenBtnOpen && <HiddenBtns closePopup={() => setIsHiddenBtnOpen(false)} />}
      </div>
    </div>
  );
};

export default ProfileButtons;
