import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/analysis/income/annual')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/analysis/income/annual"!</div>;
}
