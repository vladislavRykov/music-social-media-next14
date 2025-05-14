'use client';
import { Event, GetEventDataT, Location } from '@/types/kudaGo';
import React, { useEffect, useRef, useState } from 'react';
import s from './EventList.module.scss';
import EventItem from './EventItem/EventItem';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { useAppSelector } from '@/hooks/reduxHooks';
import useScrollPagination from '@/hooks/useScrollPagination';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';
import EventItemLoader from '@/components/UI/Loaders/EventItemLoader';
import { useCssVariable } from '@/hooks/useCSSVariables';

type Props = {
  isOnlyFreeEvents: boolean;
};

const EventList = ({ isOnlyFreeEvents }: Props) => {
  const [eventData, setEventData] = useState<GetEventDataT | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const location = useAppSelector((state) => state.userReducer.location);
  const loadMoreItems = useRef(true); // индикатор окончания загрузки

  const getEvents = async (
    locationData: Location | null,
    isOnlyFree: boolean,
    nextPageUrl?: string | null,
  ) => {
    let page = null;
    let actual_since = null;
    if (nextPageUrl) {
      const searchParams = new URLSearchParams(nextPageUrl);
      page = searchParams.get('page');
      actual_since = searchParams.get('actual_since');
    }
    console.log(page, actual_since);
    if (!loadMoreItems.current) return;
    const date = new Date();
    if (!locationData?.slug) return;
    console.log(456);

    const res = await fetch(
      `http://localhost:3000/api/events?is_free=${isOnlyFree}&location=${
        locationData.slug
      }&actual_since=${actual_since || date.toISOString()}&page=${page || 1}`,
    );

    const data: GetEventDataT = await res.json();
    console.log(data);
    setEvents((prev) => [...prev, ...data.results]);
    setEventData(data);
    if (data.next === null) {
      loadMoreItems.current = false;
    }
    // return data
  };
  const [getEventWithLoading, isLoading] = useLoading(getEvents);
  // const [secondaryBgColor,mainBgColor] = useCssVariable(['--secondary-bg-color','--main-bg-color']);
  const refObserver = useScrollPagination({
    loadMoreCallback: () => getEventWithLoading(location, isOnlyFreeEvents, eventData?.next),
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [ eventData?.next],
    commonDeps: [location?.slug, isOnlyFreeEvents]

  });
  useEffect(() => {
    loadMoreItems.current = true;
    setEvents([]);
    setEventData(null);
    // console.log(location)
    //   if(location?.slug){
    //     console.log(12322)
    //      getEventWithLoading(location,isOnlyFreeEvents)
    //     // getEvents(location,isOnlyFreeEvents).then(()=>console.log(7777))

    // }
  }, [location?.slug, isOnlyFreeEvents]); // Перезагрузка при изменении slug или free-flag
  return (
    <div className={s.eventList_wrapper}>
      <div className={s.eventList_items}>
        {events?.map((event) => (
          <EventItem {...event} />
        ))}
        {isLoading &&
          Array(9)
            .fill(0)
            .map((_) => <EventItemLoader  />)}
      </div>
      {/* {isLoading && <div>
          <Image style={{display: 'block',margin: '0 auto'}} src={cicleTube} alt='loading...' height={60} width={60} /></div>} */}
      <div ref={refObserver}></div>
    </div>
  );
};

export default EventList;
