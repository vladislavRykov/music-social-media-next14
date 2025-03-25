'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';

interface TextColorContextProps {
  textColor: string;
  setTextColor: (color: string) => void;
}

const TextColorContext = createContext<TextColorContextProps>({
  textColor: '#000000',
  setTextColor: () => {},
});

export const TextColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textColor, setTextColor] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('textColor') || '#000000';
    }
    return '#000000';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('textColor', textColor);
      // Устанавливаем data-атрибут на элемент <html>
      document.documentElement.setAttribute('data-text-color', textColor);
    }
  }, [textColor]);

  const value: TextColorContextProps = {
    textColor,
    setTextColor,
  };

  return (
    <TextColorContext.Provider value={value}>
      {children}
    </TextColorContext.Provider>
  );
};

export const useTextColor = () => useContext(TextColorContext);