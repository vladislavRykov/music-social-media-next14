import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import s from './LinearMusicItem.module.scss';
import LoadingSvg from '@/public/circleTube.svg';
import { GrVolume } from 'react-icons/gr';
import {
  setIsPlaying,
  setMusicData,
  setPlaylist,
  setPlaylistItems,
} from '@/redux/slices/PlayerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { MusicData } from '@/types/types';
import cn from 'classnames';
import { selectMusicitemData } from '@/redux/selectors/playerSelectors';

interface LinearMusicItemProps {
  _id: string;
  author: string;
  title: string;
  image: string;
  viewsCount: number;
  playlist: string[];
}

const LinearMusicItem: React.FC<LinearMusicItemProps> = ({
  _id,
  author,
  title,
  image,
  viewsCount,
  playlist,
}) => {
  const dispatch = useAppDispatch();
  const { selectedAudio, isPlaying, isPlayerLoading } = useAppSelector(selectMusicitemData);
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);
  const playSong = async () => {
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      await dispatch(setMusicData(_id));
      dispatch(setPlaylistItems(playlist));
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong = () => {
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    }
  };
  useEffect(() => {
    _id === selectedAudio?._id ? setIsBtnShown(true) : setIsBtnShown(false);
  }, [selectedAudio]);
  return (
    <div className={s.linearMusicItem}>
      <div className={s.linearMusicItem_imageBlock}>
        <Image
          className={s.linearMusicItem_image}
          src={image}
          alt="song image"
          height={70}
          width={70}
        />
        <div
          onMouseOut={() => setIsBtnShown(selectedAudio?._id === _id ? true : false)}
          onMouseOver={() => setIsBtnShown(selectedAudio?._id === _id ? false : true)}
          onClick={selectedAudio?._id === _id && isPlaying ? pauseSong : playSong}
          className={cn(s.linearMusicItem_overlay, {
            [s.linearMusicItem_overlay_shown]: isBtnShown,
          })}>
          {selectedAudio?._id === _id && isPlaying ? (
            <div className={s.linearMusicItem_play}>
              {musicItemLoading ? (
                <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
              ) : isBtnShown ? (
                <GrVolume size={15} />
              ) : (
                <FaPause size={15} />
              )}
            </div>
          ) : (
            <div className={s.linearMusicItem_play}>
              {musicItemLoading ? (
                <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
              ) : (
                <FaPlay size={15} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className={s.linearMusicItem_infoBlock}>
        <h2 className={s.linearMusicItem_title}>{title}</h2>
        <div className={s.linearMusicItem_authorAndViews}>
          <span className={s.linearMusicItem_author}>{author}</span>
          <span className={s.linearMusicItem_viewsCount}>{viewsCount} просмотров</span>
        </div>
      </div>
    </div>
  );
};

export default LinearMusicItem;
