'use client';
import React from 'react';
import s from './PlaylistGenresBlock.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addGenre } from '@/redux/slices/MusicFilters';
import { useRouter } from 'nextjs-toploader/app';

const PlaylistGenreItem = ({ label, genreId }: { label: string; genreId: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onGenreClick = () => {
    dispatch(addGenre({ label, value: genreId }));
    router.push('/browse');
  };
  return (
    <div title="Перейти к поиску" className={s.playlistGenreItem} onClick={onGenreClick}>
      {label}
    </div>
  );
};

export default PlaylistGenreItem;
