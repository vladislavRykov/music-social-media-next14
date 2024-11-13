'use client';
import React from 'react';
import s from './Header.module.scss';
import Image from 'next/image';
import logo from '@/public/logo3.jpg';
import HeaderLinks from './HeaderLinks/HeaderLinks';
// import Profile from './Profile/Profile';
import Search from './Search/Search';
import Logo from './Logo/Logo';
import Head from 'next/head';
import Headroom from 'react-headroom';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { links, unAuthorizedLinks } from './headerLinks';
import Profile from './Profile/Profile';
import NotAuthProfile from './NotAuthProfile/NotAuthProfile';

const pagesWithCap = ['/user/SuperKiller12345/music-list', '/user/SuperKiller12345'];

const Header = () => {
  const isAuth = false;
  const pathname = usePathname();
  const isPageWithCap = pagesWithCap.some((word) => pathname?.includes(word));
  return (
    <Headroom wrapperStyle={{ position: 'absolute', top: '0', left: 0, right: 0 }}>
      <div className={cn(s.header, { [s.header_capPage]: isPageWithCap })}>
        <Logo />
        <HeaderLinks links={isAuth ? links : unAuthorizedLinks} />
        <div className={s.searchAndProfile}>
          {isAuth && <Search />}
          {isAuth ? <Profile /> : <NotAuthProfile />}
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
