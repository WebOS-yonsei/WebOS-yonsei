import { Heading, VStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { SystemMemoryInfoShell } from './system-memory-info-shell';
import { SystemProcessStatusShell } from './system-process-status-shell';
import { SystemRunningApplicationShell } from './system-running-application-shell';

export function SystemPage({ index }: { index: 0 | 1 | 2 }) {
  const navigate = useNavigate();

  return (
    <VStack align="stretch" spacing={10}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">실시간 자원현황 조회</Heading>
      </VStack>
      <Tabs
        variant="soft-rounded"
        colorScheme="red"
        index={index}
        onChange={(i) =>
          navigate({
            search: () => ({ index: i }),
          })
        }
      >
        <TabList>
          {['프로세스 상태', '메모리 정보', '실행중인 어플리케이션'].map((name, i) => (
            <Tab key={i}>{name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {[<SystemProcessStatusShell />, <SystemMemoryInfoShell />, <SystemRunningApplicationShell />].map((component, i) => (
            <TabPanel key={i}>{component}</TabPanel>
          ))}
          <TabPanel />
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
