import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-300">
          © 2026 AI 工具开发
        </div>
      </footer>
    </div>
  );
}
