import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/analysis/income/salary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/analysis/income/salary"!</div>
}
