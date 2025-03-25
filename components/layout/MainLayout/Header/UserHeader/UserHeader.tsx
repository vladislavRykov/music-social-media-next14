'use client';
import React, { useEffect, useState } from 'react';
import s from './UserHeader.module.scss';
import Image from 'next/image';
import logo from '@/public/logo3.jpg';
import Head from 'next/head';
import Headroom from 'react-headroom';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Session } from 'next-auth';
import API from '@/services/api/api';
import { getLinks } from '../headerLinks';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Logo from '../Logo/Logo';
import HeaderLinks from '../HeaderLinks/HeaderLinks';
import { useAppSelector } from '@/hooks/reduxHooks';

const pagesWithCap = ['/user'];

const UserHeader = () => {
  const pathname = usePathname();
  const isPageWithCap = pagesWithCap.some((word) => pathname?.includes(word));
  const username = useAppSelector((state) => state.userReducer.user?.username);
  const links = getLinks(username || null)

  return (
    <Headroom wrapperStyle={{ position: 'absolute', top: '0', left: 0, right: 0, zIndex: 20 }}>
      <div className={cn(s.header, { [s.header_capPage]: isPageWithCap })}>
        <Logo />
        <HeaderLinks links={links} />
        <div className={s.searchAndProfile}>
          <Search />
          <Profile />
        </div>
      </div>
    </Headroom>
  );
};

export default UserHeader;
