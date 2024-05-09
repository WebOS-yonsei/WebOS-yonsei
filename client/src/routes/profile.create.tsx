import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/create')({
  component: () => <div>Hello /profile/create!</div>
})