'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import s from './ProfNav.module.scss';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useAppSelector } from '@/hooks/reduxHooks';

const routesWithScroll = ['/library','/posts'];
const ProfNav = () => {
  const userName = useAppSelector((state) => state.userReducer.user?.username);
  const ProfNavLinks = [
    {
      title: 'Обзор',
      href: `/user/${userName}`,
    },
    {
      title: 'Библиотека',
      href: `/user/${userName}/library`,
    },
    {
      title: 'Посты',
      href: `/user/${userName}/posts`,
    },
  ];
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (routesWithScroll.some((route) => pathname?.includes(route)))
      navRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <div ref={navRef} className={s.profnav}>
      <ul className={s.profnav_items}>
        {ProfNavLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={cn(s.profnav_item, { [s.selectedLink]: pathname === link.href })}
              href={link.href}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfNav;
