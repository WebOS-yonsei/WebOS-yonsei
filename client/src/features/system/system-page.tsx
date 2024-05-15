import { Heading, VStack } from '@chakra-ui/react';
import { DefaultLayout } from '~/widgets';

export function SystemPage() {
  return (
    <DefaultLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">실시간 자원현황 조회</Heading>
        </VStack>
      </VStack>
      <div>Hello /system!</div>
    </DefaultLayout>
  );
}
