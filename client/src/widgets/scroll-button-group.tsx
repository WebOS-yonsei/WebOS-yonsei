import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { VStack } from './vstack';

export function ScrollButtonGroup() {
  return (
    <VStack pos="fixed" bottom={3} right={3}>
      <IconButton icon={<ArrowUpIcon />} aria-label="up" onClick={() => window.scrollBy({ top: -200 })} rounded="full" />
      <IconButton icon={<ArrowDownIcon />} aria-label="down" onClick={() => window.scrollBy({ top: 200 })} rounded="full" />
    </VStack>
  );
}
