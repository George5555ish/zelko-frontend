/** Client helpers for Pro action checklists. */

import { getAuthToken } from "@/lib/auth";
import type { FeatureKey } from "@/lib/types/report";

export interface ChecklistItem {
  id: string;
  featureKey: FeatureKey;
  action: string;
  effort: string;
  confidence: string;
  completed: boolean;
  completedAt: string | null;
}

export interface ChecklistView {
  id: string;
  userId: string;
  reportId: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  completedCount: number;
  totalCount: number;
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export async function fetchChecklist(
  reportId: string,
): Promise<ChecklistView | null> {
  const res = await fetch(`/api/checklist/${reportId}`, {
    headers: authHeaders(),
  });
  if (res.status === 401 || res.status === 403) return null;
  const data = (await res.json().catch(() => null)) as {
    checklist?: ChecklistView;
    error?: string;
  } | null;
  if (!res.ok) {
    throw new Error(data?.error ?? "Failed to load checklist.");
  }
  return data?.checklist ?? null;
}

export async function setChecklistItemDone(
  reportId: string,
  itemId: string,
  completed: boolean,
): Promise<ChecklistView> {
  const res = await fetch(`/api/checklist/${reportId}/items/${itemId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ completed }),
  });
  const data = (await res.json().catch(() => null)) as {
    checklist?: ChecklistView;
    error?: string;
  } | null;
  if (!res.ok || !data?.checklist) {
    throw new Error(data?.error ?? "Failed to update checklist.");
  }
  return data.checklist;
}
