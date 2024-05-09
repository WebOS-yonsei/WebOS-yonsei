import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video/$videoId/playing')({
  component: () => <div>Hello /video/$videoId/playing!</div>
})