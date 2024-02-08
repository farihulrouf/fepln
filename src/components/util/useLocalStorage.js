import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    // const localStorageValuex = JSON.parse(localStorage.getItem(key));
   
    //console.log("test data",localStorageValue)
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
 // console.log('data value',value)
  return [value, setValue];
}

export { useLocalState };