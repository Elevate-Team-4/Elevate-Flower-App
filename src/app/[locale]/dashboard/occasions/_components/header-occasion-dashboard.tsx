import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeaderOccasionDashboard() {
  return (
    <header className="flex justify-between">
      <h3 className="font-semibold text-2xl text-zinc-800">All Occasions</h3>
      <Button>
        <Plus /> Add a new occasion
      </Button>
    </header>
  );
}
