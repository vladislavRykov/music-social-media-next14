import React from 'react';
import s from './UserEventItemOptions.module.scss';
import { ImCross } from 'react-icons/im';
import { FaUserFriends } from 'react-icons/fa';
import cn from 'classnames'
import { deleteCurrentUserEventAttendanceA } from '@/actions/eventAttendance';
import { toast } from 'react-toastify';

type Props = {
  eventId: number;
  removeEventFromState: (eventId: number) => void;
   toggleShowFriends: () => void;
   showFriends: boolean;
};

const UserEventItemOptions = ({eventId,showFriends,removeEventFromState,toggleShowFriends}:Props) => {
        const removeEvent =async()=>{
            removeEventFromState(eventId)
            const res =await deleteCurrentUserEventAttendanceA(eventId.toString())
            if(!res.ok) return toast.error(res.message)
    
        }
  return (
    <div className={s.userEventItemOptions}>
      <button onClick={removeEvent} className={cn(s.userEventItemOptions_cross,s.userEventItemOptions_btn)}>
        <ImCross />
      </button>
      <div className={s.userEventItemOptions_options}>
        <button onClick={toggleShowFriends} className={cn(s.userEventItemOptions_friends,s.userEventItemOptions_btn,{[s.userEventItemOptions_btn_selected]:showFriends})}>
          <FaUserFriends />
        </button>
      </div>
    </div>
  );
};

export default UserEventItemOptions;
