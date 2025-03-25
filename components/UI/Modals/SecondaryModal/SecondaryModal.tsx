'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import s from './SecondaryModal.module.scss';
import { IoClose } from 'react-icons/io5';
import IconBtn from '../../Buttons/IconBtn';
import cn from 'classnames';

interface SecondaryModalProps extends PropsWithChildren {
  closeModal: () => void;
}

const SecondaryModal: React.FC<SecondaryModalProps> = ({ children, closeModal }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={cn(s.secondaryModal, { [s.secondaryModal_open]: animate })}
      onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(s.secondaryModal_container, { [s.secondaryModal_container_open]: animate })}>
        {children}
      </div>
    </div>
  );
};

export default SecondaryModal;
