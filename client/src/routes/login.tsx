import { Button } from '@chakra-ui/react';
import Input from '@enact/sandstone/Input';
import { Header, Panel } from '@enact/sandstone/Panels';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: function LoginPage() {
    return (
      <Panel>
        <Header title="로그인 페이지" />
        <form>
          <Input placeholder="아이디" size="large" title="아이디" type="text" />
          <Input placeholder="비밀번호" size="large" title="비밀번호" type="password" />
          <Button>로그인</Button>
        </form>
      </Panel>
    );
  },
});
