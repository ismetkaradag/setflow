import MobileNavbar from '@/components/layout/MobileNavbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pb-20 pt-5 px-6">
      <main>
        {children}
      </main>
      <MobileNavbar />
    </div>
  );
}