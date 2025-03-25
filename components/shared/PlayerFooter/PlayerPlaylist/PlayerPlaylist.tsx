'use client';
import React, { useEffect, useState } from 'react';
import s from './PlayerPlaylist.module.scss';
import { GoTriangleUp } from 'react-icons/go';
import cn from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

type Playlist = {
  _id: string | null;
  items: string[];
};

const PlayerPlaylist = ({ playlist, musicId }: { playlist: Playlist; musicId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  // const [prevPath, setPrevPath] = useState<string | null>(null);
  const openFullPlayer = () => {
    // router.push(`/player/playlist`);
    router.push(`/player/playlist?m=${musicId}${playlist._id ? `&list=${playlist._id}` : ''}`);
  };
  const closeFullPlayer = () => {
    router.back();
    // router.push(prevPath || '/home');
  };
  const isOpen = pathname?.includes('/player/playlist');
  return (
    <div className={s.playerPlaylist}>
      <div
        className={s.playerPlaylist_iconWrap}
        onClick={isOpen !== undefined ? (isOpen ? closeFullPlayer : openFullPlayer) : isOpen}>
        <GoTriangleUp
          className={cn(s.playerPlaylist_icon, { [s.playerPlaylist_opened]: isOpen })}
        />
      </div>
    </div>
  );
};

export default PlayerPlaylist;
