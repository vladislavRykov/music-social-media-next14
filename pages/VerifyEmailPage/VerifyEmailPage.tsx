'use client';
import { verifyEmail } from '@/actions/verification';
import { useFetchingSA } from '@/hooks/useFetching';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import s from './VerifyEmailPage.module.scss';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { toast } from 'react-toastify';
import Image from 'next/image';
import circleTube from '@/public/circleTube.svg';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { getUserProfile } from '@/redux/slices/UserSlice';

const VerifyEmailPage = () => {
  const [count, setCount] = useState(3);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  const dispatch = useAppDispatch();
  const verifyToken = useCallback(async () => {
    if (token) {
      const res = await verifyEmail(token);
      await dispatch(getUserProfile());
      return res;
    }
  }, []);
  const [verifyTokenWithFetch, data, isLoading, error] = useFetchingSA(verifyToken);
  useEffect(() => {
    if (!token) return router.push('/home');
    (async () => {
      const res = await verifyTokenWithFetch();
      if (!res.ok) return toast.error(res.message);
      toast.success(res.message);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading && (data || error)) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      if (count === 0) {
        clearInterval(interval);
        if (data) {
          router.push('/login');
        } else {
          router.push('/signup');
        }
      }

      return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }
  }, [count, data, error]);

  return (
    <div className={s.wrapper}>
      <div className={s.infoBlock}>
        {!isLoading && (data || error) ? (
          <div>Перенаправление через {count}...</div>
        ) : (
          <Image src={circleTube} height={150} width={150} alt="loading..." />
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
