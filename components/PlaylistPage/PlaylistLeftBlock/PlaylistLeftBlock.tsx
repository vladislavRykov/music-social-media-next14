import React, { useState } from 'react';
import s from './PlaylistLeftBlock.module.scss';
import { AccessType } from '@/types/common';
import Image, { StaticImageData } from 'next/image';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import PlaylistLeftBlockControls from './PlaylistLeftBlockControls/PlaylistLeftBlockControls';
import PlaylistUploadAvatar from './PlaylistUploadAvatar/PlaylistUploadAvatar';
import Link from 'next/link';
import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import FullDescModal from './FullDescModal/FullDescModal';
import defaultAvatar from '@/public/avatars/default.jpg'

type PlaylistLeftBlockProps = {
  title: string;
  playlistImg: string | StaticImageData;
  description: string;
  trackCount: number;
  totalDuration: number;
  access_type: AccessType;
  createdAt: string;
  author: { username: string; avatar?: string };
  playlistId: string;
  firstSongId: string;
  isAuthor: boolean;
  isPlaylistEmpty: boolean;
  type: string;
  isPlaylistHasImg: boolean;
  updatePlaylistData: () => void;
  isPlayerShown: boolean;
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
  isPlayerShown,
}) => {
  const accessString = (access_type: AccessType) => {
    if (access_type === AccessType.Public) {
      return 'Открытый доступ';
    } else if (access_type === AccessType.Private) {
      return 'Закрытый доступ';
    }
    return 'Доступ по ссылке';
  };

  const [showFullDesc, setShowFullDesc] = useState(false);
  const playlistData = { title, desc: description, access_type, playlistId: playlistId };
  return (
    <div className={s.playlistLeftBlock}>
      <div className={s.playlistLeftBlock_flexWrapper}>
        <div className={s.playlistLeftBlock_infoBlock}>
          <div className={s.playlistLeftBlock_imgBlock}>
            <Image
              className={s.playlistLeftBlock_playlistImg}
              src={playlistImg}
              height={250}
              width={250}
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
            <Link href={`/user/${author.username}`}>
              <Image
                className={s.playlistLeftBlock_avatar}
                src={author.avatar || defaultAvatar}
                height={20}
                width={20}
                alt="Аватарка автора"
              />
            </Link>
            <Link href={`/user/${author.username}`}>
              <h3 className={s.playlistLeftBlock_authorName}>{author.username}</h3>
            </Link>
          </div>
          <div className={s.playlistLeftBlock_info}>{`Плейлист • ${accessString(
            access_type,
          )} • ${trackCount} треков • ${secondsToStringTimer(totalDuration)}`}</div>
          <p onClick={() => setShowFullDesc(true)} className={s.playlistLeftBlock_desc}>
            {description}
          </p>
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
      {showFullDesc && (
        <FullDescModal desc={description} closeModal={() => setShowFullDesc(false)} />
      )}
    </div>
  );
};

export default PlaylistLeftBlock;
