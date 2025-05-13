'use client';
import { getNextSongId } from '@/helpers/playerHelpers';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCurrentTime, setMusicData } from '@/redux/slices/PlayerSlice';
import { MusicData } from '@/types/types';
import React, { ChangeEvent, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  audioVolume: number;
  audioRef: React.RefObject<any>;
  musicData: MusicData;
  playlist: string[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  musicData,
  audioRef,
  src,
  isPlaying,
  audioVolume,
  playlist,
}) => {
  const dispatch = useAppDispatch();

  const onSongEnded = async () => {
    const nextSongId = getNextSongId(playlist, musicData._id);
    await dispatch(setMusicData(nextSongId));
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, musicData]);
  useEffect(() => {
    if (audioRef.current) {
      // console.log(audioVolume)
      audioRef.current.volume = audioVolume;
    }
  }, [audioVolume]);

  return (
    <audio
      onTimeUpdate={(e: ChangeEvent<HTMLAudioElement>) =>
        dispatch(setCurrentTime(e.target.currentTime))
      }
      // loop={}
      onEnded={onSongEnded}
      ref={audioRef}
      src={src}
      autoPlay
    />
  );
};

export default AudioPlayer;
