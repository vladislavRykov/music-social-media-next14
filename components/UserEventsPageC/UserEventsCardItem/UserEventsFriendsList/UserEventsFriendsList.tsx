'use client';
import React from 'react';
import s from './UserEventsFriendsList.module.scss';
import Image from 'next/image';
import mockAva from '@/public/avatars/default.jpg';
import { getFriendsEAByEventId } from '@/actions/eventAttendance';
import { useAsync } from '@/hooks/useFetching';
import circleLoading from '@/public/circleTube.svg';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { getSelectedColor } from '@/helpers/eventAttendanceHelpers';

const UserEventsFriendsList = ({ eventId }: { eventId: string }) => {
  const getFriendsData = async () => {
    const res = await getFriendsEAByEventId(eventId);
    if (!res.ok) throw new Error(res.message);
    return res.data;
  };
  const { status, data } = useAsync(getFriendsData);
  console.log(data);
  return (
    <div className={s.userEventsFriendsList}>
      {status === 'pending' && <Image src={circleLoading} height={35} width={35} alt="loading" />}
      {status === 'success' &&
        data &&
        data.map((item) => (
          <Link
            href={`/user/${item.user.username}/events`}
            key={item._id}
            className={s.userEventsFriendsList_item}>
              <Image

                title={item.user.username}
                height={35}
                width={35}
                className={s.userEventsFriendsList_img}
                style={{borderColor: getSelectedColor(item.status)}}
                src={item.user.avatar || mockAva}
                alt="avatar"
              />
          </Link>
        ))}
    </div>
  );
};

export default UserEventsFriendsList;
