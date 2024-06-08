import { cloneElement } from 'react';
import { VStack as HStackImpl, StackProps, css } from '@chakra-ui/react';

export function HStack(props: StackProps) {
  return cloneElement(<HStackImpl />, {
    ...props,
    spacing: 0,
    css: css({
      '& > * + *': {
        marginLeft: typeof props.spacing === 'string' ? props.spacing : `var(--chakra-space-${props.spacing ?? 4})`,
      },
    }),
  });
}
