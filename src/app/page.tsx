import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl ">Welcome to My App</h1>
      <ModeToggle />
    </div>
  );
}
