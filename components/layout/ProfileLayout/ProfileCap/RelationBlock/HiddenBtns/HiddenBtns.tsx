import React from 'react';
import s from './HiddenBtns.module.scss';
import PopupWrapper from '@/components/shared/Popups/PopupWrapper';
import { RelationMongooseT, RelationStatus } from '@/types/relationT';

type Props = {
  userRelation: RelationMongooseT | null;
  closePopup: () => void;
};

const HiddenBtns = ({ closePopup, userRelation }: Props) => {
  return (
    <PopupWrapper closePopup={closePopup} className={s.wrapper}>
      <ul className={s.hiddenBtns}>
        {userRelation?.status !== RelationStatus.Blocked && (
          <li className={s.hiddenBtns_item}>Заблокировать</li>
        )}
        {userRelation?.status === RelationStatus.Blocked && (
          <li className={s.hiddenBtns_item}>Разблокировать</li>
        )}
        {userRelation?.status === RelationStatus.Friends && (
          <li className={s.hiddenBtns_item}>Удалить из друзей</li>
        )}
        {!userRelation && <li className={s.hiddenBtns_item}>Добавить в друзья</li>}
      </ul>
    </PopupWrapper>
  );
};

export default HiddenBtns;
