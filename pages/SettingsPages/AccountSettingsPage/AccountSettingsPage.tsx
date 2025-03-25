import ChangeAccountPassword from '@/components/SettingsPage/AccountSettingsPage/ChangeAccountPassword/ChangeAccountPassword';
import ChangeEmail from '@/components/SettingsPage/AccountSettingsPage/ChangeEmail/ChangeEmail';
import ChangeUserName from '@/components/SettingsPage/AccountSettingsPage/ChangeUserName/ChangeUserName';
import DeleteAccount from '@/components/SettingsPage/AccountSettingsPage/DeleteAccount/DeleteAccount';
import SettingWrapperLayout from '@/components/SettingsPage/SettingWrapperLayout/SettingWrapperLayout';
import React from 'react';
import s from './AccountSettingsPage.module.scss'

const AccountSettingsPage = () => {
  return (
    <div>
      <SettingWrapperLayout title="Изменение имени пользователя">
        <ChangeUserName />
      </SettingWrapperLayout>

      <SettingWrapperLayout title="Изменение email пользователя">
        <ChangeEmail />
      </SettingWrapperLayout>
      <SettingWrapperLayout title="Изменение пароля пользователя">
        <ChangeAccountPassword />
      </SettingWrapperLayout>
      <hr className={s.horizontalLine} />
      <SettingWrapperLayout
        desc="Будьте осторожны! Это действие навсегда удалит ваш аккаунт!"
        title="Удаление аккаунта"
        titleStyles={{ color: 'red' }}>
        <DeleteAccount />
      </SettingWrapperLayout>
    </div>
  );
};

export default AccountSettingsPage;
