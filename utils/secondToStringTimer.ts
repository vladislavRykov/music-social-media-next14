export const secondsToStringTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (remainingSeconds < 10) {
    return `${minutes}:${'0' + remainingSeconds}`;
  }

  return `${minutes}:${remainingSeconds}`;
};
