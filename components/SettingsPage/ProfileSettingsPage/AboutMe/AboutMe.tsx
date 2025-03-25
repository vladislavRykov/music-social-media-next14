'use client';
import React, { useActionState, useEffect, useState, useTransition } from 'react';
import s from './AboutMe.module.scss';
import { setAboutMe } from '@/dal/user';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/reduxHooks';

const AboutMe = () => {
  const about = useAppSelector((state) => state.userReducer.user?.aboutMe);
  useEffect(() => {
    if (about) setText(about);
  }, [about]);
  const [text, setText] = useState(about || '');
  const [isPending, startTransition] = useTransition();
  const [isEdited, setIsEdited] = useState(false);
  const fun = async () => {
    const res = await setAboutMe(text);
    if (!res.ok) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
    setIsEdited(false);
    return;
  };
  return (
    <div className={s.aboutMe}>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setIsEdited(true);
        }}
        rows={1}
        className={s.aboutMe_textarea}
        placeholder="Немного о себе"
      />
      {isEdited && (
        <button className={s.aboutMe_btn} onClick={() => startTransition(fun)}>
          Сохранить
        </button>
      )}
    </div>
  );
};

export default AboutMe;
