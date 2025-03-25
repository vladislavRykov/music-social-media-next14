export const formatNumber = (number: number) => {
  return {
    billions: Math.floor(number / 1000000000),
    millions: Math.floor((number % 1000000000) / 1000000),
    thousands: Math.floor((number % 1000000) / 1000),
    remainings: Math.floor(number % 1000),
  };
};

type ViewsFormatParams = {
  billions: number;
  millions: number;
  thousands: number;
  remainings: number;
};

export const viewsFormat = (number: number) => {
  const { billions, millions, thousands, remainings } = formatNumber(number);
  if (billions) {
    if (millions > 99 && !(billions > 9)) return `${billions},${millions.toString()[0]} млрд.`;
    return `${billions} млрд.`;
  } else if (millions) {
    if (thousands > 99 && !(millions > 9)) return `${millions},${thousands.toString()[0]} млн.`;
    return `${millions} млн.`;
  } else if (thousands) {
    if (remainings > 99 && !(thousands > 99))
      return `${thousands},${remainings.toString()[0]} тыс.`;
    return `${thousands} тыс.`;
  }
  return `${remainings}`;
};
// export const viewsFormat = (numberStr: string) => {
//     const digitsCount = numberStr.length;
//     const number = +numberStr;

//     if (digitsCount < 4) {
//       return numberStr;
//     } else if (digitsCount < 7) {
//       const main = Math.floor(number / 1000);
//       const condition = main < 99 && number % 1000 > 99;
//       const second = condition ? `,${Math.round((number % 1000) / 100)}` : '';
//       return `${main}${second} тыс.`;
//     } else if (digitsCount < 10) {
//       const main = Math.floor(number / 1000000);
//       const condition = main < 99 && number % 1000000 > 99999;
//       const second = condition ? `,${Math.round((number % 1000000) / 100000)}` : '';
//       return `${main}${second} млн.`;
//     } else if (digitsCount > 9) {
//       const main = Math.floor(number / 1000000000);
//       const second =
//         number % 1000000000 > 999999 ? `,${Math.round((number % 1000000000) / 100000000)}` : '';
//       return `${main}${second} млрд.`;
//     }
//   };
