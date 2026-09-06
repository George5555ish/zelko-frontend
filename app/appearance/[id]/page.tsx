import { notFound } from "next/navigation";
import { AppearanceJourney } from "@/components/appearance/AppearanceJourney";
import { fetchReportById } from "@/lib/api";

export default async function AppearancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await fetchReportById(id);
  if (!report) notFound();

  return <AppearanceJourney report={report} />;
}
