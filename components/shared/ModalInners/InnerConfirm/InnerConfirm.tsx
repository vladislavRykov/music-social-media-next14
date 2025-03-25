import React from 'react';
import s from './InnerConfirm.module.scss';

const InnerConfirm = ({
  setAccept,
  closeModal,
  title,
  desc,
  acceptText = 'Да',
  declineText = 'Отмена',
  titleStyles = {},
}: {
  setAccept: () => void;
  closeModal: () => void;
  title: string;
  desc?: string;
  acceptText?: string;
  declineText?: string;
  titleStyles?: React.CSSProperties;
}) => {
  return (
    <div className={s.innerConfirm}>
      <div className={s.innerConfirm_text}>
        <h2 className={s.innerConfirm_title} style={titleStyles}>
          {title}
        </h2>
        {desc && <p className={s.innerConfirm_desc}>{desc}</p>}
      </div>
      <div className={s.innerConfirm_buttons}>
        <button className={s.innerConfirm_accept} onClick={setAccept}>
          {acceptText}
        </button>
        <button className={s.innerConfirm_decline} onClick={closeModal}>
          {declineText}
        </button>
      </div>
    </div>
  );
};

export default InnerConfirm;
