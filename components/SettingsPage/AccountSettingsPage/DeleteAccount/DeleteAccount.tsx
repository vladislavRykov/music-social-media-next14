'use client';
import React, { useState } from 'react';
import s from './DeleteAccount.module.scss';
import DeleteConfimModal from './DeleteConfimModal/DeleteConfimModal';

const DeleteAccount = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  return (
    <>
      <button className={s.deletebtn} onClick={() => setOpenConfirmModal(true)}>
        Удалить аккаунт
      </button>
      {openConfirmModal && (
        <DeleteConfimModal
          isOpen={openConfirmModal}
          closeModal={() => setOpenConfirmModal(false)}
        />
      )}
    </>
  );
};

export default DeleteAccount;
