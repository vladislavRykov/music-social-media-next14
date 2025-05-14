import { useEffect, useState } from 'react';

export function useCssVariable(variableNames:string[]) {
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const documentEl =  document.documentElement

  useEffect(() => {
    const variableValueArray = variableNames.map(variable=>{
        const style = getComputedStyle(documentEl);
        const variableValue = style.getPropertyValue(variable).trim()
        return variableValue

    })
    setValuesArray(variableValueArray);
  }, [...variableNames]);

  return valuesArray;
}