import { useRef } from "react";

export function useDebounce(cb: () => void, delay: number = 1000) {
  const timeoutId = useRef();

  return function (...args) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => cb(...args), delay);
  };
}
