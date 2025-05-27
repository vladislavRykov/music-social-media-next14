import React from 'react';
import s from './Profile.module.scss';
import ProfileCap from '@/components/layout/ProfileLayout/ProfileCap/ProfileCap';
import LeftBlock from '@/components/ProfileMainC/LeftBlock/LeftBlock';
import RightBlock from '@/components/ProfileMainC/RightBlock/RightBlock';
import { Genre } from '@/types/types';

type Props = {
  faveGenresResponce: {
    ok: boolean;
    data: null;
    message: string;
} | {
    ok: boolean;
    data: {
        genres: Genre[];
    };
    message: string;
};
aboutMe: string|null;
}

const Profile = ({faveGenresResponce,aboutMe}:Props) => {
  return (
    <div className={s.profilePage}>
      <div className={s.profilePage_main}>
        <div className={s.profilePage_grid}>
          <LeftBlock aboutMe={aboutMe}/>
          <RightBlock faveGenresResponce={faveGenresResponce}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
