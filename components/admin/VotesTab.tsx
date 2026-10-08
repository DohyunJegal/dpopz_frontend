"use client";

import { useState } from "react";
import { OptionText } from "@/components/OptionList";
import { api, type AdminVote, type VoteStatus } from "@/lib/api";
import { DIFF_COLOR, DIFF_LABEL } from "@/lib/options";
import { useApi } from "@/lib/useApi";
import { errorCls, formatTime, smallBtn, tdCls, thCls } from "@/lib/ui";

const STATUSES: VoteStatus[] = ["pending", "approved", "rejected"];

export default function VotesTab() {
  const [status, setStatus] = useState<VoteStatus>("pending");
  const { data, error, reload } = useApi<{ total: number; items: AdminVote[] }>(`/api/admin/votes?status=${status}&limit=100`);
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("");
  const items = data?.items ?? [];

  const toggle = (id: number) => {
    const next = new Set(picked);
    if (!next.delete(id)) next.add(id);
    setPicked(next);
  };
  const review = async (to: "approved" | "rejected") => {
    try {
      await api("/api/admin/votes/review", { method: "POST", body: JSON.stringify({ ids: [...picked], status: to }) });
      setPicked(new Set());
      setMessage("");
      reload();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "실패했습니다.");
    }
  };
  const change = (s: VoteStatus) => { setStatus(s); setPicked(new Set()); };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => change(s)}
            className={`cursor-pointer rounded border px-3 py-1.5 text-sm ${status === s ? "border-white/85 bg-white/15" : "border-white/30 text-white/70"}`}>
            {s}
          </button>
        ))}
        {data && <span className="text-xs text-white/40">{data.total}건 {data.total > items.length && `(앞 ${items.length}건 표시)`}</span>}
        <span className="flex-1" />
        <button className={smallBtn} disabled={picked.size === 0} onClick={() => review("approved")}>선택 승인 ({picked.size})</button>
        <button className={smallBtn} disabled={picked.size === 0} onClick={() => review("rejected")}>선택 거절</button>
      </div>
      {(error || message) && <p className={errorCls}>{error ?? message}</p>}
      {data && items.length === 0 && <p className="py-8 text-center text-white/35">해당하는 투표가 없습니다.</p>}
      {items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/5 text-sm">
            <thead>
              <tr className="bg-th">
                <th className={thCls}>
                  <input type="checkbox" checked={picked.size === items.length}
                    onChange={(e) => setPicked(e.target.checked ? new Set(items.map((v) => v.id)) : new Set())} />
                </th>
                {["작성자", "Title", "Diff.", "Option", "Note", "시각"].map((h) => <th key={h} className={thCls}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id}>
                  <td className={`${tdCls} text-center`}><input type="checkbox" checked={picked.has(v.id)} onChange={() => toggle(v.id)} /></td>
                  <td className={tdCls}>{v.author}</td>
                  <td className={`${tdCls} [overflow-wrap:anywhere]`}>{v.title}</td>
                  <td className={`${tdCls} text-center ${DIFF_COLOR[v.difficulty]}`}>{DIFF_LABEL[v.difficulty]}</td>
                  <td className={tdCls}><OptionText flip={v.flip} left={v.left} right={v.right} /></td>
                  <td className={`${tdCls} text-xs text-white/60 [overflow-wrap:anywhere]`}>{v.comment}</td>
                  <td className={`${tdCls} whitespace-nowrap text-xs text-white/45`}>{formatTime(v.voted_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
