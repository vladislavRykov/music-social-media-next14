import React, { useState } from 'react';
import s from './EventStatusMark.module.scss';
import { EventAttendanceStatus } from '@/types/eventAttendace';
import PopupWrapper from '@/components/shared/Popups/PopupWrapper';
import { setEventAttendanceA } from '@/actions/eventAttendance';
import { toast } from 'react-toastify';

const getSelectedTitle = (status: EventAttendanceStatus | null) => {
  switch (status) {
    case EventAttendanceStatus.Going:
      return 'Пойду';
    case EventAttendanceStatus.Interested:
      return 'Интересно';
    case EventAttendanceStatus.Not_going:
      return 'Не пойду';
    default:
      return 'Установить статус';
  }
};
const getSelectedColor = (status: EventAttendanceStatus | null) => {
  switch (status) {
    case EventAttendanceStatus.Going:
      return 'green';
    case EventAttendanceStatus.Interested:
      return 'blue';
    case EventAttendanceStatus.Not_going:
      return 'red';
  }
};

const EventStatusMark = ({
  eventId,
  currentUserEventStatus,
}: {
  eventId: string;
  currentUserEventStatus: EventAttendanceStatus | null;
}) => {
  const [selectedMark, setSelectedMark] = useState<EventAttendanceStatus | null>(currentUserEventStatus);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const onOptionClick = async (status: EventAttendanceStatus | null) => {
    setSelectedMark(status);
    const res = await setEventAttendanceA(eventId, status);
    if (!res.ok) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
    setIsPopupOpen(false);
  };
  return (
    <div className={s.eventStatusMark}>
      <div className={s.eventStatusMark_content}>
        <button
          onClick={() => setIsPopupOpen(true)}
          className={s.eventStatusMark_selectedStatus}
          style={selectedMark ? { backgroundColor: getSelectedColor(selectedMark) } : {}}>
          {getSelectedTitle(selectedMark)}
        </button>
        {isPopupOpen && (
          <PopupWrapper closePopup={() => setIsPopupOpen(false)}>
            <ul className={s.eventStatusMark_list}>
              <li
                onClick={() => onOptionClick(EventAttendanceStatus.Interested)}
                className={s.eventStatusMark_itemStatus}>
                Интересно
              </li>
              <li
                onClick={() => onOptionClick(EventAttendanceStatus.Going)}
                className={s.eventStatusMark_itemStatus}>
                Пойду
              </li>
              <li
                onClick={() => onOptionClick(EventAttendanceStatus.Not_going)}
                className={s.eventStatusMark_itemStatus}>
                Не пойду
              </li>
              <li onClick={() => onOptionClick(null)} className={s.eventStatusMark_itemStatus}>
                Убрать
              </li>
            </ul>
          </PopupWrapper>
        )}
      </div>
    </div>
  );
};

export default EventStatusMark;
