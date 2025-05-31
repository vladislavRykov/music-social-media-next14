'use client';
import {
  Event,
  EventWithATStatus,
  GetEventDataT,
  GetEventDataTWithAT,
  Location,
} from '@/types/kudaGo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './EventList.module.scss';
import EventItem from './EventItem/EventItem';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { useAppSelector } from '@/hooks/reduxHooks';
import useScrollPagination from '@/hooks/useScrollPagination';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';
import EventItemLoader from '@/components/UI/Loaders/EventItemLoader';
import { getEventsAByArrayIdsA } from '@/actions/events';

type Props = {
  isOnlyFreeEvents: boolean;
};

const EventList = ({ isOnlyFreeEvents }: Props) => {
  const [eventData, setEventData] = useState<GetEventDataT | null>(null);
  const [events, setEvents] = useState<EventWithATStatus[]>([]);
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
    if (!loadMoreItems.current) return;
    const date = new Date();
    if (!locationData?.slug) return;
   

    const res = await fetch(
      `http://localhost:3000/api/events?is_free=${isOnlyFree}&location=${
        locationData.slug
      }&actual_since=${actual_since || date.toISOString()}&page=${page || 1}&page_size=${20}`
    );

    const data: GetEventDataT = await res.json();
    const eventsIds = data.results.map((event) => event.id.toString());
    const eventsAT = await getEventsAByArrayIdsA(eventsIds);
    const eventsWithATStatus: EventWithATStatus[] = data.results.map((eventItem) => {
      const eventById =
        eventsAT.data &&
        eventsAT.data.find((eventAT) => eventAT.eventId.toString() === eventItem.id.toString());
      return {
        ...eventItem,
        currentUserATStatus: eventById ? eventById.status : null,
      };
    });
    // .filter((music) => !!music); // Удаляем undefined (если какие-то ID не найдены)
    // console.log(eventsWithATStatus);
    setEvents((prev) => [...prev, ...eventsWithATStatus]);
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
      setEvents([]);
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
            .map((_) => <EventItemLoader style={{ flexGrow: 1 }} />)}
      </div>
      {/* {isLoading && <div>
          <Image style={{display: 'block',margin: '0 auto'}} src={cicleTube} alt='loading...' height={60} width={60} /></div>} */}
      <div ref={refObserver}></div>
    </div>
  );
};

export default EventList;
