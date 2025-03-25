import IconBtn from '@/components/UI/Buttons/IconBtn';
import React, { useEffect, useState } from 'react';
import s from './PlaylistLeftBlockControls.module.scss';
import { MdOutlineEdit } from 'react-icons/md';
import { setIsPlaying } from '@/redux/slices/PlayerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GrVolume } from 'react-icons/gr';
import { BsShuffle } from "react-icons/bs";
import { FaPause, FaPlay } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import LoadingSvg from '@/public/circleTube.svg';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import DeletePlaylist from '@/components/shared/SettingsBtnPopUp/DeletePlaylist/DeletePlaylist';
import EditPlaylistModal from '@/components/shared/Modals/EditPlaylistModal/EditPlaylistModal';
import { AccessType, Overwrite } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { MusicData, UserDataMongoose } from '@/types/types';
import ShufflePlaylist from '@/components/shared/SettingsBtnPopUp/ShufflePlaylist/ShufflePlaylist';

type Props = {
  playlistId: string;
  firstSongId: string;
  isAuthor: boolean;
  type: string;
  playlistData: {
    playlistId: string;
    title: string;
    desc: string;
    access_type: AccessType;
  };
  likesAndDislikes: {
    likes: string[];
    dislikes: string[];
} | null;
  updatePlaylistData: () => Promise<{
    likesAndDislikes: {
        likes: string[];
        dislikes: string[];
    } | null | undefined;
    playlist: Overwrite<PlaylistData, {
        userId: UserDataMongoose;
        items: MusicData[];
    }> | null;
} | null>;
};

const PlaylistLeftBlockControls: React.FC<Props> = ({
  isAuthor,
  playlistId,
  firstSongId,
  playlistData,
  updatePlaylistData,
  type
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { musicData, playlist, isPlayerLoading, isPlaying } = useAppSelector(selectPlayerPlaylist);
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const playSong: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    if (playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      // await dispatch(setMusicData(allItems[0]));
      // dispatch(setPlaylist({ _id: playlistId, items: allItems }));
      router.push(`/player/playlist?m=${firstSongId}&list=${playlistId}`);
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    }
  };
  return (
    <>
      <div className={s.playlistLeftBlockControls}>
        {isAuthor && type!=='favorites' ? (
          <IconBtn
            onClick={() => setIsEditOpen(true)}
            className={s.playlistLeftBlockControls_btn}
            overlayStyles={{ backgroundColor: '#c6c6c6' }}>
            <MdOutlineEdit color="#fafafa"size={22} />
          </IconBtn>
        ):
          <IconBtn
            onClick={()=> router.push(`/player/playlist?list=${playlistId}&shuffled=true`)}
            className={s.playlistLeftBlockControls_btn}
            overlayStyles={{ backgroundColor: '#c6c6c6' }}>
            <BsShuffle color="#fafafa"size={22} />
          </IconBtn>
        
        }

        {playlist?._id === playlistId && isPlaying ? (
          <div className={s.playlistLeftBlockControls_play} onClick={pauseSong}>
            {musicItemLoading ? (
              <Image src={LoadingSvg} alt="loading..." height={20} width={20} />
            ) : (
              <FaPause size={20} />
            )}
          </div>
        ) : (
          <div className={s.playlistLeftBlockControls_play} onClick={playSong}>
            {musicItemLoading ? (
              <Image src={LoadingSvg} alt="loading..." height={20} width={20} />
            ) : (
              <FaPlay size={20} />
            )}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <IconBtn
            onClick={() => setIsPopUpOpen(true)}
            className={s.playlistLeftBlockControls_btn}
            overlayStyles={{ backgroundColor: '#c6c6c6' }}>
            <BsThreeDotsVertical color="#fafafa" size={22} />
          </IconBtn>
          {isPopUpOpen && (
            <SettingsBtnPopUp
              styles={{ left: '0', bottom: '100%' }}
              closePopup={() => setIsPopUpOpen(false)}>
                <ShufflePlaylist playlistId={playlistId}/>
              {playlistId &&  type!=='favorites'  && (
                <DeletePlaylist closePopup={() => setIsPopUpOpen(false)} playlistId={playlistId} />
              )}
            </SettingsBtnPopUp>
          )}
        </div>
      </div>
      {isEditOpen && (
        <EditPlaylistModal
          updatePlaylistData={updatePlaylistData}
          playlistData={playlistData}
          closeModal={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default PlaylistLeftBlockControls;
