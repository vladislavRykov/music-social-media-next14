'use client';
import React, { useEffect, useState } from 'react';
import s from './UnAuthUserHeader.module.scss';
import Image from 'next/image';
import logo from '@/public/logo3.jpg';
// import Profile from './Profile/Profile';
import Head from 'next/head';
import Headroom from 'react-headroom';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { Session } from 'next-auth';
import API from '@/services/api/api';
import NotAuthProfile from '../NotAuthProfile/NotAuthProfile';
import HeaderLinks from '../HeaderLinks/HeaderLinks';
import { unAuthorizedLinks } from '../headerLinks';
import Logo from '../Logo/Logo';

const pagesWithCap = ['/user'];

const UnAuthUserHeader = () => {
  const pathname = usePathname();
  const isPageWithCap = pagesWithCap.some((word) => pathname?.includes(word));
  return (
    <Headroom wrapperStyle={{ position: 'absolute', top: '0', left: 0, right: 0, zIndex: 20 }}>
      <div className={cn(s.header, { [s.header_capPage]: isPageWithCap })}>
        <Logo />
        <HeaderLinks links={unAuthorizedLinks} />
        <div className={s.searchAndProfile}>
          <NotAuthProfile />
        </div>
      </div>
    </Headroom>
  );
};

export default UnAuthUserHeader;
