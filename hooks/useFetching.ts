import { FetchingErrorObj } from '@/types/common';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useFetching = (
  cb: any,
): [(...params: any) => Promise<any>, any, boolean, FetchingErrorObj | null] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchingErrorObj | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchingFunc = async (...params: any) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await cb(...params);
      setData(data);
      return data;
    } catch (error: any) {
      setData(null);
      let errorObject = null;
      if (error instanceof AxiosError) {
        if (error.code === 'ERR_NETWORK') {
          errorObject = {
            message: 'Произошла ошибка. Проверте подключение к интернету.',
            type: 'ERR_NETWORK',
          };
        } else if (error.response?.data.error) {
          errorObject = {
            message: error.response.data.error.message,
            type: error.code || 'ERROR',
          };
        }
      } else {
        errorObject = {
          message: 'Непредвиденная ошибка',
          type: 'ERROR',
        };
      }

      setError(errorObject);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetchingFunc, data, isLoading, error];
};
export const useFetchingSA = (
  cb: any,
): [(...params: any) => Promise<any>, any, boolean, FetchingErrorObj | null] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchingErrorObj | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchingFunc = async (...params: any) => {
    setError(null);
    setData(null);
    setIsLoading(true);
    const data = await cb(...params);
    if (!data.ok) {
      setError(data);
    } else {
      setData(data);
    }

    setIsLoading(false);
    return data;
  };

  return [fetchingFunc, data, isLoading, error];
};
export const useLoading = <T>(
  cb: (...params: any) => Promise<T>,
  defaultLoadingStatus = true,
): [(...params: any) => Promise<T>, boolean] => {
  const [isLoading, setIsLoading] = useState(defaultLoadingStatus);

  const fetchingFunc = async (...params: any) => {
    setIsLoading(true);
    const res = await cb(...params);
    setIsLoading(false);
    return res;
  };

  return [fetchingFunc, isLoading];
};
export const useAsync = <T>(
  asyncFunction: (...params: any) => Promise<T>,
  dependencies: any[] = [],
  immediate = true,
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);

  // функция "execute" оборачивает asyncFunction и
  // обрабатывает настройку состояний для pending, value и error
  // useCallback предотвращает вызов useEffect при каждом рендеринге
  // useEffect вызывается только при изменении asyncFunction

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as any);
      setStatus('error');
      return null;
    }
  }, dependencies);

  // вызываем execute для немедленного выполнения
  // с другой стороны, execute может быть вызвана позже
  // например, как обработчик нажатия кнопки
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error, helpers: { setData } };
};
