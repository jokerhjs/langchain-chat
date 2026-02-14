import ClientLayout from "./_components/client-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
