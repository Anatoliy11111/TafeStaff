import { useEffect } from 'react';

export function useDebounce(value: string, delay: number, fn: () => void): () => void {
  useEffect(() => {
    const handler = setTimeout(() => {
      fn();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return () => {};
}
