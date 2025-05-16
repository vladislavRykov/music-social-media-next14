'use client';
import { FriendRequestMongoosePopulatedT } from '@/types/relationT';
import React, { useState } from 'react';
import s from './FriendsRequestList.module.scss';
import FriendRequestItem from './FriendRequestItem/FriendRequestItem';

type Props = {
  friendsRequests: FriendRequestMongoosePopulatedT[] | null;
  responseInfo: { ok: boolean; message: string };
};

const FriendsRequestList = ({ friendsRequests, responseInfo }: Props) => {
  const [friendsRequestsState, setFriendsRequestsState] = useState(friendsRequests);
  const filterReqById = (reqId: string) => {
    setFriendsRequestsState((prev) => prev && prev.filter((req) => req._id !== reqId));
  };
  if (!responseInfo.ok && !friendsRequests) {
    return <div className={s.errorBody}>{responseInfo.message}</div>;
  }
  return (
    <div className={s.list}>
      {friendsRequestsState?.length ===0 && <div className={s.emptyReq}>Нет новых запросов</div>}
      {friendsRequestsState &&
        friendsRequestsState.map(
          (request) =>
            request?.from?._id && (
              <FriendRequestItem
                filterReqById={filterReqById}
                key={request.from._id}
                {...request}
              />
            ),
        )}
    </div>
  );
};

export default FriendsRequestList;
