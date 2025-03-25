'use client';
import React, { useEffect, useState } from 'react';
import s from './BrowseMusicItem.module.scss';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { GrVolume } from 'react-icons/gr';
import Link from 'next/link';
import LoadingSvg from '@/public/circleTube.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  setIsPlaying,
  setMusicData,
  setPlaylist,
  setPlaylistData,
  setPlaylistItems,
} from '@/redux/slices/PlayerSlice';
import { MusicData } from '@/types/types';
import cn from 'classnames';
import { selectMusicitemData } from '@/redux/selectors/playerSelectors';
import { useRouter } from 'next/navigation';

interface BrowseMusicItemProps {
  _id: string;
  author: string;
  title: string;
  image: string;
  playlist: string[];
}

const BrowseMusicItem: React.FC<BrowseMusicItemProps> = ({
  _id,
  author,
  title,
  image,
  playlist,
}) => {
  const dispatch = useAppDispatch();
  const { selectedAudio, isPlaying, isPlayerLoading } = useAppSelector(selectMusicitemData);
  const router = useRouter();
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);
  const playSong: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation();
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      await dispatch(setMusicData(_id));
      dispatch(setPlaylist({ _id: null, items: playlist,type: null }));
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    }
  };
  useEffect(() => {
    _id === selectedAudio?._id ? setIsBtnShown(true) : setIsBtnShown(false);
  }, [selectedAudio]);

  return (
    <div
      onClick={(e) => {
        dispatch(setPlaylistItems(playlist));
        router.push(`/player/playlist?m=${_id}`);
      }}
      className={s.browseMusicItem}>
      <div className={s.browseMusicItem_imageBlock}>
        <Image
          className={s.browseMusicItem_image}
          src={image}
          alt="song image"
          height={200}
          width={200}
        />
        <div
          className={cn(s.browseMusicItem_overlay, {
            [s.browseMusicItem_overlay_shown]: selectedAudio?._id === _id || isBtnShown,
          })}>
          {selectedAudio?._id === _id && isPlaying ? (
            <div
              onMouseOut={() => setIsBtnShown(true)}
              onMouseOver={() => setIsBtnShown(false)}
              className={cn(s.browseMusicItem_play, {
                [s.browseMusicItem_play_shown]: selectedAudio?._id === _id || isBtnShown,
              })}
              onClick={pauseSong}>
              {musicItemLoading ? (
                <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
              ) : isBtnShown ? (
                <GrVolume size={15} />
              ) : (
                <FaPause size={15} />
              )}
            </div>
          ) : (
            <div
              className={cn(s.browseMusicItem_play, {
                [s.browseMusicItem_play_shown]: selectedAudio?._id === _id || isBtnShown,
              })}
              onClick={playSong}>
              {musicItemLoading ? (
                <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
              ) : (
                <FaPlay size={15} />
              )}
            </div>
          )}
        </div>
      </div>
      <h2 className={s.browseMusicItem_title}>{title}</h2>
      <h3 className={s.browseMusicItem_author}>{author}</h3>
    </div>
  );
};

export default BrowseMusicItem;
