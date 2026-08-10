/**
 * Server-side fetch helper for the Express backend.
 * Browser calls stay on /api/* via Next rewrites.
 */
export function getBackendUrl(): string {
  return (
    process.env.BACKEND_URL?.replace(/\/$/, "") || "http://localhost:4000"
  );
}

export async function fetchReportById(id: string) {
  const res = await fetch(`${getBackendUrl()}/api/reports/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? `Failed to load report (${res.status})`);
  }

  const data = (await res.json()) as {
    report: import("@/lib/types/report").ReportViewModel;
  };
  return data.report;
}
