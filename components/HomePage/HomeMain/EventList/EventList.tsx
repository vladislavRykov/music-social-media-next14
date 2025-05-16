'use client';
import { Event, GetEventDataT, Location } from '@/types/kudaGo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  // const getEvents = async () =>
  //   // locationData: Location | null,
  //   // isOnlyFree: boolean,
  //   // nextPageUrl?: string | null,
  //   {
  //     console.log(eventData?.next);
  //     let page = null;
  //     let actual_since = null;
  //     if (eventData?.next) {
  //       const searchParams = new URLSearchParams(eventData?.next);
  //       page = searchParams.get('page');
  //       actual_since = searchParams.get('actual_since');
  //     }
  //     console.log(page, actual_since);
  //     if (!loadMoreItems.current) return;
  //     const date = new Date();
  //     if (!location?.slug) return;
  //     console.log(456);
  //     console.log(
  //       `http://localhost:3000/api/events?is_free=${isOnlyFreeEvents}&location=${
  //         location.slug
  //       }&actual_since=${actual_since || date.toISOString()}&page=${page || 1}`,
  //     );

  //     const res = await fetch(
  //       `http://localhost:3000/api/events?is_free=${isOnlyFreeEvents}&location=${
  //         location.slug
  //       }&actual_since=${actual_since || date.toISOString()}&page=${page || 1}`,
  //     );

  //     const data: GetEventDataT = await res.json();
  //     console.log(data);
  //     setEvents((prev) => [...prev, ...data.results]);
  //     setEventData(data);
  //     if (data.next === null) {
  //       loadMoreItems.current = false;
  //     }
  //   };

  const getEvents = async (
    locationData: Location | null,
    isOnlyFree: boolean,
    nextPageUrl?: string | null,
  ) => {
    console.log(nextPageUrl);
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
    console.log(
      `http://localhost:3000/api/events?is_free=${isOnlyFree}&location=${
        locationData.slug
      }&actual_since=${actual_since || date.toISOString()}&page=${page || 1}`,
    );

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
  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setEventData(null);
      setEvents([])
      console.log( eventData?.next)
      await getEventWithLoading(location, isOnlyFreeEvents);
    };
    firstLoad();
  }, [location?.slug, isOnlyFreeEvents]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () => getEventWithLoading(location, isOnlyFreeEvents, eventData?.next),
    // loadMoreCallback: getEventWithLoading,
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [eventData?.next, location?.slug, isOnlyFreeEvents],
    // commonDeps: [location?.slug, isOnlyFreeEvents],
  });
  return (
    <div className={s.eventList_wrapper}>
      <div className={s.eventList_items}>
        {events?.map((event) => (
          <EventItem key={event.id} {...event} />
        ))}
        {isLoading &&
          Array(9)
            .fill(0)
            .map((_) => <EventItemLoader />)}
      </div>
      {/* {isLoading && <div>
          <Image style={{display: 'block',margin: '0 auto'}} src={cicleTube} alt='loading...' height={60} width={60} /></div>} */}
      <div ref={refObserver}></div>
    </div>
  );
};

export default EventList;
