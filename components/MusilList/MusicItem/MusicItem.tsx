import React from 'react';
import s from './MusicItem.module.scss';
import Image, { StaticImageData } from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';

interface MusicItemProps {
  imgSrc: StaticImageData | string;
  title: string;
  author: string;
}

const MusicItem: React.FC<MusicItemProps> = ({ title, author, imgSrc }) => {
  return (
    <div className={s.musicItem}>
      <div className={s.musicItem_imgBlock}>
        <Image className={s.musicItem_img} src={imgSrc} height={190} width={190} alt="music img" />
        <div className={s.musicItem_onHover}>
          <div className={s.playBlock}>
            <FaPlayCircle size={30} className={s.playBlock_img} />
          </div>
        </div>
      </div>
      <div className={s.musicItem_info}>
        <span className={s.musicItem_title}>{title}</span>
        <span className={s.musicItem_author}>{author}</span>
      </div>
    </div>
  );
};

export default MusicItem;
