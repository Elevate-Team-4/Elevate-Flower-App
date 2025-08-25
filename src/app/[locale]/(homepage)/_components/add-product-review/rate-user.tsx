import { useFormatter } from "next-intl";
import React from "react";
import Stars from "./stars";

type RateUserProps = { rating: number; user: string };
export default function RateUser({ rating, user }: RateUserProps) {
  const format = useFormatter();
  return (
    <>
      {" "}
      <div className="flex gap-[10px]">
        <div className="w-11 h-11 bg-maroon-600 flex items-center text-white justify-center rounded-full">
          {user.slice(0, 1)}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-zinc-800">{user}</span>
          <span className=" text-sm font-medium text-zinc-400">
            {format.dateTime(new Date(), "medium-date")}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Stars rating={rating} />
        <span className="font-semibold">({rating})</span>
      </div>
    </>
  );
}
