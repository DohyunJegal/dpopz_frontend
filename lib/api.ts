export type Opt = "OFF" | "MIRROR" | "RANDOM" | "R-RANDOM" | "S-RANDOM";
export type Difficulty = "HYPER" | "ANOTHER" | "LEGGENDARIA";

export interface OptionCombo {
  flip: "OFF" | "FLIP";
  left: Opt;
  right: Opt;
  count: number;
  pt: number | null;
  rank: number;
}

export interface Chart {
  id: number;
  title: string;
  difficulty: Difficulty;
  level: number;
  lvx: number | null;
  version: string | null;
  votes: number;
  options: OptionCombo[];
}

export interface Comment {
  flip: "OFF" | "FLIP";
  left: Opt;
  right: Opt;
  comment: string;
}

export interface ChartDetail extends Chart {
  comments: Comment[];
}

export interface ChartList {
  total: number;
  items: Chart[];
}

export interface Me {
  login_id: string;
  is_admin: boolean;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
  });
  if (!res.ok) {
    let message = `요청에 실패했습니다 (${res.status})`;
    try {
      const body = await res.json();
      // FastAPI: 일반 오류는 {detail: "문구"}, 입력 검증 오류(422)는 {detail: [{msg}, ...]}
      if (typeof body.detail === "string") message = body.detail;
      else if (Array.isArray(body.detail) && body.detail[0]?.msg) message = body.detail[0].msg;
    } catch {}
    throw new ApiError(res.status, message);
  }
  return res.json();
}

export type SortKey = "version" | "title" | "diff" | "level" | "lvx";
export type SortOrder = "asc" | "desc";

export interface ChartQuery {
  q?: string;
  level?: number;
  version?: string;
  sort?: SortKey;
  order?: SortOrder;
  limit?: number;
  offset?: number;
}

export function chartQueryString(p: ChartQuery): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(p)) if (v !== undefined && v !== "") sp.set(k, String(v));
  return sp.toString();
}

export type VoteStatus = "pending" | "approved" | "rejected";

export interface MyVote {
  id: number;
  chart_id: number;
  title: string;
  difficulty: Difficulty;
  flip: "OFF" | "FLIP";
  left: Opt;
  right: Opt;
  comment: string | null;
  voted_at: string;
  status: VoteStatus;
}

// ────────── 관리자 ──────────
export type UserStatus = "pending" | "active" | "banned" | "legacy";

export interface AdminUser {
  id: number;
  login_id: string;
  iidx_id: string | null;
  email: string | null;
  star: number | null;
  status: UserStatus;
  is_admin: number;
  created_at: string;
  approved_at: string | null;
}

export interface AdminVote {
  id: number;
  author: string;
  title: string;
  difficulty: Difficulty;
  flip: "OFF" | "FLIP";
  left: Opt;
  right: Opt;
  comment: string | null;
  voted_at: string;
  status: VoteStatus;
}

export interface SyncRun {
  id: number;
  kind: string;
  started_at: string;
  finished_at: string | null;
  status: "running" | "ok" | "failed";
  added: number | null;
  changed: number | null;
  error: string | null;
  triggered_by: string | null;
}

export interface Unmatched {
  id: number;
  source: string;
  raw_title: string;
  difficulty: string;
  reason: "not_found" | "ambiguous";
  created_at: string;
}

export interface AdminReport {
  id: number;
  category: string;
  page: string;
  description: string;
  resolved: number;
  created_at: string;
  author: string;
}
