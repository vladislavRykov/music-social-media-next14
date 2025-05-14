import { FriendRequestMongoosePopulatedT } from '@/types/relationT';
import React from 'react';
import s from './FriendsRequestList.module.scss';
import FriendRequestItem from './FriendRequestItem/FriendRequestItem';

type Props = {
  friendsRequests: FriendRequestMongoosePopulatedT[] | null;
  responseInfo: { ok: boolean; message: string };
};

const FriendsRequestList = ({ friendsRequests, responseInfo }: Props) => {
  if (!responseInfo.ok && !friendsRequests) {
    return <div className={s.errorBody}>{responseInfo.message}</div>;
  }
  return (
    <div className={s.list}>
      {friendsRequests && friendsRequests.map(request=>  <FriendRequestItem key={request.from._id} {...request} />)}
    </div>
  );
};

export default FriendsRequestList;
