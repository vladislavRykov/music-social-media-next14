'use client';
import React, { useEffect, useState } from 'react';
import s from './LibPlaylist.module.scss';
import Image, { StaticImageData } from 'next/image';
import { FaPause, FaPlay, FaPlayCircle } from 'react-icons/fa';
import cn from 'classnames';
import {
  setIsPlaying,
  setMusicData,
  setPlaylist,
  setPlaylistItems,
} from '@/redux/slices/PlayerSlice';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMusicitemData, selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { GrVolume } from 'react-icons/gr';
import LoadingSvg from '@/public/circleTube.svg';
import LibPlaylistSettings from './LibPlaylistSettings/LibPlaylistSettings';
import { BsThreeDotsVertical } from 'react-icons/bs';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import OpenPlaylistPlayer from '@/components/shared/SettingsBtnPopUp/OpenPlaylistPlayer/OpenPlaylistPlayer';
import DeletePlaylist from '@/components/shared/SettingsBtnPopUp/DeletePlaylist/DeletePlaylist';
import ShufflePlaylist from '@/components/shared/SettingsBtnPopUp/ShufflePlaylist/ShufflePlaylist';
import { useRouter } from 'nextjs-toploader/app';
import CopyPlaylist from '@/components/shared/SettingsBtnPopUp/CopyPlaylist/CopyPlaylist';
import { toast } from 'react-toastify';

interface LibPlaylistProps {
  playlistImg: StaticImageData | string;
  title: string;
  author?: string;
  trackCount?: number;
  playlistId: string;
  desc?: string;
  allItems: string[];
  nickname?: string | undefined;
  type: string;
  isCurrentUserAuthor: boolean;
}

const LibPlaylist: React.FC<LibPlaylistProps> = ({
  title,
  author,
  trackCount,
  playlistImg,
  playlistId,
  desc,
  allItems,
  isCurrentUserAuthor,
  nickname,
  type,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { musicData, playlist, isPlayerLoading, isPlaying } = useAppSelector(selectPlayerPlaylist);
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);
  const [blockPosition, setBlockPosition] = useState<{ x: string; y: string }>({ x: '0', y: '0' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const playSong: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    if (playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      if(allItems.length===0) return toast.info('Плейлист пуст')
      setMusicItemLoading(true);
      // await dispatch(setMusicData(allItems[0]));
      // dispatch(setPlaylist({ _id: playlistId, items: allItems }));
      router.push(`/player/playlist?m=${allItems[0]}&list=${playlistId}`);
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    }
  };
  useEffect(() => {
    playlistId === playlist._id ? setIsBtnShown(true) : setIsBtnShown(false);
  }, [playlistId]);
  return (
    <div className={s.libPlaylist}>
      {/* <div href={`/playlist?list=${playlistId}`} className={s.libPlaylist_imgBlock}> */}
      <div className={s.libPlaylist_imgBlock}>
        <Link href={`/playlist?list=${playlistId}`} style={{ position: 'relative',display: 'block' }}>
          <Image
            className={s.libPlaylist_img}
            src={playlistImg}
            width={150}
            height={150}
            alt="music img"
          />

          {/* <div className={cn(s.libPlaylist_play)}>
          <FaPlay size={15} />
        </div> */}


          <div className={s.libPlaylist_topShadow}></div>
        </Link>
          {playlist?._id === playlistId && isPlaying ? (
            <div
              onMouseOut={() => setIsBtnShown(true)}
              onMouseOver={() => setIsBtnShown(false)}
              className={cn(s.libPlaylist_play, {
                [s.libPlaylist_play_shown]: playlist?._id === playlistId || isBtnShown,
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
              className={cn(s.libPlaylist_play, { [s.libPlaylist_play_shown]: isBtnShown })}
              onClick={playSong}>
              {musicItemLoading ? (
                <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
              ) : (
                <FaPlay size={15} />
              )}
            </div>
          )}
        <div className={s.libPlaylist_settings}>
          <LibPlaylistSettings
            setIsPopupOpen={setIsPopupOpen}
            setBlockPosition={setBlockPosition}
          />
        </div>
      </div>
      {isPopupOpen && (
        <SettingsBtnPopUp
          styles={{
            left: blockPosition.x,
            top: blockPosition.y,
            position: 'fixed',
            zIndex: 1000,
          }}
          closePopup={() => setIsPopupOpen(false)}>
          <ShufflePlaylist playlistId={playlistId} />
          <DeletePlaylist playlistId={playlistId} closePopup={() => setIsPopupOpen(false)} />
          {!isCurrentUserAuthor && (
            <CopyPlaylist playlistId={playlistId} closePopup={() => setIsPopupOpen(false)} />
          )}
          <OpenPlaylistPlayer
            openPlayer={() => {
              if (musicItemLoading) return;
              setMusicItemLoading(true);
              router.push(`/player/playlist?m=${allItems[0]}&list=${playlistId}`);
            }}
          />
        </SettingsBtnPopUp>
      )}
      <div className={s.libPlaylist_info}>
        <span className={s.libPlaylist_title}>{title}</span>
        <span className={s.libPlaylist_author}>
          {playlistId === 'LM' ? '' : `Плейлист • `}
          {author}
        </span>
        <span className={s.libPlaylist_trackCount}>&bull; {trackCount} трека</span>
      </div>
    </div>
  );
};

export default LibPlaylist;
