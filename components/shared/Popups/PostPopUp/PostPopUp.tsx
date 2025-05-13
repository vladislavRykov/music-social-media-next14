import PopupWrapper from '@/components/shared/Popups/PopupWrapper';
import React, { PropsWithChildren } from 'react';
import s from './PostPopUp.module.scss';

interface PostPopUpProps extends PropsWithChildren {
  closePopup: () => void;
  styles: React.CSSProperties;
}

const PostPopUp = ({ closePopup, children, styles }: PostPopUpProps) => {
  return (
    <PopupWrapper closePopup={closePopup} className={s.postItemPopUp} styles={styles}>
      <div className={s.postPopUpInner}>
        {children}
      </div>
    </PopupWrapper>
  );
};

export default PostPopUp;
