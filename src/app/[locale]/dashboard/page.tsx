import Overview2ndRow from "./components/2nd-row/overview-2nd-row";

export default async function dashboard() {
  return (
    <div className="w-full h-screen p-4 bg-gray-100 dark:bg-zinc-700">
      <Overview2ndRow />
    </div>
  );
}
