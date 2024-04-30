import Button from '@enact/sandstone/Button';
import { Panel, Header } from '@enact/sandstone/Panels';
import { ComponentPropsWithoutRef } from 'react';

export function MainPanel(props: ComponentPropsWithoutRef<typeof Panel>) {
  return (
    <Panel {...props}>
      <Header title="Hello world!" />
      <Button>Click me</Button>
    </Panel>
  );
}
