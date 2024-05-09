import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video/$videoId/')({
  component: () => <div>Hello /video/$videoId/!</div>
})