import { cloneElement } from 'react';
import { VStack as VStackImpl, StackProps, css } from '@chakra-ui/react';

export function VStack(props: StackProps) {
  return cloneElement(<VStackImpl />, {
    ...props,
    spacing: 0,
    css: css({
      '& > * + *': {
        marginTop: typeof props.spacing === 'string' ? props.spacing : `var(--chakra-space-${props.spacing ?? 4})`,
      },
    }),
  });
}
