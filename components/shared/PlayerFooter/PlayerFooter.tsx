'use client';
import React, { useEffect, useRef, useState } from 'react';
import s from './PlayerFooter.module.scss';
import PlayerControls from './PlayerControls/PlayerControls';
import PlayerTimer from './PlayerTimer/PlayerTimer';
import PlayerData from './PlayerData/PlayerData';
import PlayerSettings from './PlayerSettings/PlayerSettings';
import PlayerLikeDislike from './PlayerLikeDislike/PlayerLikeDislike';
import PlayerPlaylist from './PlayerPlaylist/PlayerPlaylist';
import PlayerOptions from './PlayerOptions/PlayerOptions';
import songMockImg from '@/public/music/fleeting-words-nier-rep.jpg';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { useAppSelector } from '@/hooks/reduxHooks';
import { MusicData } from '@/types/types';
import AudioProgressBar from './AudioProgressBar/AudioProgressBar';
import LoadingSvg from '@/public/circleTube.svg';
import Image from 'next/image';
import { Inter, Roboto } from 'next/font/google';
import { selectPlayerData } from '@/redux/selectors/playerSelectors';
import { usePathname } from 'next/navigation';
import PlayerPlaylistBlock from './PlayerPlaylistBlock/PlayerPlaylistBlock';
import { getFromLocalStorage } from '@/utils/localStorageHelper';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const PlayerFooter = () => {
  const pathname = usePathname();
  const isOpen = pathname?.includes('/player/playlist');
  const {
    musicData,
    isPlaying,
    audioVolume,
    currentTime,
    showPlayer,
    playlist,
    isPlayerLoading,
    loop,
  } = useAppSelector(selectPlayerData);
  const [isPlayerHovered, setIsPlayerHovered] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  if (!showPlayer) return;
  if (isPlayerLoading)
    return (
      <>
        <div
          className={s.playerFooter}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image src={LoadingSvg} height={60} width={60} alt="loading..." />
        </div>
        <PlayerPlaylistBlock isOpen={!!isOpen} />
      </>
    );
  return (
    <>
      <div
        className={s.playerFooter}
        onMouseLeave={() => setIsPlayerHovered(false)}
        onMouseEnter={() => setIsPlayerHovered(true)}>
        <div className={s.playerFooter_container}>
          {musicData && (
            <AudioPlayer
              loop={loop}
              musicData={musicData}
              audioRef={audio}
              audioVolume={audioVolume}
              isPlaying={isPlaying}
              src={musicData.songPath}
              playlist={playlist.items}
            />
          )}
          {musicData && (
            <AudioProgressBar
              isPlayerHovered={isPlayerHovered}
              audioRef={audio}
              currentTime={currentTime}
              duration={musicData.duration}
            />
          )}
          <div className={s.leftBlock}>
            {musicData && (
              <PlayerControls
                isPlaying={isPlaying}
                playlist={playlist.items}
                currentSongId={musicData._id}
              />
            )}
            {musicData && <PlayerTimer currentTime={currentTime} duration={musicData.duration} />}
          </div>
          <div className={s.centerBlock}>
            {musicData && (
              <>
                <PlayerData
                  author={musicData.author}
                  title={musicData.title}
                  image={musicData.image}
                  viewsCount={musicData.viewsCount}
                  likes={musicData.likes}
                />
                <PlayerLikeDislike reactionType={musicData.reactionStatus} songId={musicData._id} />
                <PlayerSettings
                  reactionType={musicData.reactionStatus}
                  currentSongReaction={musicData.reactionStatus}
                  playlistType={playlist.type}
                  isOpen={isOpen}
                  playlistId={playlist._id}
                  musicId={musicData._id}
                />
              </>
            )}
          </div>
          <div className={s.rightBlock}>
            <PlayerOptions
              loop={loop}
              isPlayerHovered={isPlayerHovered}
              audioVolume={audioVolume}
            />
            <PlayerPlaylist musicId={musicData?._id || ''} playlist={playlist} />
          </div>
        </div>
      </div>
      <PlayerPlaylistBlock isOpen={!!isOpen} />
    </>
  );
};

export default PlayerFooter;
