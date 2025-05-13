import React, { useEffect, useState } from 'react';
import s from './PlaylistLeftBlock.module.scss';
import { AccessType, Overwrite } from '@/types/common';
import Image, { StaticImageData } from 'next/image';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineEdit } from 'react-icons/md';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { setIsPlaying } from '@/redux/slices/PlayerSlice';
import PlaylistLeftBlockControls from './PlaylistLeftBlockControls/PlaylistLeftBlockControls';
import { MusicData, UserDataMongoose } from '@/types/types';
import { PlaylistData } from '@/types/playlistTypes';
import PlaylistUploadAvatar from './PlaylistUploadAvatar/PlaylistUploadAvatar';

type PlaylistLeftBlockProps = {
  title: string;
  playlistImg: string | StaticImageData;
  description: string;
  trackCount: number;
  totalDuration: number;
  access_type: AccessType;
  createdAt: string;
  author: { username: string; avatar: string };
  playlistId: string;
  firstSongId: string;
  isAuthor: boolean;
  isPlaylistEmpty: boolean;
  type: string;
  isPlaylistHasImg: boolean;
  updatePlaylistData: () => void;
};

const PlaylistLeftBlock: React.FC<PlaylistLeftBlockProps> = ({
  title,
  playlistImg,
  isPlaylistHasImg,
  description,
  trackCount,
  totalDuration,
  access_type,
  createdAt,
  author,
  playlistId,
  firstSongId,
  isAuthor,
  type,
  isPlaylistEmpty,
  updatePlaylistData,
}) => {
  const accessString = (access_type: AccessType) => {
    if (access_type === AccessType.Public) {
      return 'Открытый доступ';
    } else if (access_type === AccessType.Private) {
      return 'Закрытый доступ';
    }
    return 'Доступ по ссылке';
  };
  const playlistData = { title, desc: description, access_type, playlistId: playlistId };
  return (
    <div className={s.playlistLeftBlock}>
      <div className={s.playlistLeftBlock_infoBlock}>
        <div className={s.playlistLeftBlock_imgBlock}>
          <Image
            className={s.playlistLeftBlock_playlistImg}
            src={playlistImg}
            height={300}
            width={300}
            alt="Изображение плейлиста"
            priority
          />
          {type !== 'favorites' && (
            <PlaylistUploadAvatar
              updatePlaylistData={updatePlaylistData}
              playlistId={playlistId}
              isPlaylistHasImg={isPlaylistHasImg}
            />
          )}
        </div>
        <h2 className={s.playlistLeftBlock_title}>{title}</h2>
        <div className={s.playlistLeftBlock_author}>
          <Image
            className={s.playlistLeftBlock_avatar}
            src={author.avatar}
            height={20}
            width={20}
            alt="Аватарка автора"
          />
          <h3 className={s.playlistLeftBlock_authorName}>{author.username}</h3>
        </div>
        <div className={s.playlistLeftBlock_info}>{`Плейлист • ${accessString(
          access_type,
        )} • ${trackCount} треков • ${secondsToStringTimer(totalDuration)}`}</div>
        <p className={s.playlistLeftBlock_desc}>{description}</p>
      </div>
      {!isPlaylistEmpty && (
        <PlaylistLeftBlockControls
          type={type}
          playlistData={playlistData}
          playlistId={playlistId}
          firstSongId={firstSongId}
          updatePlaylistData={updatePlaylistData}
          isAuthor={isAuthor}
        />
      )}
    </div>
  );
};

export default PlaylistLeftBlock;
