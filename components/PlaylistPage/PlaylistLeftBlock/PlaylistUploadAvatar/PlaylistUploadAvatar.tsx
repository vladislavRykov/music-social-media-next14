'use client';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import s from './PlaylistUploadAvatar.module.scss';
import { MdOutlineModeEdit } from 'react-icons/md';
import SettingsBtnPopUp from '@/components/shared/SettingsBtnPopUp/SettingsBtnPopUp';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';
import { storage } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { replacePlaylistImg } from '@/actions/playlist';
import { deleteOneImg } from '@/actions/files';
import { PlaylistData } from '@/types/playlistTypes';
import { Overwrite } from '@/types/common';
import { MusicData, UserDataMongoose } from '@/types/types';
import UploadPlaylistImg from '@/components/shared/SettingsBtnPopUp/UploadPlaylistImg/UploadPlaylistImg';
import DeletePlaylistImg from '@/components/shared/SettingsBtnPopUp/DeletePlaylistImg/DeletePlaylistImg';

type Props = {
  isPlaylistHasImg: boolean;
  playlistId: string;
  updatePlaylistData: () => void;
};

const PlaylistUploadAvatar: React.FC<Props> = ({
  isPlaylistHasImg,
  playlistId,
  updatePlaylistData,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadClick = () => {
    if (isPlaylistHasImg) return setIsPopupOpen(true);
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const uploadPlaylistImg: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return toast.error('Нет файла');
    }
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB

    if (file.size > maxSizeInBytes) {
      return toast.error('Файл слишком большой');
    }
    // const formData = new FormData();
    // formData.append('image', file);
    /////
    // const file = formData.get('image') as File;
    try {
      const imageRef = ref(storage, `images/${createUniqueName(file)}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      const fileUrl = new Promise<StorageError | string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error uploading file: ', error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(imageRef);
            console.log('File uploaded successfully: ' + url);
            resolve(url);
          },
        );
      });
      const payload = await fileUrl;
      if (payload instanceof StorageError) {
        return toast.error('Ошибка при отправке изображения в хранилище');
      }
      //   dispatch(changeUserFields({ avatar: payload as string }));
      const replaceRes = await replacePlaylistImg(playlistId, payload as string);
      if (!replaceRes.ok) {
        return toast.error(replaceRes.message);
      }
      if (replaceRes.deletedPlaylistImgUrl) {
        const deleteRes = await deleteOneImg(replaceRes.deletedPlaylistImgUrl);
      }
      toast.success('Изображение плейлиста успешно изменена');
      updatePlaylistData();
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      return toast.error('Неизвестная ошибка');
    }
  };

  return (
    <div className={s.playlistUploadAvatar}>
      <div style={{ position: 'relative' }}>
        <div onClick={handleUploadClick} className={s.playlistUploadAvatar_uploadImg}>
          <MdOutlineModeEdit />
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          accept="image/png, image/jpeg"
          className={s.playlistUploadAvatar_input}
          onChange={uploadPlaylistImg}
        />
        {isPopupOpen && (
          <SettingsBtnPopUp
            styles={{ top: '100%', left: '0' }}
            closePopup={() => setIsPopupOpen(false)}>
            <UploadPlaylistImg
              playlistId={playlistId}
              closePopup={() => {
                updatePlaylistData();
                setIsPopupOpen(false);
              }}
            />
            <DeletePlaylistImg
              playlistId={playlistId}
              closePopup={() => {
                updatePlaylistData();
                setIsPopupOpen(false);
              }}
            />
          </SettingsBtnPopUp>
        )}
      </div>
    </div>
  );
};

export default PlaylistUploadAvatar;
