'use client';
import React, { useEffect, useRef } from 'react';
import s from './Home.module.scss';
import HomeHeader from '@/components/HomePage/HomeHeader/HomeHeader';
import HomeMain from '@/components/HomePage/HomeMain/HomeMain';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const Home = () => {
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    if (params?.get('blocked') === 'true') {
      toast.error('Доступ ограничен: вы были заблокированы этим пользователем');
      // Очищаем параметры после показа
      window.history.replaceState(null, '', '/home');
    }
  }, [params]);
  return (
    <div className={s.home}>
      <HomeHeader
        scrollIntoViewOfMain={() => mainContentRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
      <HomeMain mainContentRef={mainContentRef} />
    </div>
  );
};

export default Home;
