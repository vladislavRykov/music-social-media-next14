import React from 'react';
import s from './HiddenBtns.module.scss';

type Props = {
  title: string;
  action: () => void;
};

const RelationHiddenItem = ({ title, action }: Props) => {
  return (
    <li>
      <button onClick={action} className={s.hiddenBtns_item}>
        {title}
      </button>
    </li>
  );
};

export default RelationHiddenItem;
