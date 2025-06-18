import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl ">Welcome to My App</h1>
      <Input placeholder="placeholder..." />
      <ModeToggle />
    </div>
  );
}
