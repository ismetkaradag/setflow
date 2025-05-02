import MobileNavbar from '@/components/layout/MobileNavbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pb-16 pt-3 px-5">
      <main>
        {children}
      </main>
      <MobileNavbar />
    </div>
  );
}