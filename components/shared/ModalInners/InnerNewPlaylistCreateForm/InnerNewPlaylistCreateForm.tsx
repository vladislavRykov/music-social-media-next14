'use client';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import { AccessType } from '@/types/common';
import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import React from 'react';
import * as Yup from 'yup';
import s from './InnerNewPlaylistCreateForm.module.scss';
import FormikFieldSecondary from '@/components/UI/Formik/FormikFieldSecondary/FormikFieldSecondary';
import circleTube from '@/public/circleTube.svg';
import { MdOutlinePublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { IoLinkOutline } from 'react-icons/io5';
import cn from 'classnames';
import { createNewPlaylist } from '@/actions/playlist';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { PlaylistData } from '@/types/playlistTypes';
import FormikSelectSecondary from '@/components/UI/Formik/FormikSelectSecondary/FormikSelectSecondary';

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

type InnerNewPlaylistCreateFormProps = {
  goBack: () => void;
  selectedItems: string[];
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

const InnerNewPlaylistCreateForm: React.FC<InnerNewPlaylistCreateFormProps> = ({
  goBack,
  selectedItems,
}) => {
  const initialValues: Values = {
    title: '',
    description: '',
    access_type: AccessType.Public,
  };
  const router = useRouter();
  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const res = await createNewPlaylist({ ...values, items: selectedItems });
    if (!res.ok) {
      return toast.error(res.message);
    }

    const playlistData: PlaylistData = res.data;
    toast.success(res.message);
    helpers.resetForm();
    router.push(`/playlist?list=${playlistData._id}`);
  };
  return (
    <div className={s.innerNewPlaylistCreateForm}>
      <h2 className={s.innerNewPlaylistCreateForm_title}>Новый</h2>
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.createPlaylistForm}>
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
            <div className={s.createPlaylistForm_btns}>
              <button
                type="button"
                onClick={goBack}
                className={cn(s.createPlaylistForm_btn, s.createPlaylistForm_cancel)}>
                Отмена
              </button>
              <button type="submit" className={s.createPlaylistForm_btn}>
                Создать
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InnerNewPlaylistCreateForm;
