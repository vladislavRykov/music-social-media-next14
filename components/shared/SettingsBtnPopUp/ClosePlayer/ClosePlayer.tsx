'use client';
import React from 'react';
import DeafultItem from '../DeafultItem/DeafultItem';
import { IoIosCloseCircle } from 'react-icons/io';
import { clearPlayer } from '@/redux/slices/PlayerSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useRouter } from 'nextjs-toploader/app';

const ClosePlayer = ({ isOpen }: { isOpen: boolean | undefined }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <DeafultItem
      title="Закрыть плеер"
      Icon={IoIosCloseCircle}
      action={() => {
        if (isOpen) {
          router.back();
        }
        dispatch(clearPlayer());
      }}
    />
  );
};

export default ClosePlayer;
