import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import React from 'react';
import s from './FullDescModal.module.scss';
import IconBtn from '@/components/UI/Buttons/IconBtn';
import { IoClose } from 'react-icons/io5';

type Props = {
  closeModal: () => void;
  desc: string;
};

const FullDescModal = ({ closeModal, desc }: Props) => {
  return (
    <SecondaryModal closeModal={closeModal}>
      <div className={s.fullDescModal}>
        <div className={s.fullDescModal_header}>
          <h2 className={s.fullDescModal_title}>Описание плейлиста</h2>
          <div className={s.fullDescModal_closeBtnWrapper}>
            <IconBtn onClick={closeModal}>
              <IoClose size={20} color='#fff'/>
            </IconBtn>
          </div>
        </div>
        <p className={s.fullDescModal_desc}> {desc}</p>
      </div>
    </SecondaryModal>
  );
};

export default FullDescModal;
