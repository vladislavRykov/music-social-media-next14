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
import { useAsync } from '@/hooks/useFetching';
import circleTube from '@/public/circleTube.svg';
import Image from 'next/image';
import BrowseMusicItemLoader from '@/components/UI/Loaders/BrowseMusicItemLoader';

const BrowseMusics = () => {
  const { selectedGenres, year, search, season } = useAppSelector(filtersSelectedData);
  const [musicItemType, setMusicItemType] = useState<'block' | 'linear-record'>('block');

  const getBrowseMusics = async () => {
    const res = await getAllMusic({ genres: selectedGenres.map((genre) => genre.value), search });
    const data = JSON.parse(JSON.stringify(res));
    return data as MusicData[];
  };

  const {
    status,
    data: browseMusic,
    error,
    execute,
  } = useAsync(getBrowseMusics, [selectedGenres, search]);
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
        {status == 'success' &&
          browseMusic?.map((track) => {
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

        {status == 'pending' &&
          Array(12)
            .fill(0)
            .map((_, idx) => <BrowseMusicItemLoader />)}
      </div>
    </div>
  );
};

export default BrowseMusics;
