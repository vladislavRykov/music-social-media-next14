'use client';
import React, { useState } from 'react';
import DeletingInner from './DeletingInner/DeletingInner';
import DefaultModal from '@/components/UI/Modals/DefaultModal/DefaultModal';
import InnerConfirm from '@/components/shared/ModalInners/InnerConfirm/InnerConfirm';

type DeleteConfimModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const DeleteConfimModal: React.FC<DeleteConfimModalProps> = ({ isOpen, closeModal }) => {
  const [areYourSure, setAreYourSure] = useState(false);
  return (
    <DefaultModal isOpen={isOpen} closeModal={closeModal}>
      {areYourSure ? (
        <DeletingInner />
      ) : (
        <InnerConfirm
          titleStyles={{ color: 'red' }}
          acceptText="Да, я хочу его удалить"
          declineText="Стоп, я передумал"
          title="Вы точно хотите удалить свой аккаунт?"
          desc="После удаления аккаунта вы уже никак не сможете его восстановить!"
          closeModal={closeModal}
          setAccept={() => setAreYourSure(true)}
        />
      )}
    </DefaultModal>
  );
};

export default DeleteConfimModal;
