import React, { useEffect, useState } from 'react';
import MockImg from '@/public/musicImg.jpg';
import s from './InnerPlaylistItems.module.scss';
import InnerPlaylistItem from './InnerPlaylistItem/InnerPlaylistItem';

import { getAllUserPlaylist } from '@/actions/playlist';
import { toast } from 'react-toastify';
import { useLoading } from '@/hooks/useFetching';
import LoadingSvg from '@/public/circleTube.svg';
import Image from 'next/image';
import { PlaylistData } from '@/types/playlistTypes';

const lists = [
  {
    title: 'Новый плейлист',
    img: MockImg,
    trackCount: 120,
  },
  {
    title: 'Новый плейлист2',
    img: MockImg,
    trackCount: 50,
  },
  {
    title: 'Новый плейлист3',
    img: MockImg,
    trackCount: 65,
  },
];

const InnerPlaylistItems = ({
  selectedItems,
  closeModal,
}: {
  selectedItems: string[];
  closeModal: () => void;
}) => {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [getAllUserPlaylistF, isLoading] = useLoading(() =>
    getAllUserPlaylist([
      {
        path: 'userId',
        select: 'username', // Выбираем только name и email
      },
      {
        path: 'items',
        select: 'image', // Выбираем только name и email
      },
    ]),
  );
  useEffect(() => {
    const getData = async () => {
      const res = await getAllUserPlaylistF();
      if (!res.ok) return toast.error(res.message);
      const filteredPlaylist = (res.data as PlaylistData[]).filter(playlist=>playlist.type!=='favorites')
      setPlaylists(filteredPlaylist);
    };
    getData();
  }, []);
  return (
    <div className={s.innerPlaylistItems}>
      <h2 className={s.innerPlaylistItems_title}>Все плейлисты</h2>
      <div className={s.innerPlaylistItems_playlists}>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Image src={LoadingSvg} alt="Loading..." width={100} height={100} />
          </div>
        ) : (
          playlists.map((item) => (
            <InnerPlaylistItem
              closeModal={closeModal}
              _id={item._id}
              selectedItems={selectedItems}
              key={item._id}
              img={MockImg}
              title={item.title}
              trackCount={item.items.length}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InnerPlaylistItems;
