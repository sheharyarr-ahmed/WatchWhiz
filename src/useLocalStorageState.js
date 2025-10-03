import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const defaultValue =
      typeof initialState === "function" ? initialState() : initialState;
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;

    try {
      const parsedValue = JSON.parse(storedValue);
      if (Array.isArray(defaultValue) && !Array.isArray(parsedValue)) {
        return defaultValue;
      }
      return parsedValue ?? defaultValue;
    } catch (error) {
      console.warn(
        `useLocalStorageState: could not parse localStorage value for key "${key}"`,
        error
      );
      return defaultValue;
    }
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
