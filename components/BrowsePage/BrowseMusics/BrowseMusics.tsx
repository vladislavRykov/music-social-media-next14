'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './BrowseMusics.module.scss';
import songMock from '@/public/music/fleeting-words-nier-rep.jpg';
import BrowseMusicItem from './BrowseMusicItem/BrowseMusicItem';
import LinearMusicItem from './BrowseMusicItem/LinearMusicItem/LinearMusicItem';
import cn from 'classnames';
import { getAllMusic } from '@/dal/music';
import { MusicData } from '@/types/types';
import { useAppSelector } from '@/hooks/reduxHooks';
import { filtersSelectedData } from '@/redux/selectors/musicFiltersSelectors';
import { useAsync, useLoading } from '@/hooks/useFetching';
import circleTube from '@/public/circleTube.svg';
import Image from 'next/image';
import BrowseMusicItemLoader from '@/components/UI/Loaders/BrowseMusicItemLoader';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageHelper';
import { useDebounce } from '@/hooks/hooks';
import useScrollPagination from '@/hooks/useScrollPagination';
import BrowseLinearMusicItemLoader from '@/components/UI/Loaders/BrowseLinearMusicItemLoader';

const BrowseMusics = () => {
  const { selectedGenres, year, search, season } = useAppSelector(filtersSelectedData);
  const debouncedSearch = useDebounce(search);
  const [musicItemType, setMusicItemType] = useState<'block' | 'linear-record'>('block');
  const loadMoreItems = useRef(true);
  const [musics, setMusics] = useState<MusicData[]>([]);
  useEffect(() => {
    const existingMusicType = getFromLocalStorage('browse-music-item-type');
    setMusicItemType(existingMusicType);
  }, []);
  const getBrowseMusics = async (
    musics: MusicData[],
    selectedGenres: {
      label: string;
      value: string;
    }[],
    year: {
      label: string;
      value: string;
    }[],
    search: string,
  ) => {
    console.log(loadMoreItems.current, musics);
    const musicLimit = 15;
    if (!loadMoreItems.current) return;
    const lastMusicId = musics.length > 0 ? musics[musics.length - 1]._id : null;
    const selectedYear = year.length === 0 ? null : Number(year[0].value);
    const res = await getAllMusic({
      genres: selectedGenres.map((genre) => genre.value),
      search,
      year: selectedYear,
      limit: musicLimit,
      lastPostId: lastMusicId,
    });
    if (!res) return;
    const data = JSON.parse(JSON.stringify(res));
    setMusics((prev) => [...prev, ...(data as MusicData[])]);
    // setMusics(data as MusicData[]);
    if (data.length < musicLimit) loadMoreItems.current = false; // закончились посты
    // return data as MusicData[];
  };

  const [getBrowseMusicsLoading, isLoading] = useLoading(getBrowseMusics);

  useEffect(() => {
    const firstLoad = async () => {
      loadMoreItems.current = true;
      setMusics([]);
      console.log(12312);
      await getBrowseMusicsLoading([], selectedGenres, year, search);
    };
    firstLoad();
  }, [selectedGenres, debouncedSearch, year]); // Перезагрузка при изменении slug или free-flag
  const refObserver = useScrollPagination({
    loadMoreCallback: () => {
      if (musics.length === 0) return new Promise((res) => res());
      return getBrowseMusicsLoading(musics, selectedGenres, year, search);
    },
    threshold: 100, // подгружаем, когда расстояние до конца страницы меньше 100 пикселей
    scrollDeps: [selectedGenres, debouncedSearch, year, musics],
  });
  const MusicIdArray = musics?.map((track) => track._id);
  return (
    <div className={s.browseMusics}>
      <div className={s.browseMusics_settings}>
        <div className={s.browseMusics_selectItemsType}>
          <button
            className={cn(s.browseMusics_selectTypeBtn, {
              [s.browseMusics_selectTypeBtn_selected]: musicItemType === 'block',
            })}
            onClick={() => {
              setMusicItemType('block');
              saveToLocalStorage('browse-music-item-type', 'block');
            }}>
            Блоки
          </button>
          <button
            className={cn(s.browseMusics_selectTypeBtn, {
              [s.browseMusics_selectTypeBtn_selected]: musicItemType === 'linear-record',
            })}
            onClick={() => {
              setMusicItemType('linear-record');
              saveToLocalStorage('browse-music-item-type', 'linear-record');
            }}>
            Линейные записи
          </button>
        </div>
      </div>
      <div
        className={cn({
          [s.browseMusics_blockMusics]: musicItemType === 'block',
          [s.browseMusics_linearMusics]: musicItemType === 'linear-record',
        })}>
        {musics?.map((track) => {
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
                likesCount={ track.likes}
                author={track.author}
                title={track.title}
                image={track.image}
                playlist={MusicIdArray || []}
              />
            );
          }
        })}

        {isLoading && musicItemType==='block' &&
          Array(15)
            .fill(0)
            .map((_, idx) => <BrowseMusicItemLoader key={idx} />)}
        {isLoading && musicItemType==='linear-record' &&
          Array(15)
            .fill(0)
            .map((_, idx) => <BrowseLinearMusicItemLoader key={idx} />)}
        <div ref={refObserver}></div>
      </div>
    </div>
  );
};

export default BrowseMusics;
