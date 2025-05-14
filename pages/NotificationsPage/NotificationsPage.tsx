import { FriendRequestMongoosePopulatedT } from '@/types/relationT';
import React from 'react';
import s from './NotificationsPage.module.scss';
import NotificationsHeader from '@/components/NotificationsPageC/NotificationsHeader/NotificationsHeader';
import FriendsRequestList from '@/components/NotificationsPageC/FriendsRequestList/FriendsRequestList';

type Props = {
  friendsRequests: FriendRequestMongoosePopulatedT[] | null;
  responseInfo: { ok: boolean; message: string };
};

const NotificationsPage = ({ friendsRequests, responseInfo }: Props) => {
  return (
    <div className={s.notificationsPage}>
      <div className={s.notificationsPage_wrapper}>
        <NotificationsHeader title="Запросы в друзья" defaultExpandStatus={true}>
          <FriendsRequestList friendsRequests={friendsRequests} responseInfo={responseInfo} />
        </NotificationsHeader>
        <NotificationsHeader title="Системные уведомления">
          <div style={{ height: '100vh' }}>123123</div>
        </NotificationsHeader>
      </div>
    </div>
  );
};

export default NotificationsPage;
