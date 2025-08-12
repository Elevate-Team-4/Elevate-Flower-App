export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-12 w-full text-zinc-500">
      {/* Side bar */}
      <div className="bg-soft-pink-500 col-span-3 h-full">Side Bar</div>
      {children}
    </div>
  );
}
