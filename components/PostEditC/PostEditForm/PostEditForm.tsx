'use client';
import React, { useEffect, useRef, useState } from 'react';
import PostImgDropBox from '../PostImgDropBox/PostImgDropBox';
import s from './PostEditForm.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNewPost, editPostByIdA } from '@/actions/post';
import { toast } from 'react-toastify';
import PostInput from '../PostFields/PostInput/PostInput';
import PostTextArea from '../PostFields/PostTextarea/PostTextarea';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';
import { delay } from '@/utils/delay';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';
import { MongoosePost } from '@/types/postTypes';
import { deleteFileFromFB } from '@/actions/files';

type Values = {
  title: string;
  content: string;
};
const formValidationSchema = Yup.object({
  title: Yup.string()
    .required('Обязательное поле')
    .min(5, 'Минимум 5 символов')
    .max(60, 'Максимум 60 символов')
    .matches(/^[a-zA-Zа-яА-Я0-9\s.,!?-]+$/, 'Только буквы, цифры и знаки препинания'),
  content: Yup.string()
    .required('Обязательное поле')
    .min(20, 'Минимум 20 символов')
    .test(
      'not-whitespace',
      'Контент не может состоять только из пробелов',
      (value) => value.trim().length > 0,
    ),
});

const PostEditForm = ({ post }: { post: MongoosePost }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [postImgFile, setPostImgFile] = useState<File | null | string>(post?.image_url || null);
  const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    formik.handleChange(e);
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight > 500 ? '500px' : e.target.scrollHeight + 'px';
  };
  useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = '';
    textAreaRef.current.style.height =
      textAreaRef.current.scrollHeight > 500 ? '500px' : textAreaRef.current.scrollHeight + 'px';
  }, []);
  const uploadPostImg = async (file: File | null) => {
    if (!file) {
      return null;
    }
    try {
      const imageRef = ref(storage, `images/${createUniqueName(file)}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      const fileUrl = new Promise<StorageError | string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading file: ', error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(imageRef);
            console.log('File uploaded successfully: ' + url);
            resolve(url);
          },
        );
      });
      const payload = await fileUrl;
      if (payload instanceof StorageError) {
        toast.error('Ошибка при отправке изображения в хранилище');
        return null;
      }

      return payload;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return null;
      }
      toast.error('Неизвестная ошибка при сохранении изображения');
      return null;
    }
  };
  const onSubmit = async (values: Values) => {
    toast.info('Пост создается');

    const image_url =
      typeof postImgFile === 'string' ? null : await uploadPostImg(postImgFile as File | null);
    const editPostData: Values & { image_url?: string } = {
      ...values,
    };
    if (image_url) editPostData.image_url = image_url;
    const res = await editPostByIdA(post._id, editPostData);
    if (!res.ok) {
      return toast.error(res.message);
    }
    if (res.data?.image_url && image_url) {
      const deleteFileRes = await deleteFileFromFB(res.data?.image_url);
    }
    toast.success(res.message);
  };

  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      title: post.title,
      content: post.content,
    },
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className={s.postEditForm}>
      <PostImgDropBox
        postImgFile={postImgFile}
        setPostImgFile={(file: File | null) => setPostImgFile(file)}
      />
      <form className={s.postEditForm_form} onSubmit={formik.handleSubmit}>
        <div className={s.postEditForm_fieldWrapper}>
          <div className={s.postEditForm_field}>
            <label htmlFor="title">
              <span className={s.postEditForm_labelText}>Заголовок</span>
              <PostInput
                name="title"
                id="title"
                placeholder="Заголовок"
                value={formik.values.title}
                onChange={formik.handleChange}
                type="text"
              />
            </label>
            {<div className={s.postEditForm_error}>{formik.errors.title}</div>}
          </div>
          <div className={s.postEditForm_field}>
            <label htmlFor="content">
              <span className={s.postEditForm_labelText}>Основной текст</span>
              <PostTextArea
                ref={textAreaRef}
                rows={4}
                name="content"
                id="content"
                placeholder="Текст поста"
                value={formik.values.content}
                onChange={onChangeTextArea}
              />
            </label>
            {<div className={s.postEditForm_error}>{formik.errors.content}</div>}
          </div>
        </div>
        <button type="submit" className={s.postEditForm_button} disabled={formik.isSubmitting}>
          {!formik.isSubmitting ? (
            'Редактировать пост'
          ) : (
            <Image
              className={s.postEditForm_btnLoading}
              src={cicleTube}
              height={20}
              width={20}
              alt="Редктирование..."
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default PostEditForm;
