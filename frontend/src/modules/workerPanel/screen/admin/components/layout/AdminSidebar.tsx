import { QuickActionsPanel } from "../quick-actions/QuickActionsPanel";

export function AdminSidebar() {
  return (
    <aside className="w-full max-w-[320px] space-y-6">
      <QuickActionsPanel />
    </aside>
  );
}
