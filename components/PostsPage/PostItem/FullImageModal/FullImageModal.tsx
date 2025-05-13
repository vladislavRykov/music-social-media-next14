import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import Image from 'next/image';
import React from 'react';
import s from './FullImageModal.module.scss';

type FullImageModalProps = {
  closeModal: () => void;
  imgSrc: string;
};

const FullImageModal = ({ closeModal, imgSrc }: FullImageModalProps) => {
  return (
    <SecondaryModal closeModal={closeModal} >
      <div className={s.fullImageModal} onClick={closeModal}>
        <Image
          blurDataURL="/background/lightModeImgPlaceholder.svg"
          placeholder="blur"
          className={s.fullImageModal_image}
          src={imgSrc}
          fill
          alt="full post img"
        />
      </div>
    </SecondaryModal>
  );
};

export default FullImageModal;
