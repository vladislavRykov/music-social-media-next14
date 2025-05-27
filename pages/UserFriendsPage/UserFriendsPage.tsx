import { UserProfileData } from '@/types/types';
import s from './UserFriendsPage.module.scss'
import React from 'react';
import FriendList from '@/components/FriendsPage/FriendList/FriendList';

type Props = {
  friends: UserProfileData[] | null;
  isOk: boolean;
  message: string;
};

const UserFriendsPage = ({ friends, isOk, message }: Props) => {
  return <div className={s.userFriendsPage}>
    <FriendList friends={friends} isOk={isOk} message={message}/>
  </div>;
};

export default UserFriendsPage;
