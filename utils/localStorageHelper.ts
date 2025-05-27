export const getFromLocalStorage = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : null;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const saveToLocalStorage = (key: string, data: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};
