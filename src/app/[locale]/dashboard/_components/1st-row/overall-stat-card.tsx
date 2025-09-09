import { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon; // example : Package
  bgColor: string; // example : "bg-maroon-50"
  iconColor: string; // example : "text-maroon-600"
  numberColor: string; // example : "text-maroon-600"
  textColor: string; // example : "text-zinc-800"
  number: number | string; // the number value
  label: string; // the label under the number
};

export function StatisticsCard({
  icon: Icon,
  bgColor,
  iconColor,
  numberColor,
  textColor,
  number,
  label,
}: StatCardProps) {
  return (
    <div className={`col-span-1 flex flex-col gap-3 p-4 rounded-2xl ${bgColor}`}>
      {/* Icon */}
      <Icon size={35} className={`${iconColor}`} strokeWidth={1.5} />
      <p className="flex flex-col">
        {/* Value */}
        <span className={`text-2xl font-semibold ${numberColor}`}>{number}</span>

        {/* Label */}
        <span className={`font-medium ${textColor}`}>{label}</span>
      </p>
    </div>
  );
}
