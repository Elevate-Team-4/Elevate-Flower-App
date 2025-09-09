export default async function Layout({
  summary,
  children,
}: {
  address: React.ReactNode;
  summary: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col gap-24">
        {/* Cart */}
        <div className="flex justify-between gap-10 pt-16">
          {children}
          {summary}
        </div>
      </main>
    </>
  );
}
