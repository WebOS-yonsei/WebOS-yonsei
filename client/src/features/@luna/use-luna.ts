import LS2Request from '@enact/webos/LS2Request';
import { useRef, useEffect } from 'react';
import { debugLog } from '~/utils';

export function useLuna(callback: () => LS2Request) {
  const ref = useRef<LS2Request | undefined>();
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
        ref.current.cancel();
        ref.current = undefined;
      }
    };
  }, []);
}
