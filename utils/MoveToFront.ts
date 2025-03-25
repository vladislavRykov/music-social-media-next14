export function moveToFront(arr:any[], condition) {
    const index = arr.findIndex(condition);
  
    if (index > -1) {
      const [movedItem] = arr.splice(index, 1); // Удаляем и получаем удаленный элемент
      arr.unshift(movedItem); // Вставляем в начало
    }
    return arr;
  }