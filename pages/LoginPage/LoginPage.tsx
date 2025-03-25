'use client';
import React, { useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import s from './LoginPage.module.scss';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import Link from 'next/link';
import cn from 'classnames';
import { delay } from '@/utils/delay';
import Image from 'next/image';
import circleTube from '@/public/circleTube.svg';
import AuthPageLayout from '@/components/layout/AuthPageLayout/AuthPageLayout';
import { AxiosError } from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import API from '@/services/api/api';
import { signIn } from '@/actions/auth';

const formValidationSchema = Yup.object({
  email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
  password: Yup.string().max(16, 'Максимум 16 символов в пароле.').required('Обязательное поле.'),
});

interface Values {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const initialValues: Values = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    // const { data } = await API.auth.registration(body);
    const res = await signIn(values);
    if (!res.ok) {
      helpers.resetForm();
      return res.message && toast.error(res.message);
    }
    // localStorage.setItem('token', data.accessToken);
    toast.success(res?.message);
    helpers.resetForm();
    router.push('/home');
  };
  return (
    <AuthPageLayout title="Вход">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.loginPage_form}>
            <AuthFormField placeholder="Ваш email" label="Email" type="email" name="email" />
            <AuthFormField
              placeholder="Ваш пароль"
              label="Пароль"
              type="password"
              name="password"
            />
            <button type="submit" disabled={formik.isSubmitting} className={s.loginPage_submit}>
              {formik.isSubmitting ? (
                <Image
                  className={s.loginPage_submit_loader}
                  src={circleTube}
                  height={20}
                  width={20}
                  alt="Loading..."
                />
              ) : (
                'Войти'
              )}
            </button>
            <Link href={'forgot'} className={cn(s.loginPage_links, s.loginPage_forgot)}>
              Забыли пароль?
            </Link>
            <div className={s.loginPage_signup}>
              <Link href={'/signup'} className={cn(s.loginPage_links)}>
                <span>
                  Нет аккаунта?{' '}
                  <span style={{ color: 'rgb(118,212,255)' }}>Зарегистрируйся сейчас</span>
                </span>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  );
};

export default LoginPage;
