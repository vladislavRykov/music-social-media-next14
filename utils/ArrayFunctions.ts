export const areArraysEqual = (arr1: string[], arr2: string[]) =>
  Array.isArray(arr1) &&
  Array.isArray(arr2) &&
  arr1.length === arr2.length &&
  arr1.every((value, index) => value === arr2[index]);
export function shuffleArray(array:any[]) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}