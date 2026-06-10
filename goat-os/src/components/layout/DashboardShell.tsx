import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-mineral-50">
      <div className="flex">
        <Sidebar />
        <main className="min-h-screen flex-1">
          <TopNav />
          <div className="mx-auto w-full max-w-[1680px] px-4 py-5 md:px-8 md:py-8 xl:px-14">{children}</div>
        </main>
      </div>
    </div>
  );
}
