import { Box, Heading, VStack } from '@chakra-ui/react';
import { DefaultLayout } from '~/widgets';
import { useSystemPage } from './system-page.hook';

export function SystemPage() {
  const { procStat, unitList } = useSystemPage();

  return (
    <DefaultLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">실시간 자원현황 조회</Heading>
        </VStack>
      </VStack>
      <Box>{JSON.stringify(procStat, null, 2)}</Box>
      <Box>{JSON.stringify(unitList, null, 2)}</Box>
    </DefaultLayout>
  );
}
