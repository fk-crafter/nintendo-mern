import { Suspense } from "react";
import DashboardPage from "./DashboardClient";

export default function DashboardWrapper() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
