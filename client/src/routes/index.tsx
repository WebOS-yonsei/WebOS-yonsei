import { VStack } from '@chakra-ui/react';
import { Header } from '@enact/sandstone/Panels';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: function LandingPage() {
    return (
      <VStack>
        <Header title="메인 페이지" />
        <Link to="/video/$videoId" params={{ videoId: '2' }}>
          상세페이지로 이동
        </Link>
      </VStack>
    );
  },
});
