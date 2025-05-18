import { useRef, useEffect, MutableRefObject } from 'react';

const DEFAULT_THRESHOLD = 200; // расстояние от низа экрана до начала подгрузки (px)

type ParamsT = {
  loadMoreCallback: () => Promise<void>;
  threshold: number;
  scrollDeps?: any[];
  elementWithScroll?: MutableRefObject<any | null>;
};

const useScrollPagination = ({
  loadMoreCallback,
  threshold = DEFAULT_THRESHOLD,
  scrollDeps = [],
  elementWithScroll,
}: ParamsT) => {
  const observerTarget = useRef<HTMLDivElement | null>(null); // реф, привязанный к последнему элементу списка
  // const elementWithScroll = useRef<T | null>(null); // реф, привязанный к последнему элементу списка
  const isFetching = useRef(false); // предотвращает множественные вызовы подгрузки

  /**
   * Обработчик события scroll
   */
  const handleScroll = () => {
    if (observerTarget.current && !isFetching.current) {
      const targetRect = observerTarget.current.getBoundingClientRect();
      const viewportHeight = document.documentElement.clientHeight;

      // Проверяем, достигнута ли позиция ниже порога
      console.log(targetRect.top <= viewportHeight + threshold);
      if (targetRect.top <= viewportHeight + threshold) {
        isFetching.current = true;
        loadMoreCallback()
          .then(() => {
            isFetching.current = false;
          })
          .catch(() => {
            isFetching.current = false;
          });
      }
    }
  };
  // useEffect(() => {
  //   if (!immediate) return;
  //   if (observerTarget.current && !isFetching.current) {
  //     isFetching.current = true;
  //     loadMoreCallback()
  //       .then(() => {
  //         isFetching.current = false;
  //       })
  //       .catch(() => {
  //         isFetching.current = false;
  //       });
  //   }
  // }, commonDeps);
  useEffect(() => {
    if (elementWithScroll?.current) {
      elementWithScroll.current.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (elementWithScroll?.current) {
        elementWithScroll.current.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [...scrollDeps]); // пустой массив deps, слушаем глобальные события

  return observerTarget;
};

export default useScrollPagination;
