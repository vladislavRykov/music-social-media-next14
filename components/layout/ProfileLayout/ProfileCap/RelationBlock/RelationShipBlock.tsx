import { createDialogAction } from '@/actions/chat';
import { sendFriendRequest } from '@/actions/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { boolean } from 'yup';
import { IoIosArrowDown } from 'react-icons/io';
import s from './RelationShipBlock.module.scss';
import { useRouter } from 'nextjs-toploader/app';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';
import HiddenBtns from './HiddenBtns/HiddenBtns';
import { useAsync } from '@/hooks/useFetching';
import { getUsersRelation } from '@/dal/relation';

type ProfileButtonsProps = {
  currentUserId: string;
  profileUserId: string;
};

const RelationShipBlock = ({ profileUserId, currentUserId }: ProfileButtonsProps) => {
  const router = useRouter();
  const [isHiddenBtnOpen, setIsHiddenBtnOpen] = useState(false);

  const getProfileRelation = async () => {
    const usersRelationship = await getUsersRelation({ currentUserId, otherUserId: profileUserId });
    console.log(usersRelationship);
    return usersRelationship;
    // if (
    //   usersRelationship &&
    //   usersRelationship.status === RelationStatus.Blocked &&
    //   usersRelationship.userB === currentUserId
    // ) {
    //   router.back();
    //   return;
    // }
  };
  const { status, data: userRelation, error } = useAsync(getProfileRelation);
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
      {!userRelation && (
        <div className={s.profileButtons_btns}>
          <button onClick={onChatBtnClick} className={s.profileButtons_chat}>
            Написать
          </button>
          <button onClick={onSendFriendRequstBtnClick} className={s.profileButtons_addFriend}>
            Добавить в друзья
          </button>
        </div>
      )}
      {userRelation?.status === RelationStatus.Blocked && (
        <div className={s.profileButtons_status + ' ' + s.profileButtons_blocked}>Заблокирован</div>
      )}
      {userRelation?.status === RelationStatus.Friends && (
        <div className={s.profileButtons_status + ' ' + s.profileButtons_friend}>В друзьях</div>
      )}
      <div className={s.profileButtons_hiddenBtns}>
        <IoIosArrowDown
          onClick={() => setIsHiddenBtnOpen(true)}
          className={s.profileButtons_arrow}
          size={18}
        />
        {isHiddenBtnOpen && (
          <HiddenBtns userRelation={userRelation} closePopup={() => setIsHiddenBtnOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default RelationShipBlock;
