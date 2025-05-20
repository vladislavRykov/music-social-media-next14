import React from 'react';
import s from './HiddenBtns.module.scss';
import PopupWrapper from '@/components/shared/Popups/PopupWrapper';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';
import RelationHiddenItem from './RelationHiddenItem';
import { blockUser, deleteFriend, unblockUser } from '@/actions/relations';
import { toast } from 'react-toastify';
import { Preahvihear } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { sendFriendRequest } from '@/actions/user';

type Props = {
  userRelation: RelationMongooseT | null;
  closePopup: () => void;
  profileUserId: string;
  setUserRelation: React.Dispatch<React.SetStateAction<RelationMongooseT | null>>;
  reloadRelation: () => void;
};

const HiddenBtns = ({
  closePopup,
  userRelation,
  profileUserId,
  setUserRelation,
  reloadRelation,
}: Props) => {
  const router = useRouter();
  const unBlockUserHandler = async () => {
    setUserRelation(null);
    const res = await unblockUser(profileUserId);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
    closePopup();
  };
  const blockUserHandler = async () => {
    const res = await blockUser(profileUserId);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
    reloadRelation();
  };
  const sendFriendRequestHandler = async () => {
    toast.info('Запрос отправляется. Пожайлуста, подождите.');
    const res = await sendFriendRequest(profileUserId);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
  };
  const deleteFriendHandler = async () => {
    const res = await deleteFriend(profileUserId);
    if (!res.ok) return toast.error(res.message);
    toast.success(res.message);
    reloadRelation();
  };
  return (
    <PopupWrapper closePopup={closePopup} className={s.wrapper}>
      <ul className={s.hiddenBtns}>
        {userRelation?.status !== RelationStatus.Blocked && (
          <RelationHiddenItem action={blockUserHandler} title="Заблокировать" />
        )}
        {userRelation?.status === RelationStatus.Blocked && (
          <RelationHiddenItem action={unBlockUserHandler} title="Разблокировать" />
        )}
        {userRelation?.status === RelationStatus.Friends && (
          <RelationHiddenItem action={deleteFriendHandler} title="Удалить из друзей" />
        )}
        {!userRelation && (
          <RelationHiddenItem action={sendFriendRequestHandler} title="Добавить в друзья" />
        )}
      </ul>
    </PopupWrapper>
  );
};

export default HiddenBtns;
