'use client';
import React, { useState } from 'react';
import s from './UserEventCard.module.scss';
import { useAsync } from '@/hooks/useFetching';
import { GetEventDataT } from '@/types/kudaGo';
import UserEventsCardItem from '../UserEventsCardItem/UserEventsCardItem';
import circleLoader from '@/public/circleTube.svg';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/hooks/reduxHooks';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

type Pros = {
  title: string;
  eventIds: string[];
  titleColor?: string;
};

const UserEventCard = ({ title, eventIds, titleColor }: Pros) => {
  const params: { nickname: string } | null = useParams();
  const currentUserNickname = useAppSelector((state) => state.userReducer.user?.username);
  const isCurrentUserProfile = Boolean(
    params && currentUserNickname && params.nickname === currentUserNickname,
  );
  const [isEventsShown, setIsEventsShown] = useState(true);
  const getEventsDataByIds = async () => {
    const eventIdsString = eventIds.join(',');
    const res = await fetch(`http://localhost:3000/api/events?ids=${eventIdsString}`);

    const data: GetEventDataT = await res.json();
    return data.results;
  };

  const { status, data, error, execute, helpers } = useAsync(getEventsDataByIds);
  if (eventIds.length === 0) {
    return <></>;
  }
  return (
    <div className={s.userEventCard}>
      <div onClick={() => setIsEventsShown((prev) => !prev)} className={s.userEventCard_header}>
        {/* <div className={s.userEventCard_dot} style={{backgroundColor: titleColor}}></div> */}
        {isEventsShown ? (
          <GoTriangleDown color={titleColor} className={s.userEventCard_arrow} />
        ) : (
          <GoTriangleUp color={titleColor} className={s.userEventCard_arrow} />
        )}
        <h2 className={s.userEventCard_title}>{title}</h2>
        <div className={s.userEventCard_line} style={{ backgroundColor: titleColor }}></div>
      </div>
      {isEventsShown && (
        <div className={s.userEventCard_content}>
          {status === 'success' &&
            data &&
            data?.map((event) => (
              <UserEventsCardItem
                isCurrentUserProfile={isCurrentUserProfile}
                removeEventFromState={(eventId: number) =>
                  helpers.setData((prev) => prev && prev.filter((event) => event.id !== eventId))
                }
                event={event}
              />
            ))}
          {status === 'pending' && (
            <div style={{paddingLeft: 10}}>
              <Image  src={circleLoader} alt="loading" height={50} width={50} />
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserEventCard;
