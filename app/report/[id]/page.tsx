import { notFound } from "next/navigation";
import { ReportView } from "@/components/report/ReportView";
import { fetchReportById } from "@/lib/api";

/**
 * PARKED product path — classic facial scoring report.
 * Primary UX is `/appearance/[id]` (celebrity style match).
 * Keep this route for restore / internal QA; do not link from marketing.
 */
export default async function ReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { id } = await params;
  const { paid } = await searchParams;
  const report = await fetchReportById(id);

  if (!report) notFound();

  return (
    <main className="min-h-screen bg-[#0b0614]">
      <ReportView report={report} initialPaid={paid === "1"} />
    </main>
  );
}
