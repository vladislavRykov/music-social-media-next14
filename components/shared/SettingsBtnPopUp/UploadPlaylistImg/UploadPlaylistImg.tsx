import React, { ChangeEventHandler, useRef } from 'react'
import DeafultItem from '../DeafultItem/DeafultItem';
import { LiaImage } from "react-icons/lia";
import { toast } from 'react-toastify';
import { deleteOneImg } from '@/actions/files';
import { replacePlaylistImg } from '@/actions/playlist';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/firebase';
import { createUniqueName } from '@/utils/createUniqueName';

const UploadPlaylistImg = ({playlistId,closePopup}: {
    playlistId: string;
    closePopup: () => void;
  }) => {

const inputRef = useRef<HTMLInputElement|null>(null)
 const handleUploadClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      };
const uploadPlaylistImg :ChangeEventHandler<HTMLInputElement>= async(e)=>{
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
              const replaceRes = await replacePlaylistImg(playlistId,payload as string);
              if (!replaceRes.ok) {
                return toast.error(replaceRes.message);
              }
              if (replaceRes.deletedPlaylistImgUrl) {
                const deleteRes = await deleteOneImg(replaceRes.deletedPlaylistImgUrl);
              }
              toast.success('Изображение плейлиста успешно изменена');
                closePopup()

            } catch (error) {
              if (error instanceof Error) {
                return toast.error(error.message);
              }
              return toast.error('Неизвестная ошибка');
            }
        
        
}
    return (
        <>
      <DeafultItem title="Загрузить новое изображение" Icon={LiaImage} action={handleUploadClick} />
        <input    ref={inputRef}
              type="file"
              multiple={false}
              accept="image/png, image/jpeg"
              style={{display:'none'}}
              onChange={uploadPlaylistImg}
            />
        </>
     
         
      );
}

export default UploadPlaylistImg