import React from "react";

export default function LoadingSpin() {
  return (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 border-4 border-b-maroon-600 rounded-full inline-block box-border animate-spin"></span>
    </div>
  );
}
