'use client';
import ImgDropBox from '@/components/UI/ImgDropBox/ImgDropBox';
import React, { useState } from 'react';
import mockBanner from '@/public/bannerDefault.jpg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toast } from 'react-toastify';
import { deleteOneImg, uploadOneImg } from '@/actions/files';
import { changeUserFields } from '@/redux/slices/UserSlice';
import { replaceUserBanner } from '@/dal/user';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';
import { storage } from '@/firebase/firebase';
import { createSelector } from 'reselect';
import { selectLoading, selectUser } from '@/redux/selectors/userSelectors';

export const selectedUserData = createSelector([selectLoading, selectUser], (isLoading, user) => ({
  isLoading,
  userBanner: user?.banner,
}));

const UploadBanner = () => {
  const dispatch = useAppDispatch();
  const { userBanner, isLoading } = useAppSelector(selectedUserData);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dropBoxAction = async (file: File | undefined) => {
    if (!file) {
      return toast.error('Нет файла');
    }
    const maxSizeInBytes = 6 * 1024 * 1024; // 6 MB

    if (file.size > maxSizeInBytes) {
      return toast.error('Файл слишком большой');
    }
    try {
      // const formData = new FormData();
      // formData.append('image', file);
      // const uploadRes = await uploadOneImg(formData);
      const imageRef = ref(storage, `images/${createUniqueName(file)}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      const fileUrl = new Promise<StorageError | string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading file: ', error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(imageRef);
            resolve(url);
          },
        );
      });
      const payload = await fileUrl;
      if (payload instanceof StorageError) {
        return toast.error('Ошибка при отправке изображения в хранилище');
      }

      dispatch(changeUserFields({ banner: payload as string }));
      const replaceRes = await replaceUserBanner(payload as string);
      if (!replaceRes.ok) {
        return toast.error(replaceRes.message);
      }
      if (replaceRes.deletedBanerUrl) {
        const deleteRes = await deleteOneImg(replaceRes.deletedBanerUrl);
      }
      return toast.success('Шапка профиля успешно изменена');
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
      return toast.error('Неизвестная ошибка');
    }
  };

  return (
    <ImgDropBox
      progress={uploadProgress}
      isLoading={isLoading}
      imgSizes={{ height: 200, width: 500 }}
      uploadedImg={userBanner || null}
      action={dropBoxAction}
      text={'Перетащи изображение или нажми для загрузки'}
      mockImg={mockBanner}
    />
  );
};

export default UploadBanner;
