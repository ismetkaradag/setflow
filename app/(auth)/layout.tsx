export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <main className="w-full max-w-md">
        {children}
      </main>
    </div>
  );
}