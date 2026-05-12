import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(DASHBOARD)/document/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(DASHBOARD)/document/list"!</div>
}
