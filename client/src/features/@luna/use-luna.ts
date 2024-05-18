import LS2Request from '@enact/webos/LS2Request';
import { useRef, useEffect } from 'react';

type CallbackReturn = LS2Request;

export function useLuna(callback: () => CallbackReturn) {
  const ref = useRef<CallbackReturn | undefined>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ref.current) {
      return undefined;
    }

    ref.current = callbackRef.current();

    return () => {
      if (ref.current) {
        ref.current.cancel();
        ref.current = undefined;
      }
    };
  }, []);
}
