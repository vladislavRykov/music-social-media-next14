'use client';
import React, { CSSProperties, useEffect, useState } from 'react';
import s from './PlaylistPage.module.scss';
import PlaylistLeftBlock from '@/components/PlaylistPage/PlaylistLeftBlock/PlaylistLeftBlock';
import PlaylistItemsBlock from '@/components/PlaylistPage/PlaylistItemsBlock/PlaylistItemsBlock';
import { getPlaylistById } from '@/dal/playlist';
import { useSearchParams } from 'next/navigation';
import { AccessType, Overwrite } from '@/types/common';
import { useAsync } from '@/hooks/useFetching';
import { PlaylistData, UserPlaylistData } from '@/types/playlistTypes';
import { MusicData, UserDataMongoose } from '@/types/types';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectUser } from '@/redux/selectors/userSelectors';
import mockPlaylistAva from '@/public/musicImg.jpg';
import { getAllUserLikeAndDislikeAction } from '@/actions/likesAndDislikes';

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const currentUser = useAppSelector(selectUser);

  const list = searchParams?.get('list');
  const asyncFunction = async () => {
    if (!list || list==='LM') return null
      const res =currentUser?._id ? await getAllUserLikeAndDislikeAction(currentUser?._id):null
      console.log(155,res)
      const playlist= await getPlaylistById<
      Overwrite<PlaylistData, { userId: UserDataMongoose; items: MusicData[] }>
      >(list, ['userId', 'items']);
      return {likesAndDislikes: res?.data,playlist}
  };
  const { execute, data, error, status } = useAsync(asyncFunction, [list,currentUser?._id]);
  console.log(1552,data?.likesAndDislikes)
  const isAuthor = currentUser?._id === data?.playlist?.userId._id;

  const backgroundImageStyle: CSSProperties = {
    backgroundImage: `url(${data?.playlist?.items[0]?.image})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '300px',
    filter: 'blur(30px)',
  };

  const isPlaylistEmpty = data?.playlist?.items.length === 0;
  return (
    <div className={s.playlistPage}>
      {/* <Image
        src={playlist?.items[0].image || ''}
        style={{ zIndex: 1, filter: 'blur(30px)', position: 'fixed' }}
        alt="img"
      /> */}
      <div style={backgroundImageStyle}></div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          backgroundColor: '#030303b5',
          filter: 'blur(30px)',
        }}></div>
      {status === 'success' && data?.playlist && data?.likesAndDislikes ? (
        <>
          <PlaylistLeftBlock
          isPlaylistHasImg={!!data.playlist.playlistImg}
            isPlaylistEmpty={isPlaylistEmpty}
            isAuthor={isAuthor}
            firstSongId={data?.playlist.items[0]?._id}
            playlistId={data?.playlist._id}
            author={{
              username: data?.playlist.userId.username,
              avatar: data?.playlist.userId.avatar || '',
            }}
            type={data?.playlist.type}
            title={data?.playlist.title}
            playlistImg={data.playlist.playlistImg || data?.playlist.items[0]?.image || mockPlaylistAva}
            description={data?.playlist.description}
            trackCount={data?.playlist.items.length}
            totalDuration={data?.playlist.items.reduce((acc, prev) => acc + prev.duration, 0)}
            access_type={data?.playlist.access_type as AccessType}
            createdAt={data?.playlist.createdAt}
            updatePlaylistData={execute}
            likesAndDislikes={data.likesAndDislikes ||null}
          />
          <PlaylistItemsBlock
        type={data?.playlist.type}
            isPlaylistEmpty={isPlaylistEmpty}
            isAuthor={isAuthor}
            updatePlaylist={execute}
            playlistId={data?.playlist._id}
            playlistItems={data?.playlist.items}
            likesAndDislikes={data.likesAndDislikes ||null}
        
          />
        </>
      ) : (
        <>загрузка</>
      )}
    </div>
  );
};

export default PlaylistPage;
