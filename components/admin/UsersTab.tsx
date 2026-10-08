"use client";

import { useState } from "react";
import { api, type AdminUser, type UserStatus } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { dangerBtn, errorCls, formatTime, inputCls, smallBtn, tdCls, thCls } from "@/lib/ui";

const STATUS_LABEL: Record<UserStatus, string> = {
  pending: "승인 대기", active: "활성", banned: "차단", legacy: "기존 데이터",
};

function UserRow({ u, run }: { u: AdminUser; run: (fn: () => Promise<unknown>) => void }) {
  const [star, setStar] = useState(u.star === null ? "" : String(u.star));
  const starValue = star.trim() === "" ? null : Number(star);
  const post = (path: string, init?: RequestInit) => run(() => api(`/api/admin/users/${u.id}${path}`, init));
  const body = JSON.stringify({ star: starValue });

  return (
    <tr>
      <td className={tdCls}>{u.login_id}</td>
      <td className={tdCls}>{u.iidx_id ?? "-"}</td>
      <td className={`${tdCls} break-all text-xs`}>{u.email ?? "-"}</td>
      <td className={tdCls}>
        <input type="number" step="0.01" min="0" max="20" value={star} onChange={(e) => setStar(e.target.value)}
          placeholder="★" className={`${inputCls} w-24 !py-1 text-sm`} />
      </td>
      <td className={`${tdCls} whitespace-nowrap text-xs`}>{STATUS_LABEL[u.status]}</td>
      <td className={`${tdCls} whitespace-nowrap text-xs text-white/45`}>{formatTime(u.created_at)}</td>
      <td className={`${tdCls} space-x-1.5 whitespace-nowrap`}>
        {u.status === "pending" && (
          <>
            <button className={smallBtn} onClick={() => post("/approve", { method: "POST", body })}>승인</button>
            <button className={dangerBtn} onClick={() => confirm(`${u.login_id} 신청을 거절(삭제)할까요?`) && post("", { method: "DELETE" })}>거절</button>
          </>
        )}
        {u.status !== "pending" && (
          <button className={smallBtn} onClick={() => post("/star", { method: "PUT", body })}>★ 저장</button>
        )}
        {u.status === "active" && !u.is_admin && (
          <button className={dangerBtn} onClick={() => confirm(`${u.login_id} 계정을 차단할까요?`) && post("/ban", { method: "POST" })}>차단</button>
        )}
        {u.status === "banned" && <button className={smallBtn} onClick={() => post("/unban", { method: "POST" })}>해제</button>}
      </td>
    </tr>
  );
}

export default function UsersTab() {
  const [status, setStatus] = useState<UserStatus>("pending");
  const { data, error, reload } = useApi<AdminUser[]>(`/api/admin/users?status=${status}`);
  const [message, setMessage] = useState("");

  const run = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
      setMessage("");
      reload();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "실패했습니다.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(STATUS_LABEL) as UserStatus[]).map((s) => (
          <button key={s} onClick={() => setStatus(s)}
            className={`cursor-pointer rounded border px-3 py-1.5 text-sm ${status === s ? "border-white/85 bg-white/15" : "border-white/30 text-white/70"}`}>
            {STATUS_LABEL[s]}
          </button>
        ))}
        <span className="text-xs text-white/40">★를 비워 두면 신뢰도 pt가 계산되지 않습니다.</span>
      </div>
      {(error || message) && <p className={errorCls}>{error ?? message}</p>}
      {data && data.length === 0 && <p className="py-8 text-center text-white/35">해당하는 계정이 없습니다.</p>}
      {data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/5 text-sm">
            <thead>
              <tr className="bg-th">
                {["ID", "IIDX ID", "Email", "★", "상태", "가입 신청", ""].map((h) => <th key={h} className={thCls}>{h}</th>)}
              </tr>
            </thead>
            <tbody>{data.map((u) => <UserRow key={`${u.id}-${u.star}-${u.status}`} u={u} run={run} />)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
