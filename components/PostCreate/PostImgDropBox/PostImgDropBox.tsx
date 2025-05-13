'use client';
import React, { useEffect, useState } from 'react';
import s from './PostImgDropBox.module.scss';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';
import { BsUpload } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';

type Props = {
  setPostImgFile: (file: File | null) => void;
  postImgFile: File|null
};

const PostImgDropBox = ({ postImgFile,setPostImgFile }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(()=>{
    if(!postImgFile)setPreviewUrl(null)
  },[postImgFile])
  const onChangeHandlerF: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setPostImgFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      typeof reader.result === 'string' && setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
    if (!file) {
      return toast.error('Нет файла');
    }
  };
  return (
    <div className={s.postImgDropBox}>
      {!previewUrl ? (
        <div className={s.postImgDropBox_inputWrapper}>
          <input
            type="file"
            multiple={false}
            accept="image/png, image/jpeg"
            className={s.postImgDropBox_input}
            onChange={onChangeHandlerF}
          />
          <div className={s.postImgDropBox_dropboxText}>
            <BsUpload size={31} className={s.postImgDropBox_dropboxIcon} />
            <span>Добавить фото</span>
          </div>
        </div>
      ) : (
        <div className={s.postImgDropBox_preview}>
          <Image className={s.postImgDropBox_previewImg} src={previewUrl} alt="Preview" fill />
          <IoIosClose
            size={22}
            onClick={() => {
                setPreviewUrl(null)
                setPostImgFile(null)
            }}
            className={s.postImgDropBox_removeImage}
          />
        </div>
      )}
    </div>
  );
};

export default PostImgDropBox;
