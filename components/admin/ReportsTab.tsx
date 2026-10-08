"use client";

import { useState } from "react";
import { api, type AdminReport } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { errorCls, formatTime, smallBtn, tdCls, thCls } from "@/lib/ui";

export default function ReportsTab() {
  const [resolved, setResolved] = useState(false);
  const { data, error, reload } = useApi<AdminReport[]>(`/api/admin/reports?resolved=${resolved}`);
  const [message, setMessage] = useState("");

  async function mark(id: number, value: boolean) {
    try {
      await api(`/api/admin/reports/${id}`, { method: "PUT", body: JSON.stringify({ resolved: value }) });
      setMessage("");
      reload();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "실패했습니다.");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[false, true].map((r) => (
          <button key={String(r)} onClick={() => setResolved(r)}
            className={`cursor-pointer rounded border px-3 py-1.5 text-sm ${resolved === r ? "border-white/85 bg-white/15" : "border-white/30 text-white/70"}`}>
            {r ? "처리됨" : "접수됨"}
          </button>
        ))}
      </div>
      {(error || message) && <p className={errorCls}>{error ?? message}</p>}
      {data && data.length === 0 && <p className="py-8 text-center text-white/35">제보가 없습니다.</p>}
      {data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/5 text-sm">
            <thead>
              <tr className="bg-th">{["시각", "분류", "페이지", "내용", "작성자", ""].map((h) => <th key={h} className={thCls}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td className={`${tdCls} whitespace-nowrap text-xs text-white/45`}>{formatTime(r.created_at)}</td>
                  <td className={tdCls}>{r.category}</td>
                  <td className={tdCls}>{r.page}</td>
                  <td className={`${tdCls} whitespace-pre-wrap [overflow-wrap:anywhere]`}>{r.description}</td>
                  <td className={tdCls}>{r.author}</td>
                  <td className={tdCls}>
                    <button className={smallBtn} onClick={() => mark(r.id, !resolved)}>{resolved ? "되돌리기" : "처리 완료"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
