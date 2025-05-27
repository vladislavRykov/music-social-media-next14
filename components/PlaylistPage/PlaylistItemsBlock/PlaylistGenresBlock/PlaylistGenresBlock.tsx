'use client';
import { Genre } from '@/types/types';
import React, { useState } from 'react';
import PlaylistGenreItem from './PlaylistGenreItem';
import s from './PlaylistGenresBlock.module.scss';

const PlaylistGenresBlock = ({ playlistGenres }: { playlistGenres: Genre[] }) => {
  const [isGenresShown, setIsGenresShown] = useState(false);
  return (
    <div className={s.playlistGenresBlock}>
      <div className={s.playlistGenresBlock_container}>
        <button
          onClick={() => setIsGenresShown((prev) => !prev)}
          className={s.playlistGenresBlock_button}>{`${
          isGenresShown ? 'Скрыть' : 'Показать'
        } жанры`}</button>
        {isGenresShown && (
          <div className={s.playlistGenresBlock_list}>
            {playlistGenres.map((genre) => (
              <PlaylistGenreItem label={genre.label} genreId={genre._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistGenresBlock;
