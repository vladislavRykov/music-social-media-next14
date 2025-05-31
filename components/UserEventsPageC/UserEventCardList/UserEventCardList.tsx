'use client'
import { EventAttendanceStatus, GroupedEventsT } from '@/types/eventAttendace'
import React from 'react'
import UserEventCard from '../UserEventCard/UserEventCard'
import s from './UserEventCardList.module.scss'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/hooks/reduxHooks'

const UserEventCardList = ({groupedEvents}:{groupedEvents: GroupedEventsT}) => {
    const params: { nickname: string } | null = useParams();
      const currentUserName =
        useAppSelector(state=>state.userReducer.user?.username);
      const isCurrentUserProfile = Boolean(
        currentUserName && params && params.nickname === currentUserName,
      );
      const allEventsCount = groupedEvents[EventAttendanceStatus.Going].length +  groupedEvents[EventAttendanceStatus.Interested].length+ groupedEvents[EventAttendanceStatus.Not_going].length
  return (
    <div className={s.userEventCardList}>
      {allEventsCount!==0 ?
      <>
      <UserEventCard title={'Интересно'} titleColor='blue' eventIds={groupedEvents[EventAttendanceStatus.Interested]}/>
      <UserEventCard title={'Пойду'} titleColor='green' eventIds={groupedEvents[EventAttendanceStatus.Going]}/>
      <UserEventCard title={'Не пойду'} titleColor='red' eventIds={groupedEvents[EventAttendanceStatus.Not_going]}/>
      </>
      :
      <div className={s.userEventCardList_empty}>
        {isCurrentUserProfile ?
        'Здесь отображаются выбранные вами события'
        :
        'Пользователь еще не добавлял событий'
      }
      </div>
    }
    </div>
  )
}

export default UserEventCardList