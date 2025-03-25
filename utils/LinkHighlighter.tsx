import React, { useMemo } from 'react';

const LinkHighlighter = ({ text }:{text:string}) => {
  const formattedText = useMemo(() => {
    // Регулярное выражение для поиска URL-адресов
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Замена URL-адресов на интерактивные ссылки
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }, [text]);

  // Безопасная вставка HTML-кода с выделенными ссылками
  return <>{formattedText && <span dangerouslySetInnerHTML={{ __html: formattedText }} />}</>;
};

export default LinkHighlighter;