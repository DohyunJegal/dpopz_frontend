"use client";

import { useState } from "react";
import type { Unmatched } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { errorCls, smallBtn, tdCls, thCls } from "@/lib/ui";

const PAGE = 100;

export default function UnmatchedTab() {
  const [page, setPage] = useState(0);
  const { data, error } = useApi<{ total: number; items: Unmatched[] }>(`/api/admin/unmatched?limit=${PAGE}&offset=${page * PAGE}`);
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE)) : 1;

  return (
    <div className="space-y-3">
      <p className="text-sm text-white/55">
        zasa 데이터 중 채보와 연결하지 못해 저장하지 않은 항목입니다. (INFINITAS 전용곡 등)
          <br></br>
          <span className="ml-1 text-white/35">not_found: 일치하는 곡 없음 / ambiguous: 후보가 둘 이상</span>
      </p>
      {error && <p className={errorCls}>{error}</p>}
      {data && <p className="text-right text-xs text-white/40">총 {data.total}건</p>}
      {data && data.items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/5 text-sm">
            <thead>
              <tr className="bg-th">{["출처", "Title", "Diff.", "사유"].map((h) => <th key={h} className={thCls}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.items.map((m) => (
                <tr key={m.id}>
                  <td className={tdCls}>{m.source}</td>
                  <td className={`${tdCls} [overflow-wrap:anywhere]`}>{m.raw_title}</td>
                  <td className={`${tdCls} text-center`}>{m.difficulty}</td>
                  <td className={`${tdCls} ${m.reason === "ambiguous" ? "text-amber-300" : "text-white/60"}`}>{m.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          <button className={smallBtn} disabled={page === 0} onClick={() => setPage(page - 1)}>‹ Prev</button>
          <span className="text-white/60">{page + 1} / {pages}</span>
          <button className={smallBtn} disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Next ›</button>
        </div>
      )}
    </div>
  );
}
