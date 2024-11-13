'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import s from './ProfNav.module.scss';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

const ProfNavLinks = [
  {
    title: 'Обзор',
    href: '/user/SuperKiller12345',
  },
  {
    title: 'Моя музыка',
    href: '/user/SuperKiller12345/music-list',
  },
  {
    title: 'Чаты',
    href: '/chat',
  },
  {
    title: 'Посты',
    href: '/post',
  },
];
const routesWithScroll = ['/user/SuperKiller12345/music-list'];
const ProfNav = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (routesWithScroll.some((route) => pathname === route))
      navRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <div ref={navRef} className={s.profnav}>
      <ul className={s.profnav_items}>
        {ProfNavLinks.map((link) => (
          <li>
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
