import React from 'react';
import s from './PostTextarea.module.scss';

const PostTextArea = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
) => {
  return <textarea {...props} className={s.textarea} />;
};

export default PostTextArea;
