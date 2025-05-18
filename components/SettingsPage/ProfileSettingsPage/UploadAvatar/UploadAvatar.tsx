'use client';
import ImgDropBox from '@/components/UI/ImgDropBox/ImgDropBox';
import React, { useState } from 'react';
import mockImg from '@/public/avatars/default.jpg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { deleteOneImg, uploadOneImg } from '@/actions/files';
import { toast } from 'react-toastify';
import { changeUserFields } from '@/redux/slices/UserSlice';
import { replaceUserAvatar } from '@/dal/user';
import RingProgressLoader from '@/components/UI/Loaders/RingProgressLoader';
import { createUniqueName } from '@/utils/createUniqueName';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { userSelectedData } from '@/redux/selectors/userSelectors';

const UploadAvatar = () => {
  const dispatch = useAppDispatch();
  const { userAva: userAvatar, isLoading } = useAppSelector(userSelectedData);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dropBoxAction = async (file: File | undefined) => {
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
            setUploadProgress(progress);
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
      dispatch(changeUserFields({ avatar: payload as string }));
      const replaceRes = await replaceUserAvatar(payload as string);
      if (!replaceRes.ok) {
        return toast.error(replaceRes.message);
      }
      if (replaceRes.deletedAvaUrl) {
        const deleteRes = await deleteOneImg(replaceRes.deletedAvaUrl);
      }
      return toast.success('Аватарка успешно изменена');
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      return toast.error('Неизвестная ошибка');
    }

    ////
    // if (!uploadRes.ok) {
    //   return toast.error(uploadRes.message);
    // }
  };
  return (
    <ImgDropBox
      progress={uploadProgress}
      isLoading={isLoading}
      imgSizes={{ height: 200, width: 200 }}
      uploadedImg={userAvatar || null}
      action={dropBoxAction}
      mockImg={mockImg}
      text={'Перетащи изображение или нажми для загрузки'}
    />
  );
};

export default UploadAvatar;
