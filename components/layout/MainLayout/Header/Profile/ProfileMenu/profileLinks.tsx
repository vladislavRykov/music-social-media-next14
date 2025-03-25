import { FaUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';

export const getMenuLinks = (userName: string) => [
  {
    title: 'Профиль',
    href: `/user/${userName}`,
    Icon: FaUser,
  },
  {
    title: 'Уведомления',
    href: '/notifications',
    Icon: IoIosNotifications,
  },
  {
    title: 'Настройки',
    href: '/settings',
    Icon: IoMdSettings,
  },
];
