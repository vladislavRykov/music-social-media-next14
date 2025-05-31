'use client';
import { Event } from '@/types/kudaGo';
import Image from 'next/image';
import React, { useState } from 'react';
import s from './UserEventsCardItem.module.scss';
import { FaRubleSign } from 'react-icons/fa';
import UserEventItemOptions from './UserEventItemOptions/UserEventItemOptions';
import { deleteCurrentUserEventAttendanceA } from '@/actions/eventAttendance';
import { toast } from 'react-toastify';
import UserEventsFriendsList from './UserEventsFriendsList/UserEventsFriendsList';

type Props = {
  event: Event;
  removeEventFromState: (eventId: number) => void;
  isCurrentUserProfile: boolean;
};

const UserEventsCardItem = ({ event, removeEventFromState, isCurrentUserProfile }: Props) => {
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className={s.userEventsCardItem}>
      <div className={s.userEventsCardItem_imageWrapper}>
        <a target="_blank" href={event.site_url} rel="noopener noreferrer">
          <Image
            className={s.userEventsCardItem_image}
            src={event.images[0].image}
            alt="img"
            fill
          />
        </a>
        {isCurrentUserProfile && (
          <div className={s.userEventsCardItem_options}>
            <UserEventItemOptions
              showFriends={showFriends}
              toggleShowFriends={() => setShowFriends((prev) => !prev)}
              eventId={event.id}
              removeEventFromState={removeEventFromState}
            />
          </div>
        )}
      {showFriends && isCurrentUserProfile && <UserEventsFriendsList eventId={event.id.toString()}/>}
      </div>
      <div className={s.userEventsCardItem_info}>
        <h2 className={s.userEventsCardItem_title}>
          <a target="_blank" href={event.site_url} rel="noopener noreferrer">
            <h2>{event.title}</h2>
          </a>
        </h2>
        <p
          className={s.userEventsCardItem_desc}
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
        {event.price && (
          <div className={s.userEventsCardItem_price}>
            <FaRubleSign className={s.userEventsCardItem_price_sign} size={22} />
            <span>{event.price}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEventsCardItem;
