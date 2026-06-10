import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-field text-zinc-100"><div className="flex"><Sidebar /><main className="min-h-screen flex-1"><TopNav /><div className="p-4 md:p-6">{children}</div></main></div></div>;
}
