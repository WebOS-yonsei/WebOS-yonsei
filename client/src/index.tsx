/* global ENACT_PACK_ISOMORPHIC */
import { createRoot, hydrateRoot } from 'react-dom/client';

import { App } from '~/app';
import { turnOffMajorRelaseWarning, initFirebase } from '~/miscs';

turnOffMajorRelaseWarning();

initFirebase();

const appElement = <App />;

const $root = document.getElementById('root');

if (!$root) {
  throw new Error('No root element found');
}

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  // @ts-expect-error have to add variable
  if (ENACT_PACK_ISOMORPHIC) {
    hydrateRoot($root, appElement);
  } else {
    createRoot($root).render(appElement);
  }
}

export default appElement;
