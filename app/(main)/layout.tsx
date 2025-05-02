import MobileNavbar from '@/components/layout/MobileNavbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pb-16 pt-2 px-4">
      <main>
        {children}
      </main>
      <MobileNavbar />
    </div>
  );
}