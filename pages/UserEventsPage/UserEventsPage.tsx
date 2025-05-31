import React from 'react'
import s from './UserEventsPage.module.scss'
import { GroupedEventsT } from '@/types/eventAttendace'
import UserEventCardList from '@/components/UserEventsPageC/UserEventCardList/UserEventCardList'

const UserEventsPage = ({groupedEvents}:{groupedEvents: GroupedEventsT}) => {
  return (
    <div className={s.userEventsPage}>
        <div className={s.userEventsPage_content}>
            <UserEventCardList groupedEvents={groupedEvents}/>
        </div>
    </div>
  )
}

export default UserEventsPage