import React from 'react';
import s from './PostInput.module.scss';

const PostInput = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  return <input {...props} className={s.input} />;
};

export default PostInput;
