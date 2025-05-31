'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import s from './ProfNav.module.scss';
import { useParams, usePathname } from 'next/navigation';
import cn from 'classnames';
import { useAppSelector } from '@/hooks/reduxHooks';

const routesWithScroll = ['/library', '/posts', '/posts/*','/friends','/events'];
const ProfNav = () => {
  // const userName = useAppSelector((state) => state.userReducer.user?.username);
  const pathname = usePathname();
  const params: { nickname: string } | null = useParams();
  // const splitedPathname = pathname?.split('/')
  // const userFromCurrentUrl = splitedPathname && splitedPathname[1]==='user' && splitedPathname[2]
  const ProfNavLinks = [
    {
      title: 'Главная',
      href: `/user/${params?.nickname}`,
    },
    {
      title: 'Друзья',
      href: `/user/${params?.nickname}/friends`,
    },
    {
      title: 'Библиотека',
      href: `/user/${params?.nickname}/library`,
    },
    {
      title: 'События',
      href: `/user/${params?.nickname}/events`,
    },
    {
      title: 'Посты',
      href: `/user/${params?.nickname}/posts`,
    },
  ];
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (routesWithScroll.some((route) => pathname?.includes(route)))
      navRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <div id="profile-nav" ref={navRef} className={s.profnav}>
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
