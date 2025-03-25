import React from 'react';
import s from './ProfileSettingsPage.module.scss';
import ProfileColors from '@/components/SettingsPage/ProfileSettingsPage/ProfileColors/ProfileColors';
import SiteThemes from '@/components/SettingsPage/ProfileSettingsPage/SiteThemes/SiteThemes';
import UploadAvatar from '@/components/SettingsPage/ProfileSettingsPage/UploadAvatar/UploadAvatar';
import SettingWrapperLayout from '@/components/SettingsPage/SettingWrapperLayout/SettingWrapperLayout';
import ImgDropBox from '@/components/UI/ImgDropBox/ImgDropBox';
import mockImg from '@/public/avatar2.webp';
import UploadBanner from '@/components/SettingsPage/ProfileSettingsPage/UploadBanner/UploadBanner';
import AboutMe from '@/components/SettingsPage/ProfileSettingsPage/AboutMe/AboutMe';

const ProfileSettinsPage = () => {
  return (
    <div className={s.profileSettings}>
      <div className={s.profileSettings_container}>
        <SettingWrapperLayout title="Цвет профиля">
          <ProfileColors />
        </SettingWrapperLayout>
        <SettingWrapperLayout title="Тема сайта">
          <SiteThemes />
        </SettingWrapperLayout>
        <SettingWrapperLayout title="Обо мне">
          <AboutMe />
        </SettingWrapperLayout>
        <SettingWrapperLayout
          title="Аватар"
          desc="Разрешенные форматы : JPEG, PNG. Максимальный размер: 3mb. Оптимальное разрешение: 230x230">
          <UploadAvatar />
        </SettingWrapperLayout>
        <SettingWrapperLayout
          title="Шапка профиля"
          desc="Разрешенные форматы : JPEG, PNG. Максимальный размер: 6mb. Оптимальное разрешение: 1700x330">
          <UploadBanner />
        </SettingWrapperLayout>
        //BANNER
      </div>
    </div>
  );
};

export default ProfileSettinsPage;
