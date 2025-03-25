'use server';

import { createUniqueName } from '@/utils/createUniqueName';
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '@/firebase/firebase';

export const uploadOneImg = async (formData: FormData) => {
  const file = formData.get('image') as File;
  if (!file) {
    return { ok: false, message: 'Отсутствует изображение' };
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
        },
        (error) => {
          console.error('Error uploading file: ', error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(imageRef);
          console.log('File uploaded successfully: ' + url);
          // const fileName = file.name;
          // const mdbFile: MongooseFile = await Models.File.create({
          //   fileName: fileName,
          //   source: url,
          //   size: file.size,
          //   mimetype: file.type,
          // });
          resolve(url);
        },
      );
    });
    const payload = await fileUrl;
    if (payload instanceof StorageError) {
      return { ok: false, message: 'Ошибка при отправке изображения в хранилище' };
    }
    return { ok: true, payload, message: 'Изображение успешно загружено' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
};

export const deleteOneImg = async (fileUrl: string) => {
  const fileRef = ref(storage, fileUrl);

  const res = await deleteObject(fileRef)
    .then(() => {
      // console.log('Файл успешно удален');
      return { ok: true, message: 'Файлы успешно удалены' };
    })
    .catch((error) => {
      // console.error('Ошибка при удалении файла: ', error);
      return { ok: false, message: 'Ошибка при удалении файла' };
    });
  return res;
};
export const deleteFileFromFB = async (fileUrl: string) => {
  const fileRef = ref(storage, fileUrl);

  const res = await deleteObject(fileRef)
    .then(() => {
      // console.log('Файл успешно удален');
      return { ok: true, message: 'Файл успешно удален' };
    })
    .catch((error) => {
      // console.error('Ошибка при удалении файла: ', error);
      return { ok: false, message: 'Ошибка при удалении файла' };
    });
  return res;
};
