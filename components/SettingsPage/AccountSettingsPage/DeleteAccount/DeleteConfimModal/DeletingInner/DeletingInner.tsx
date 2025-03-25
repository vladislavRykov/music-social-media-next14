'use client';
import React, { useState } from 'react';
import s from './DeletingInner.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import circleTube from '@/public/circleTube.svg';
import Image from 'next/image';
import { deleteAccount } from '@/actions/account';
import { toast } from 'react-toastify';
import { useRouter } from 'nextjs-toploader/app';
import { useLoading } from '@/hooks/useFetching';
import { createSelector } from 'reselect';
import { selectLoading, selectUser } from '@/redux/selectors/userSelectors';

const selectedUserData = createSelector([selectLoading, selectUser], (isLoading, user) => ({
  isLoading,
  username: user?.username,
  email: user?.email,
}));

const DeletingInner = () => {
  const { username, email, isLoading } = useAppSelector(selectedUserData);
  const router = useRouter();
  const onClickDeleteBtn = async () => {
    const res = await deleteAccount();
    if (!res.ok) {
      return toast.error(res.message);
    }
    toast.success(res.message);
    router.push('/home');
  };
  const [onClickDeleteBtnF, isDeleting] = useLoading(onClickDeleteBtn, false);
  const confirmSentence = username + '/' + email;
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={s.deletingInner}>
      {isLoading ? (
        <Image src={circleTube} alt="loading..." />
      ) : (
        <div className={s.deletingInner_container}>
          <p className={s.deletingInner_text}>
            Для подтверждения введите{' '}
            <span className={s.deletingInner_confirmText}>"{confirmSentence}"</span> в поле ниже:
          </p>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={s.deletingInner_input}
            placeholder="Введите для подтверждения"
          />
          <button
            onClick={onClickDeleteBtnF}
            className={s.deletingInner_btn}
            disabled={inputValue !== confirmSentence || isDeleting}>
            {isDeleting ? (
              <Image width={20} height={20} src={circleTube} alt="deleting..." />
            ) : (
              'Удалить аккаунт'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletingInner;
