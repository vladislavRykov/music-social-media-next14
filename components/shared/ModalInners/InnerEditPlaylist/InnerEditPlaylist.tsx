'use client';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import { AccessType, Overwrite } from '@/types/common';
import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import React from 'react';
import * as Yup from 'yup';
import s from './InnerEditPlaylist.module.scss';
import FormikFieldSecondary from '@/components/UI/Formik/FormikFieldSecondary/FormikFieldSecondary';
import circleTube from '@/public/circleTube.svg';
import { MdOutlinePublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { IoLinkOutline } from 'react-icons/io5';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { PlaylistData } from '@/types/playlistTypes';
import FormikSelectSecondary from '@/components/UI/Formik/FormikSelectSecondary/FormikSelectSecondary';
import { updatePlaylistAction } from '@/actions/playlist';
import { MusicData, UserDataMongoose } from '@/types/types';

const formValidationSchema = Yup.object({
  title: Yup.string().max(16, 'Максимум 16 символов в названии.').required('Обязательное поле.'),
  description: Yup.string(),
  access_type: Yup.string().required('Обязательное поле.').default('public'),
});

interface Values {
  title: string;
  description: string;
  access_type: AccessType;
}

type Props = {
  closeModal: () => void;
  playlistData: {
    playlistId: string;
    title: string;
    desc: string;
    access_type: AccessType;
  };
  updatePlaylistData:() => Promise<{
    likesAndDislikes: {
        likes: string[];
        dislikes: string[];
    } | null | undefined;
    playlist: Overwrite<PlaylistData, {
        userId: UserDataMongoose;
        items: MusicData[];
    }> | null;
} | null>;


 
};
const options = [
  {
    value: AccessType.Public,
    label: 'Открытый доступ',
    desc: 'Найти и посмотреть может любой пользователь',
    Icon: MdOutlinePublic,
  },
  {
    value: AccessType.Link,
    label: 'Доступ по ссылке',
    desc: 'Посмотреть могут все, у кого есть ссылка',
    Icon: IoLinkOutline,
  },
  {
    value: AccessType.Private,
    label: 'Ограниченный доступ',
    desc: 'Посмотреть сможете только вы',
    Icon: RiGitRepositoryPrivateLine,
  },
];

const InnerEditPlaylist: React.FC<Props> = ({ closeModal, playlistData, updatePlaylistData }) => {
  const initialValues: Values = {
    title: playlistData.title,
    description: playlistData.desc,
    access_type: playlistData.access_type,
  };
  const router = useRouter();
  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const res = await updatePlaylistAction(playlistData.playlistId, values);
    if (!res.ok) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    helpers.resetForm();
    await updatePlaylistData();
    closeModal();
  };
  return (
    <div className={s.innerEditPlaylist}>
      <h2 className={s.innerEditPlaylist_title}>{playlistData.title}</h2>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.editPlaylistForm}>
            <FormikFieldSecondary
              placeholder="Название"
              label="Название"
              type="title"
              name="title"
            />
            <FormikFieldSecondary
              placeholder="Описание"
              label="Описание"
              type="description"
              name="description"
            />
            <FormikSelectSecondary label="Доступ" name="access_type" options={options} />
            <div className={s.editPlaylistForm_btns}>
              <button
                type="button"
                onClick={closeModal}
                className={cn(s.editPlaylistForm_btn, s.editPlaylistForm_cancel)}>
                Отмена
              </button>
              <button type="submit" className={s.editPlaylistForm_btn}>
                Сохранить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InnerEditPlaylist;
