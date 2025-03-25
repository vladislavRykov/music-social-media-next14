import React, { useState } from 'react';
import PopupWrapper from '../PopupWrapper';
import s from './SelectedPopup.module.scss';
import { IoMdClose } from 'react-icons/io';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoIosHeartDislike } from "react-icons/io";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Slide, toast, ToastOptions } from 'react-toastify';
import { addItemsToPlaylistAction, removeItemsToPlaylistAction } from '@/actions/playlist';
import PlaylistActionModal from '../../Modals/PlaylistActionModal/PlaylistActionModal';
import SettingsBtnPopUp from '../../SettingsBtnPopUp/SettingsBtnPopUp';
import AddToLiked from '../../SettingsBtnPopUp/AddToLiked/AddToLiked';
import AddToPlayList from '../../SettingsBtnPopUp/AddToPlayList/AddToPlayList';
import RemoveFromPlayList from '../../SettingsBtnPopUp/RemoveFromPlayList/RemoveFromPlayList';

interface SelectedPopupProps {
  closePopup: () => void;
  selectedItems: string[];
  playlistId: string;
  type: string;
}

const toastSettings:ToastOptions ={
  position: 'bottom-left',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'dark',
  transition: Slide,
}

const SelectedPopup: React.FC<SelectedPopupProps> = ({ playlistId, closePopup, selectedItems,type }) => {
  const [openPlaylistsModal, setOpenPlaylistsModal] = useState(false);
  const [openSettingsPopup, setOpenSettingsPopup] = useState(false);
  const removeAction = async () => {
    const res = await removeItemsToPlaylistAction(playlistId, selectedItems);
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
    closePopup();
  };

 
 
  return (
    <>
      <PopupWrapper closeOnClickOutSide={false} className={s.popup} closePopup={closePopup}>
        <div className={s.popup_container}>
          <div className={s.popup_flex}>
            <IoMdClose
              onClick={closePopup}
              size={18}
              color="#fafafa"
              style={{ cursor: 'pointer' }}
            />
            <span>Выбрано {selectedItems.length} объектов</span>
            <IconBtn className={s.popup_btn} onClick={() => setOpenPlaylistsModal(true)}>
              <MdOutlinePlaylistAdd size={18} color="#fafafa" />
            </IconBtn>
            { type!=='favorites' &&  <IconBtn onClick={removeAction} className={s.popup_btn}>
              <FaRegTrashAlt size={18} color="#fafafa" />
               {/* <IoIosHeartDislike size={18} color="#fafafa" /> */}
            </IconBtn>}
            <div style={{ position: 'relative', fontSize: '14px' }}>
              <IconBtn className={s.popup_btn} onClick={() => setOpenSettingsPopup(true)}>
                <BsThreeDotsVertical size={18} color="#fafafa" />
              </IconBtn>
              {openSettingsPopup && (
                <SettingsBtnPopUp
                  styles={{ bottom: '100%', left: '0' }}
                  closePopup={() => setOpenSettingsPopup(false)}>
                  {/* <AddToLiked songId={}/> */}
                  <AddToPlayList selectedItems={selectedItems} />
                  {type!=='favorites'&&<RemoveFromPlayList
                    closePopup={() => setOpenSettingsPopup(false)}
                    playlistId={playlistId}
                    itemsToRemove={selectedItems}
                  />}
                </SettingsBtnPopUp>
              )}
            </div>
          </div>
        </div>
      </PopupWrapper>
      {openPlaylistsModal && (
        <PlaylistActionModal
          selectedItems={selectedItems}
          closeModal={() => setOpenPlaylistsModal(false)}
        />
      )}
    </>
  );
};

export default SelectedPopup;
