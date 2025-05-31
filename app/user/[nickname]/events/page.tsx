import { getAllUserEventAttendancesA } from '@/actions/eventAttendance';
import UserEventsPage from '@/pages/UserEventsPage/UserEventsPage';
import { EventAttendanceStatus } from '@/types/eventAttendace';
import React from 'react';

const page = async ({ params }: { params: { nickname: string }; searchParams: {} }) => {
  const res = await getAllUserEventAttendancesA(params.nickname);
  if(!res.ok || !res.data){
    return <div>{res.message}</div>
  }
  return <UserEventsPage groupedEvents={res.data}/>;
};

export default page;
