'use client';
import React, { useEffect, useState } from 'react';
import s from './ImgDropBox.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useLoading } from '@/hooks/useFetching';
import RingProgressLoader from '../Loaders/RingProgressLoader';

interface DropBoxProps {
  text: string;
  mockImg: StaticImageData;
  action: (file: File | undefined) => Promise<any>;
  uploadedImg: string | null;
  imgSizes: { height: number; width: number };
  isLoading: boolean;
  progress: number;
}

const ImgDropBox: React.FC<DropBoxProps> = ({
  text,
  mockImg,
  action,
  uploadedImg,
  imgSizes,
  isLoading,
  progress,
}) => {
  const [defaultImg, setDefaultImg] = useState<null | StaticImageData>(null);
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    await action(file);
  };
  const [onChangeHandlerF, isLoadingF] = useLoading(onChangeHandler, false);

  return (
    <div className={s.wrapper}>
      <div className={s.dropBox}>
        <input
          type="file"
          multiple={false}
          accept="image/png, image/jpeg"
          className={s.dropBox_input}
          onChange={onChangeHandlerF}
        />
        <p className={s.dropBox_text}>{!isLoadingF ? text : 'Загружается...'}</p>
      </div>
      {isLoadingF ? (
        <RingProgressLoader width={imgSizes.width} height={imgSizes.height} progress={progress} />
      ) : (
        <Image
          className={s.uploadedImg}
          height={imgSizes.height}
          width={imgSizes.width}
          src={isLoading ? '/loader1.gif' : defaultImg || uploadedImg || mockImg}
          alt="uploaded img"
          placeholder="blur"
          blurDataURL={'/loader1.gif'}
          onError={() => setDefaultImg(mockImg)}
        />
      )}
    </div>
  );
};

export default ImgDropBox;
