/* eslint-disable import/no-extraneous-dependencies */
import ThemeDecorator, { ThemeDecoratorProps } from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import { MainPanel } from '../views';

export const App = ThemeDecorator((props: ThemeDecoratorProps) => (
  <div {...props}>
    <Panels>
      <MainPanel />
    </Panels>
  </div>
));
