'use client';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addGenre } from '@/redux/slices/MusicFilters';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';
import s from './FavMusicGenres.module.scss';

const FavGenreItem = ({ genreName, genreId }: { genreName: string; genreId: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onGenreClick = () => {
    dispatch(addGenre({ label: genreName, value:genreId }));
    router.push('/browse');
  };
  return (
    <div title='Перейти к поиску' className={s.favGenreItem} onClick={onGenreClick}>
      {genreName}
    </div>
  );
};

export default FavGenreItem;
