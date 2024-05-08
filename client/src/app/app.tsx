/* eslint-disable import/no-extraneous-dependencies */
import ThemeDecorator, { ThemeDecoratorProps } from '@enact/sandstone/ThemeDecorator';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Suspense } from 'react';
import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = ThemeDecorator((props: ThemeDecoratorProps) => (
  <div {...props}>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </div>
));
