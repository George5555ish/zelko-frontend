import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#1a1c20] text-white/50">
          Loading dashboard…
        </main>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
