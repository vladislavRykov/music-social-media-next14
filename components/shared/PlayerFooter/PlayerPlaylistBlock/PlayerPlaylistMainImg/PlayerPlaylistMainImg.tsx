'use client';
import React, { useEffect, useState } from 'react';
import s from './PlayerPlaylistMainImg.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMusicitemData } from '@/redux/selectors/playerSelectors';
import ImgLoader from '@/components/UI/Loaders/GeneralImgLoader';
import cn from 'classnames';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { setIsPlaying } from '@/redux/slices/PlayerSlice';
import LoadingSvg from '@/public/circleTube.svg';

const PlayerPlaylistMainImg = () => {
  const { selectedAudio, isPlaying, isPlayerLoading } = useAppSelector(selectMusicitemData);
  const [isControlVisable, setIsControlVisable] = useState(false);

  const dispatch = useAppDispatch();
  // const [musicItemLoading, setMusicItemLoading] = useState(false);

  const onImgClick = () => {
    if (isPlaying) {
      dispatch(setIsPlaying(false));
    } else {
      dispatch(setIsPlaying(true));
    }
    setIsControlVisable(true);

    setTimeout(() => {
      setIsControlVisable(false);
    }, 600);
  };
  // useEffect(() => {
  //   if (!isPlayerLoading) setMusicItemLoading(false);
  // }, [isPlayerLoading]);
  return (
    <div className={s.playerPlaylistMainImg}>
      {!isPlayerLoading && selectedAudio ? (
        <div className={s.playerPlaylistMainImg_imgContainer} onClick={onImgClick}>
          <Image src={selectedAudio?.image} alt="изображение музыки" width={800} height={500} />
          <div className={s.playerPlaylistMainImg_controls}>
            {isPlayerLoading ? (
              <Image
                className={s.playerPlaylistMainImg_loading}
                src={LoadingSvg}
                alt="loading"
                height={50}
                width={50}
              />
            ) : (
              <>
                {isPlaying && isControlVisable && (
                  <div className={s.playerPlaylistMainImg_play}>
                    <MdPlayArrow className={s.playerPlaylistMainImg_icon} />
                  </div>
                )}
                {!isPlaying && isControlVisable && (
                  <div className={s.playerPlaylistMainImg_pause}>
                    <MdPause className={s.playerPlaylistMainImg_icon} />
                  </div>
                )}
              </>
            )}
          </div>

          <div className={s.playerPlaylistMainImg_topOverlay}></div>
        </div>
      ) : (
        <ImgLoader height="500" width="800" />
      )}
    </div>
  );
};

export default PlayerPlaylistMainImg;
