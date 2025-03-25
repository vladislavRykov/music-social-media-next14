'use client';
import AuthPageLayout from '@/components/layout/AuthPageLayout/AuthPageLayout';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import circleTube from '@/public/circleTube.svg';
import s from './ChangePassPage.module.scss';
import { sendTokenToVerifyEmail } from '@/actions/auth';
import { toast } from 'react-toastify';
import { verificationPassChange } from '@/actions/verification';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

const formValidationSchema = Yup.object({
  password: Yup.string().max(16, 'Максимум 16 символов в пароле.').required('Обязательное поле.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле.'),
});

interface Values {
  password: string;
  confirm_password: string;
}

const ChangePassPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');

  const initialValues: Values = {
    password: '',
    confirm_password: '',
  };

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    if (!token) {
      toast.error('Нет токена смены пароля');
      router.push('/login');
      return;
    }
    const res = await verificationPassChange(token, values.password);
    if (!res.ok) {
      return res.message && toast.error(res.message);
    }
    toast.success(res?.message);
    helpers.resetForm();
    router.push('/login');
  };
  return (
    <AuthPageLayout title="Изменение пароля">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.changePassPage_form}>
            <AuthFormField
              placeholder="Новый пароль"
              label="Пароль"
              type="password"
              name="password"
            />
            <AuthFormField
              placeholder="Повторите пароль"
              label="Подтверждение пароля"
              type="password"
              name="confirm_password"
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={s.changePassPage_submit}>
              {formik.isSubmitting ? (
                <Image
                  className={s.changePassPage_submit_loader}
                  src={circleTube}
                  height={20}
                  width={20}
                  alt="Loading..."
                />
              ) : (
                'Подтвердить смену пароля'
              )}
            </button>
            <Link href={'/login'} className={s.changePassPage_links}>
              Авторизироваться
            </Link>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  );
};

export default ChangePassPage;
