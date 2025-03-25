import Image, { StaticImageData } from 'next/image';
import s from './InnerPlaylistItem.module.scss';
import React from 'react';
import { addItemsToPlaylistAction } from '@/actions/playlist';
import { Slide, toast } from 'react-toastify';

type InnerPlaylistItem = {
  _id: string;
  title: string;
  img: string | StaticImageData;
  trackCount: number;
  selectedItems: string[];
  closeModal: () => void;
};

const InnerPlaylistItem: React.FC<InnerPlaylistItem> = ({
  _id,
  title,
  img,
  trackCount,
  closeModal,
  selectedItems,
}) => {
  const addToPlaylist = async () => {
    const res = await addItemsToPlaylistAction(_id, selectedItems);
    if (!res.ok) toast.error(res.message);
    else
      toast.info(res.message, {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    closeModal();
  };
  return (
    <div className={s.innerPlaylistItem} onClick={addToPlaylist}>
      <Image className={s.innerPlaylistItem_image} src={img} alt="img" height={50} width={50} />
      <div className={s.innerPlaylistItem_infoBlock}>
        <h2 className={s.innerPlaylistItem_title}>{title}</h2>
        <p className={s.innerPlaylistItem_trackCount}>{trackCount} треков</p>
      </div>
    </div>
  );
};

export default InnerPlaylistItem;
