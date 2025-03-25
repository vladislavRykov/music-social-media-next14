'use client';
import React from 'react';
import s from './SettingsNavBar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

const settingsLinks = [
  {
    title: 'Профиль',
    href: '/settings',
  },
  {
    title: 'Аккаунт',
    href: '/settings/account',
  },
];

const SettingsNavBar = () => {
  const pathname = usePathname();
  return (
    <div className={s.settingNavBar}>
      <div className={s.settingNavBar_container}>
        <span className={s.settingNavBar_title}>Настройки</span>
        <div className={s.settingNavBar_links}>
          {settingsLinks.map((link) => (
            <Link
              key={link.href}
              className={cn(s.settingNavBar_link, { [s.active_link]: pathname === link.href })}
              href={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsNavBar;
