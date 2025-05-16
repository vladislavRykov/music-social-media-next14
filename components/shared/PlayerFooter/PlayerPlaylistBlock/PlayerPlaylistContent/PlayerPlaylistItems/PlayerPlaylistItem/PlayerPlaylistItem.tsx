import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectMusicitemData } from '@/redux/selectors/playerSelectors';
import { setIsPlaying, setMusicData } from '@/redux/slices/PlayerSlice';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import s from './PlayerPlaylistItem.module.scss';
import cn from 'classnames';
import LoadingSvg from '@/public/circleTube.svg';
import { GrVolume } from 'react-icons/gr';
import { FaPause, FaPlay } from 'react-icons/fa';
import { secondsToStringTimer } from '@/utils/secondToStringTimer';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import AddToPlayList from '@/components/shared/SettingsBtnPopUp/AddToPlayList/AddToPlayList';
import AddToLiked from '@/components/shared/SettingsBtnPopUp/AddToLiked/AddToLiked';
import RemoveFromPlayList from '@/components/shared/SettingsBtnPopUp/RemoveFromPlayList/RemoveFromPlayList';
import { ItemReactionStatus } from '@/types/likeAndDislikes';

interface PlayerPlaylistItemProps {
  _id: string;
  title: string;
  author: string;
  duration: number;
  playlist: string[];
  image: string;
  playlistId: string | null;
  reactionStatus: ItemReactionStatus;
}
const PlayerPlaylistItem: React.FC<PlayerPlaylistItemProps> = ({
  _id,
  author,
  title,
  image,
  playlist,
  duration,
  playlistId,
  reactionStatus,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [reactionType, setReactionType] = useState<ItemReactionStatus>(reactionStatus);
  console.log(reactionType);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const dispatch = useAppDispatch();
  const { selectedAudio, isPlaying, isPlayerLoading } = useAppSelector(selectMusicitemData);
  const router = useRouter();
  const [musicItemLoading, setMusicItemLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isBtnShown, setIsBtnShown] = useState(false);
  const playSong = async () => {
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(true));
    } else {
      if (musicItemLoading) return;
      setMusicItemLoading(true);
      // await dispatch(setMusicData(_id));
      router.replace(`${pathname}?${createQueryString('m', _id.toString())}`);
    }
  };
  useEffect(() => {
    if (!isPlayerLoading) setMusicItemLoading(false);
  }, [isPlayerLoading]);

  const pauseSong = () => {
    if (selectedAudio?._id === _id) {
      if (musicItemLoading) return;
      dispatch(setIsPlaying(false));
    }
  };
  useEffect(() => {
    _id === selectedAudio?._id ? setIsBtnShown(true) : setIsBtnShown(false);
  }, [selectedAudio]);

  return (
    <div
      className={cn(s.playerPlaylistItem, {
        [s.playerPlaylistItem_selected]: selectedAudio?._id === _id,
      })}
      onMouseOut={() => setIsBtnShown(selectedAudio?._id === _id ? true : false)}
      onMouseOver={() => setIsBtnShown(selectedAudio?._id === _id ? false : true)}>
      <div className={s.playerPlaylistItem_textAndImg}>
        <div className={s.playerPlaylistItem_imageBlock}>
          <Image
            className={s.playerPlaylistItem_image}
            src={image}
            alt="song image"
            height={35}
            width={35}
          />
          <div
            // onMouseOut={() => setIsBtnShown(selectedAudio?._id === _id ? true : false)}
            // onMouseOver={() => setIsBtnShown(selectedAudio?._id === _id ? false : true)}
            onClick={selectedAudio?._id === _id && isPlaying ? pauseSong : playSong}
            className={cn(s.playerPlaylistItem_overlay, {
              [s.playerPlaylistItem_overlay_shown]: selectedAudio?._id === _id || isBtnShown,
            })}>
            {selectedAudio?._id === _id && isPlaying ? (
              <div className={s.playerPlaylistItem_play}>
                {musicItemLoading ? (
                  <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
                ) : isBtnShown ? (
                  <GrVolume size={15} />
                ) : (
                  <FaPause size={15} />
                )}
              </div>
            ) : (
              <div className={s.playerPlaylistItem_play}>
                {musicItemLoading ? (
                  <Image src={LoadingSvg} alt="loading..." height={15} width={15} />
                ) : (
                  <FaPlay size={15} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className={s.playerPlaylistItem_textBlock}>
          <h2 className={s.playerPlaylistItem_title}>{title}</h2>
          <span className={s.playerPlaylistItem_author}>{author}</span>
        </div>
      </div>
      <div className={s.playerPlaylistItem_rightBlock}>
        <div className={s.playerPlaylistItem_timer}>{secondsToStringTimer(duration)}</div>
        <div className={s.playerPlaylistItem_settings}>
          <IconBtn
            onClick={() => setIsPopUpOpen(true)}
            className={'s.wrapper'}
            overlayStyles={{ backgroundColor: '#535f82' }}>
            <BsThreeDotsVertical color="#b9b9b9" style={{ fontSize: 18 }} />
          </IconBtn>
        </div>
        {isPopUpOpen && (
          <SettingsBtnPopUp
            styles={{ top: '0', right: '100%' }}
            closePopup={() => setIsPopUpOpen(false)}>
            <AddToPlayList selectedItems={[_id]} />
            <AddToLiked
              reactionType={reactionType}
              setReactionType={(reaction: ItemReactionStatus) => setReactionType(reaction)}
              songId={_id}
              currentSongId={selectedAudio?._id}
              currentSongReaction={selectedAudio?.reactionStatus}
              closePopup={() => setIsPopUpOpen(false)}
            />
            {playlistId && (
              <RemoveFromPlayList
                closePopup={() => setIsPopUpOpen(false)}
                itemsToRemove={[_id]}
                playlistId={playlistId}
              />
            )}
          </SettingsBtnPopUp>
        )}
      </div>
    </div>
  );
};

export default PlayerPlaylistItem;
