import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: function LandingPage() {
    return (
      <Panel>
        <Header title="메인 페이지" />
        <Button>Click me</Button>
      </Panel>
    );
  },
});
