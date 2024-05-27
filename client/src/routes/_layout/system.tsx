import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { SystemPage } from '~/features/system';

const searchSchema = z.object({
  index: z
    .nativeEnum({
      'process-status': 0,
      'memory-info': 1,
      'running-application': 2,
    } as const)
    .catch(0),
});

export const Route = createFileRoute('/_layout/system')({
  validateSearch: (search) => searchSchema.parse(search),
  component: function System() {
    const { index } = Route.useSearch();
    return <SystemPage index={index} />;
  },
});
