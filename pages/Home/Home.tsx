'use client'
import React, { useRef } from 'react';
import s from './Home.module.scss';
import HomeHeader from '@/components/HomePage/HomeHeader/HomeHeader';
import HomeMain from '@/components/HomePage/HomeMain/HomeMain';

const Home = () => {
  const mainContentRef = useRef<HTMLDivElement | null>(null)
  return <div className={s.home}>
    <HomeHeader scrollIntoViewOfMain={()=>mainContentRef.current?.scrollIntoView({behavior: 'smooth'})}/>
    <HomeMain mainContentRef={mainContentRef}/>
  </div>;
};

export default Home;
