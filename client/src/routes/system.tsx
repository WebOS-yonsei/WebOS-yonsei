import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/system')({
  component: () => <div>Hello /system!</div>
})