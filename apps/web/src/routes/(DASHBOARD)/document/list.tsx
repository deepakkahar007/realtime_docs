import { createFileRoute } from "@tanstack/react-router";
import Tiptap from "@/components/editor/TipTap";

export const Route = createFileRoute("/(DASHBOARD)/document/list")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto h-screen p-2 border ">
      <Tiptap />
    </div>
  );
}
