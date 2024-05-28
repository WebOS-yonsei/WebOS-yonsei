import { useRef, useEffect } from 'react';

export function useCallbackRef(callback: (...args: any[]) => any) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return callbackRef.current;
}
