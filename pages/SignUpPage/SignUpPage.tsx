'use client';
import AuthPageLayout from '@/components/layout/AuthPageLayout/AuthPageLayout';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import s from './SignUpPage.module.scss';
import cn from 'classnames';
import { delay } from '@/utils/delay';
import * as Yup from 'yup';
import circleTube from '@/public/circleTube.svg';
import API from '@/services/api/api';
import { AxiosError } from 'axios';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { signUp } from '@/actions/auth';
import { useRouter } from 'nextjs-toploader/app';

const formValidationSchema = Yup.object({
  email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
  username: Yup.string()
    .required('Обязательное поле.')
    .max(16, 'Максимум 16 символов в пароле.')
    .min(2, 'Минимум 2 символа в именни пользователя'),
  password: Yup.string().max(16, 'Максимум 16 символов в пароле.').required('Обязательное поле.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле.'),
  terms: Yup.bool().oneOf([true], 'Для регистрации необходимо согласиться с требованиями'),
});

interface Values {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  terms: boolean;
}

const SignUpPage = () => {
  const router = useRouter();
  const initialValues: Values = {
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    terms: false,
  };

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const { confirm_password, terms, ...body } = values;
    // const { data } = await API.auth.registration(body);
    const res = await signUp(body);
    if (!res.ok) {
      return res.message && toast.error(res.message);
    }
    // localStorage.setItem('token', data.accessToken);
    toast.success(res?.message);
    helpers.resetForm();
  };

  return (
    <AuthPageLayout title="Регистрация">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.signUpPage_form}>
            <AuthFormField placeholder="Ваш email" label="Email" type="email" name="email" />
            <AuthFormField
              placeholder="Ваше имя пользователя"
              label="Имя пользователя"
              type="text"
              name="username"
            />
            <AuthFormField
              placeholder="Ваш пароль"
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
            <button type="submit" disabled={formik.isSubmitting} className={s.signUpPage_submit}>
              {formik.isSubmitting ? (
                <Image
                  className={s.signUpPage_submit_loader}
                  src={circleTube}
                  height={20}
                  width={20}
                  alt="Loading..."
                />
              ) : (
                'Зарегистрироваться'
              )}
            </button>
            <label className={s.signUpPage_terms}>
              <Field type="checkbox" name="terms" />
              <span
                className={s.signUpPage_terms_text}
                style={formik.values.terms ? { color: 'rgb(118, 212, 255)' } : {}}>
                Вы согласны с{' '}
                <Link
                  className={s.signUpPage_terms_link}
                  href={'/terms'}
                  style={formik.values.terms ? { color: 'rgb(118, 212, 255)' } : {}}>
                  условиями
                </Link>{' '}
                нашего сервиса
              </span>
            </label>
            {formik.touched.terms && formik.errors.terms && (
              <div className={s.signUpPage_terms_error}> {formik.errors.terms}</div>
            )}
            <div className={s.signUpPage_links}>
              <Link href={'/login'} className={s.signUpPage_link}>
                Авторизироваться
              </Link>
              &bull;
              <Link href={'/reverify'} className={s.signUpPage_link}>
                Отправить код подтверждения
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  );
};

export default SignUpPage;
