"use client";

import { useState } from "react";
import { api, type SyncRun } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { buttonCls, errorCls, formatTime, successCls, tdCls, thCls } from "@/lib/ui";

export default function SyncTab() {
  const { data: runs, reload } = useApi<SyncRun[]>("/api/admin/sync/runs");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  async function sync() {
    setBusy(true);
    setResult(null);
    try {
      const r = await api<{ parsed: number; added: number; changed: number }>("/api/admin/sync/zasa", { method: "POST" });
      setResult({ ok: true, text: `완료: 파싱 ${r.parsed}개 · 신규 ${r.added} · 변경 ${r.changed}` });
    } catch (e) {
      setResult({ ok: false, text: e instanceof Error ? e.message : "실패했습니다." });
    } finally {
      setBusy(false);
      reload();
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded border border-white/15 bg-white/5 p-4">
        <p className="text-sm text-white/70">
          zasa에서 채보 목록과 비공식 난이도, 버전을 가져와 갱신합니다. 실패하면 DB는 변경되지 않습니다.
        </p>
        <button onClick={sync} disabled={busy} className={buttonCls}>{busy ? "동기화 중..." : "zasa 동기화 실행"}</button>
        {result && <p className={result.ok ? successCls : errorCls}>{result.text}</p>}
      </div>
      <h3 className="text-sm text-white/50">최근 실행 기록</h3>
      {runs && runs.length === 0 && <p className="text-white/35">아직 실행 기록이 없습니다.</p>}
      {runs && runs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/5 text-sm">
            <thead>
              <tr className="bg-th">{["#", "시작", "상태", "신규", "변경", "실행자", "오류"].map((h) => <th key={h} className={thCls}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id}>
                  <td className={tdCls}>{r.id}</td>
                  <td className={`${tdCls} whitespace-nowrap text-xs`}>{formatTime(r.started_at)}</td>
                  <td className={`${tdCls} ${r.status === "ok" ? "text-green-300" : r.status === "failed" ? "text-red-300" : "text-amber-300"}`}>{r.status}</td>
                  <td className={tdCls}>{r.added ?? "-"}</td>
                  <td className={tdCls}>{r.changed ?? "-"}</td>
                  <td className={tdCls}>{r.triggered_by ?? "-"}</td>
                  <td className={`${tdCls} text-xs text-red-300/80 [overflow-wrap:anywhere]`}>{r.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
