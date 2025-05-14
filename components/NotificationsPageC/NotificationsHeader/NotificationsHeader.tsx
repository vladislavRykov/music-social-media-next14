'use client';
import React, { PropsWithChildren, useState } from 'react';
import s from './NotificationsHeader.module.scss';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

interface Props extends PropsWithChildren {
  title: string;
  defaultExpandStatus?: boolean
}

const NotificationsHeader = ({ title, children ,defaultExpandStatus=false}: Props) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpandStatus);
  return (
    <div className={s.notificationsHeader}>
      <h2 className={s.notificationsHeader_title}>
        <button onClick={() => setIsExpanded((prev) => !prev)}>
          {title}
          {isExpanded ? (
            <GoTriangleDown className={s.notificationsHeader_icon} />
          ) : (
            <GoTriangleUp className={s.notificationsHeader_icon} />
          )}
        </button>
      </h2>
      {isExpanded && <div className={s.notificationsHeader_main}>{children}</div>}
    </div>
  );
};

export default NotificationsHeader;
