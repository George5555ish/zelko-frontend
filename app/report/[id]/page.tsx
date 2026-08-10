import { notFound } from "next/navigation";
import { ReportView } from "@/components/report/ReportView";
import { fetchReportById } from "@/lib/api";

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
