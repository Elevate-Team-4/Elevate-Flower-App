import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function HeaderOccasionDashboard() {
  return (
    <header className="flex justify-between">
      <h3 className="font-semibold text-2xl text-zinc-800">All Occasions</h3>
      <Link href={"occasions/add-occasion"}>
        <Button>
          <Plus /> Add a new occasion
        </Button>
      </Link>
    </header>
  );
}
