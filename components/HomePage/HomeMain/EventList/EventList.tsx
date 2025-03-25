'use client'
import { Event, GetEventDataT } from '@/types/kudaGo'
import React, { useEffect, useState } from 'react'
import s from './EventList.module.scss'
import EventItem from './EventItem/EventItem'
import { useAsync } from '@/hooks/useFetching'

type Props = {
  isOnlyFreeEvents: boolean;
}

const EventList = ({isOnlyFreeEvents}:Props) => {
  const getEvents = async()=>{
    
    const res = await fetch(
      `http://localhost:3000/api/events?is_free=${isOnlyFreeEvents}`
    )
    const data:GetEventDataT = await res.json()
    return data
  }
  const {execute,status,data,error} = useAsync(getEvents,[isOnlyFreeEvents])
  
  console.log(data,isOnlyFreeEvents)

  return (
    <div className={s.eventList}>
      {status ==='pending' && 'loading...'}
        {status ==='success' && data?.results?.map(event=><EventItem {...event}/>)}
    </div>
  )
}

export default EventList