import { Suspense } from "react";
import FrogetPasswordFlow from "./_components/forget-password-flow";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FrogetPasswordFlow />
      </Suspense>
    </>
  );
}
