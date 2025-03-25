'use client';
import React, { useEffect, useState } from 'react';
import s from './BrowseMusics.module.scss';
import songMock from '@/public/music/fleeting-words-nier-rep.jpg';
import BrowseMusicItem from './BrowseMusicItem/BrowseMusicItem';
import LinearMusicItem from './BrowseMusicItem/LinearMusicItem/LinearMusicItem';
import cn from 'classnames';
import { getAllMusic } from '@/dal/music';
import { MusicData } from '@/types/types';
import { useAppSelector } from '@/hooks/reduxHooks';
import { filtersSelectedData } from '@/redux/selectors/musicFiltersSelectors';

const BrowseMusics = () => {
  const { selectedGenres, year, search, season } = useAppSelector(filtersSelectedData);
  const [musicItemType, setMusicItemType] = useState<'block' | 'linear-record'>('block');
  const [browseMusic, setBrowseMusic] = useState<MusicData[] | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getAllMusic({ genres: selectedGenres.map((genre) => genre.value), search });
      const data = JSON.parse(JSON.stringify(res));
      setBrowseMusic(data);
    })();
  }, [search, selectedGenres]);
  const MusicIdArray = browseMusic?.map((track) => track._id);
  return (
    <div className={s.browseMusics}>
      <div className={s.browseMusics_settings}>
        <div className={s.browseMusics_selectItemsType}>
          <button
            className={cn(s.browseMusics_selectTypeBtn, {
              [s.browseMusics_selectTypeBtn_selected]: musicItemType === 'block',
            })}
            onClick={() => setMusicItemType('block')}>
            Блоки
          </button>
          <button
            className={cn(s.browseMusics_selectTypeBtn, {
              [s.browseMusics_selectTypeBtn_selected]: musicItemType === 'linear-record',
            })}
            onClick={() => setMusicItemType('linear-record')}>
            Линейные записи
          </button>
        </div>
      </div>
      <div
        className={cn({
          [s.browseMusics_blockMusics]: musicItemType === 'block',
          [s.browseMusics_linearMusics]: musicItemType === 'linear-record',
        })}>
        {browseMusic?.map((track) => {
          if (musicItemType === 'block') {
            return (
              <BrowseMusicItem
                key={track._id}
                _id={track._id}
                author={track.author}
                title={track.title}
                image={track.image}
                playlist={MusicIdArray || []}
              />
            );
          } else {
            return (
              <LinearMusicItem
                key={track._id}
                _id={track._id}
                viewsCount={track.viewsCount}
                author={track.author}
                title={track.title}
                image={track.image}
                playlist={MusicIdArray || []}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default BrowseMusics;
