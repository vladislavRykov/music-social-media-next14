import React, { useEffect, useState } from 'react';
import s from './PlaylistItem.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMusicitemData, selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { setIsPlaying, setMusicData, setPlaylistItems } from '@/redux/slices/PlayerSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GrVolume } from 'react-icons/gr';
import { FaPause, FaPlay } from 'react-icons/fa';
import LoadingSvg from '@/public/circleTube.svg';
import cn from 'classnames';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import PlaylistItemBtns from './PlaylistItemBtns/PlaylistItemsBtns';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import AddToPlayList from '@/components/shared/SettingsBtnPopUp/AddToPlayList/AddToPlayList';
import AddToLiked from '@/components/shared/SettingsBtnPopUp/AddToLiked/AddToLiked';
import RemoveFromPlayList from '@/components/shared/SettingsBtnPopUp/RemoveFromPlayList/RemoveFromPlayList';
import { Overwrite } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { MusicData, UserDataMongoose } from '@/types/types';
import { ItemReactionStatus } from '@/types/likeAndDislikes';

type PlaylistItemProps = {
  id: string;
  musicImg: string;
  title: string;
  author: string;
  duration: number;
  playlistId: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  isSelected: boolean;
  selectionMode: boolean;
  isAuthor: boolean;
  reactionStatus: ItemReactionStatus;
  updatePlaylist: () => void;
  type: string;
};

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  id,
  musicImg,
  title,
  author,
  duration,
  playlistId,
  isSelected,
  setSelectedItems,
  selectionMode,
  updatePlaylist,
  isAuthor,
  type,
  reactionStatus,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    musicData: selectedAudio,
    playlist,
    isPlaying,
    isPlayerLoading,
  } = useAppSelector(selectPlayerPlaylist);
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [blockPosition, setBlockPosition] = useState<{ x: string; y: string }>({ x: '0', y: '0' });
  const playSong = async () => {
    if (selectedAudio?._id === id && playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      router.push(`/player/playlist?m=${id}&list=${playlistId}`);
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong = () => {
    if (selectedAudio?._id === id && playlist._id === playlistId) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      router.push(`/player/playlist?m=${id}&list=${playlistId}`);
    }
  };
  useEffect(() => {
    id === selectedAudio?._id ? setIsBtnShown(true) : setIsBtnShown(false);
  }, [selectedAudio]);
  const onCheckInput = () => {
    if (isSelected) {
      setSelectedItems((prev) => prev.filter((songId) => songId !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };
  return (
    <>
      <div className={cn(s.playlistItem)}>
        {selectionMode && (
          <div
            onClick={selectionMode ? onCheckInput : undefined}
            className={cn(s.playlistItem_selectMode, {
              [s.playlistItem_selectMode_selected]: isSelected,
            })}></div>
        )}
        <div className={s.playlistItem_imageBlock}>
          <Image
            className={s.playlistItem_image}
            src={musicImg}
            alt="song image"
            height={55}
            width={55}
          />
          <div
            onMouseOut={() => setIsBtnShown(selectedAudio?._id === id ? true : false)}
            onMouseOver={() => setIsBtnShown(selectedAudio?._id === id ? false : true)}
            onClick={selectedAudio?._id === id && isPlaying ? pauseSong : playSong}
            className={cn(s.playlistItem_overlay, {
              [s.playlistItem_overlay_shown]: selectedAudio?._id === id || isBtnShown,
            })}>
            {selectedAudio?._id === id && isPlaying ? (
              <div className={s.playlistItem_play}>
                {musicItemLoading ? (
                  <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
                ) : isBtnShown ? (
                  <GrVolume size={15} />
                ) : (
                  <FaPause size={15} />
                )}
              </div>
            ) : (
              <div className={s.playlistItem_play}>
                {musicItemLoading ? (
                  <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
                ) : (
                  <FaPlay size={15} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className={s.playlistItem_infoBlock}>
          <div className={s.playlistItem_songInfo}>
            <h2 className={s.playlistItem_title}>{title}</h2>
            <span className={s.playlistItem_author}>{author}</span>
          </div>
          <div></div>
          <div
            className={s.playlistItem_duration}
            // style={{ display: 'none' }}
            style={selectionMode ? { display: 'none' } : {}}>
            <span className={s.playlistItem_viewsCount}>{secondsToStringTimer(duration)}</span>
          </div>
          <div
            className={s.playlistItem_controls}
            // style={{ display: 'block' }}
            style={selectionMode ? { display: 'block' } : {}}>
            <PlaylistItemBtns
              reactionStatus={reactionStatus}
              setBlockPosition={setBlockPosition}
              setIsPopUpOpen={setIsPopUpOpen}
              selectionMode={selectionMode}
              songId={id}
              isSelected={isSelected}
              onCheckInput={onCheckInput}
              currentSongReactionStatus={selectedAudio?.reactionStatus || null}
              currentSongId={selectedAudio?._id || null}
            />
          </div>
        </div>
      </div>
      {isPopUpOpen && (
        <SettingsBtnPopUp
          styles={{
            left: blockPosition.x,
            top: blockPosition.y,
            position: 'fixed',
            zIndex: 1000,
          }}
          closePopup={() => setIsPopUpOpen(false)}>
          <AddToPlayList selectedItems={[id]} />
          {/* <AddToLiked songId={id}   closePopup={() => setIsPopUpOpen(false)}/> */}
          {/* исправить */}
          {isAuthor && type !== 'favorites' && (
            <RemoveFromPlayList
              closePopup={() => {
                updatePlaylist();
                setIsPopUpOpen(false);
              }}
              playlistId={playlistId}
              itemsToRemove={[id]}
            />
          )}
        </SettingsBtnPopUp>
      )}
    </>
  );
};

export default PlaylistItem;
