import React from 'react';
import s from './PlayerData.module.scss';
import Image, { StaticImageData } from 'next/image';
import { formatNumber, viewsFormat } from '@/utils/formatNumber';

interface PlayerDataProps {
  author: string;
  title: string;
  image: StaticImageData | string;
  viewsCount: number;
  likes: number;
}

const PlayerData: React.FC<PlayerDataProps> = ({ author, title, image, viewsCount, likes }) => {
  return (
    <div className={s.playerData}>
      <Image className={s.playerData_image} src={image} alt="song img" height={50} width={50} />
      <div className={s.playerData_infoBlock}>
        <h2 className={s.playerData_title}>{title}</h2>
        <div className={s.playerData_bottomInfo}>
          <span className={s.playerData_author}>{author} &bull; </span>
          <span className={s.playerData_viewsCount}>{viewsFormat(viewsCount)} просмотров &bull; </span>
          <span className={s.playerData_likes}>Нравиться: {viewsFormat(likes)}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerData;
