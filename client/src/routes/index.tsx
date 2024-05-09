import { Header } from '@enact/sandstone/Panels';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: function LandingPage() {
    return <Header title="메인 페이지" />;
  },
});
