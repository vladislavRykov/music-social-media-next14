import React from 'react';
import s from './PostTextarea.module.scss';

interface PostTextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const PostTextArea = React.forwardRef<HTMLTextAreaElement | null, PostTextAreaProps>(
  (props, ref) => {
    return <textarea {...props} ref={ref} className={s.textarea} />;
  },
);

export default PostTextArea;
