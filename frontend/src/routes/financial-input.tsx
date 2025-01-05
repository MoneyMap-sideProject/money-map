import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/financial-input')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/financial-input"!</div>
}
