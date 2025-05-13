import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import React from 'react';
import s from './DeletePostModal.module.scss';
import cn from 'classnames'

type Props = {
  closeModal: () => void;
  action: () => void;
};

const DeletePostModal = ({ closeModal, action }: Props) => {
  return (
    <SecondaryModal closeModal={closeModal}>
      <div className={s.deletePostInner}>
        <h2 className={s.deletePostInner_title}>Вы точно хотите удалить этот пост?</h2>
        <div className={s.deletePostInner_btnsList}>
          <button onClick={closeModal} className={cn(s.deletePostInner_button,s.deletePostInner_reject)}>Нет, я передумал</button>
          <button onClick={action} className={cn(s.deletePostInner_button,s.deletePostInner_accept)}>Да</button>
        </div>
      </div>
    </SecondaryModal>
  );
};

export default DeletePostModal;
