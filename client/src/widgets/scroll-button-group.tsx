import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton, VStack } from '@chakra-ui/react';

export function ScrollButtonGroup() {
  return (
    <VStack pos="fixed" bottom={3} right={3}>
      <IconButton icon={<ArrowUpIcon />} aria-label="up" onClick={() => window.scrollBy({ top: -64 })} rounded="full" />
      <IconButton icon={<ArrowDownIcon />} aria-label="down" onClick={() => window.scrollBy({ top: 64 })} rounded="full" />
    </VStack>
  );
}
