import LS2Request from '@enact/webos/LS2Request';
import { useRef, useEffect } from 'react';
import { debugLog } from '~/utils';

type CallbackReturn = LS2Request | Promise<unknown>;

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

    debugLog('GET_PROC_STAT[R]', {});
    ref.current = callbackRef.current();

    return () => {
      if (ref.current) {
        if (ref.current instanceof LS2Request) {
          ref.current.cancel();
        }
        ref.current = undefined;
      }
    };
  }, []);
}
