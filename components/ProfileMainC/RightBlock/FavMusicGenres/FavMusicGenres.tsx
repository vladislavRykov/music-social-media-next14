'use client';
import ProfileBlock from '@/components/layout/ProfileLayout/ProfileBlock/ProfileBlock';
import { Genre } from '@/types/types';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import s from './FavMusicGenres.module.scss';
import FavGenreItem from './FavGenreItem';

type Props = {
  data: {
    genres: Genre[];
  } | null;
  isOk: boolean;
  message: string;
};

const FavMusicGenres = ({ data, isOk, message }: Props) => {
  useEffect(() => {
    if (!isOk) {
      toast.error(message);
    }
  }, [isOk]);
  return (
    <ProfileBlock title="Любимые жанры музыки">
      {isOk && data && (
        <div className={s.favMusicGenres}>
          {data.genres.length === 0 && <div>{message}</div>}
          {data.genres.map((genre) => (
            <FavGenreItem genreName={genre.label} genreId={genre._id} />
          ))}
        </div>
      )}
    </ProfileBlock>
  );
};

export default FavMusicGenres;
