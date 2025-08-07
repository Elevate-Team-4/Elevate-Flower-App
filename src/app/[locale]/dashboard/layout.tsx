import Sidebar from "./_components/Sidebar";

export default function layoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
