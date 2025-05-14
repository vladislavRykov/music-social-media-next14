'use client';
import React, { useState } from 'react';
import s from './PlayerSettings.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAppDispatch } from '@/hooks/reduxHooks';
import songMockImg from '@/public/music/fleeting-words-nier-rep.jpg';
import { clearPlayer, setAudio, setMusicData } from '@/redux/slices/PlayerSlice';
import AddToLiked from '../../SettingsBtnPopUp/AddToLiked/AddToLiked';
import AddToPlayList from '../../SettingsBtnPopUp/AddToPlayList/AddToPlayList';
import SettingsBtnPopUp from '../../SettingsBtnPopUp/SettingsBtnPopUp';
import RemoveFromPlayList from '../../SettingsBtnPopUp/RemoveFromPlayList/RemoveFromPlayList';
import ClosePlayer from '../../SettingsBtnPopUp/ClosePlayer/ClosePlayer';
import { ItemReactionStatus } from '@/types/likeAndDislikes';

type PlayerSettingsProps = {
  playlistId: string | null;
  musicId: string;
  isOpen: boolean | undefined;
  playlistType: string | null;
  reactionType: ItemReactionStatus
  currentSongReaction: ItemReactionStatus
};

const PlayerSettings: React.FC<PlayerSettingsProps> = ({
  playlistId,
  musicId,
  isOpen,
  playlistType,
  reactionType,
  currentSongReaction,

}) => {
  // const dispatch = useAppDispatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const onClick = async () => {
    setIsPopUpOpen(true);
  };
  return (
    <div style={{ position: 'relative' }}>
      <IconBtn
        onClick={onClick}
        className={s.wrapper}
        overlayStyles={{ backgroundColor: '#535f82' }}>
        <BsThreeDotsVertical color="#b9b9b9" style={{ fontSize: 18 }} />
      </IconBtn>
      {isPopUpOpen && (
        <SettingsBtnPopUp
          styles={{
            bottom: 'calc(100% + 10px)',
            left: 0,
          }}
          closePopup={() => setIsPopUpOpen(false)}>
          <AddToPlayList selectedItems={[musicId]} />
          <AddToLiked reactionType={reactionType} currentSongReaction={currentSongReaction} closePopup={() => setIsPopUpOpen(false)} songId={musicId} currentSongId={musicId} />
          {playlistId && playlistType !== 'favorites' && (
            <RemoveFromPlayList
              closePopup={() => {
                setIsPopUpOpen(false);
              }}
              playlistId={playlistId}
              itemsToRemove={[musicId]}
            />
          )}
          <ClosePlayer isOpen={isOpen} />
        </SettingsBtnPopUp>
      )}
    </div>
  );
};

export default PlayerSettings;
