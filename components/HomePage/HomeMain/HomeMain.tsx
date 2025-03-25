'use client'
import React, { useEffect, useState } from 'react';
import s from './HomeMain.module.scss';
import KudaGo from '@/services/api/kudagoApi';
import { Event } from '@/types/kudaGo';
import EventList from './EventList/EventList';
import EventFilters from './EventFilters/EventFilters';

type Props = {
  mainContentRef: React.MutableRefObject<HTMLDivElement | null>;
};

const HomeMain = ({ mainContentRef }: Props) => {

  const [isOnlyFreeEvents,setIsOnlyFreeEvents] = useState<boolean>(false)
  return (
    <div className={s.homeMain} ref={mainContentRef}>
      <EventFilters isOnlyFreeEvents={isOnlyFreeEvents} setIsOnlyFreeEvents={setIsOnlyFreeEvents}/>
      <EventList isOnlyFreeEvents={isOnlyFreeEvents}/>
    </div>
  );
};

export default HomeMain;
