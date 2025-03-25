'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import s from './DefaultModal.module.scss';
import { IoClose } from 'react-icons/io5';
import IconBtn from '../../Buttons/IconBtn';
import cn from 'classnames';
import { delay } from '@/utils/delay';

interface DefaultModalProps extends PropsWithChildren {
  isOpen: boolean;
  closeModal: () => void;
}

const DefaultModal: React.FC<DefaultModalProps> = ({ isOpen, children, closeModal }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={cn(s.defaultModal, { [s.defaultModal_open]: animate })} onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(s.defaultModal_container, { [s.defaultModal_container_open]: animate })}>
        <IconBtn onClick={closeModal} className={s.defaultModal_cross}>
          <IoClose size={30} />
        </IconBtn>
        {children}
      </div>
    </div>
  );
};

export default DefaultModal;
