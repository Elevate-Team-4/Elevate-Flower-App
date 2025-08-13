import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DashboardHeaderPropsType {
  title: string;
  buttonTitle: string;
  buttonHref: string;
}

export default function DashboardHeader({
  title,
  buttonTitle,
  buttonHref,
}: DashboardHeaderPropsType) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        {/* Title */}
        <h2 className="font-semibold text-2xl">{title}</h2>

        {/* Add new button */}
        <Link href={buttonHref}>
          <Button className="[&_svg]:size-5 py-5 font-medium">
            <Plus strokeWidth={2.5} /> {buttonTitle}
          </Button>
        </Link>
      </div>

      {/* Search input */}
      <form action="products" method="get">
        <Input type="search" name="search" placeholder="Search..."></Input>
      </form>
    </div>
  );
}
