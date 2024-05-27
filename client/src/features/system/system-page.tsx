import { Heading, VStack, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { useSystemPage } from './system-page.hook';
import { SystemMemoryInfoShell } from './system-memory-info-shell';
import { SystemProcessStatusShell } from './system-process-status-shell';

export function SystemPage() {
  const { procStat, unitList } = useSystemPage();

  return (
    <VStack align="stretch" spacing={10}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">실시간 자원현황 조회</Heading>
      </VStack>
      {unitList && procStat ? (
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                메모리 정보
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SystemMemoryInfoShell unitList={unitList} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                프로세스 상태
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SystemProcessStatusShell procStat={procStat} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <Box>Loading...</Box>
      )}
    </VStack>
  );
}
