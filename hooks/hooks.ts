import { useRef, useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

const useRecordingTimer = () => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout|null>(null);

  const startTimer = () => {
    setIsTimerActive(true)
    intervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);

  };

  const stopTimer = () => {
    setIsTimerActive(false)
    intervalRef.current&&clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRecordingTime(0)
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return { recordingTime,isTimerActive, startTimer, stopTimer };
};

export default useRecordingTimer;
