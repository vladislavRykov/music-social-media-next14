'use client';
import React, { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import s from './AboutMe.module.scss';
import { setAboutMe } from '@/dal/user';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/reduxHooks';

const AboutMe = () => {
  const about = useAppSelector((state) => state.userReducer.user?.aboutMe);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (about) {
      setText(about);
    }
  }, [about]);
  useEffect(() => {
    adjustHeight();
  }, [textAreaRef.current]);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight > 300 ? '300px' : textAreaRef.current.scrollHeight + 'px';
    }
  };
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

  const onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
    setIsEdited(true);
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight > 300 ? '300px' : e.target.scrollHeight + 'px';
  };

  return (
    <div className={s.aboutMe}>
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={onTextAreaChange}
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
