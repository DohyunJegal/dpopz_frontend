"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { ApiError, api, type Opt } from "@/lib/api";
import { OPT_COLOR } from "@/lib/options";
import { buttonCls, errorCls, successCls } from "@/lib/ui";

const OPTS: Opt[] = ["OFF", "MIRROR", "RANDOM", "R-RANDOM", "S-RANDOM"];
const MAX_COMMENT = 100;
const chars = (s: string) => Array.from(s);

const WARNING = [
  "투표는 즉시 적용되지 않으며, 관리자 검수 후 반영됩니다. 한 번 투표된 데이터는 취소할 수 없으며, 코멘트 수정 또한 불가능합니다.",
  "Votes are not applied immediately; they are reflected after administrator review. Once submitted, a vote cannot be cancelled and comments cannot be edited.",
  "投票はすぐに反映されず、管理者の審査後に反映されます。一度投票したデータはキャンセルできず、コメントの修正も不可能です。",
];

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  const color = value in OPT_COLOR ? OPT_COLOR[value as Opt] : "text-white";
  return (
    <label className="flex items-center gap-4 text-sm text-white/70">
      <span className="w-20 shrink-0 text-right">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-48 cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-3 py-2 ${color}`}>
        {options.map((o) => <option key={o} value={o} className="text-white">{o}</option>)}
      </select>
    </label>
  );
}

export default function VoteForm({ chartId }: { chartId: number }) {
  const { me, loading } = useAuth();
  const pathname = usePathname();
  const [flip, setFlip] = useState("OFF");
  const [left, setLeft] = useState("OFF");
  const [right, setRight] = useState("OFF");
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (loading) return null;
  if (!me) {
    return (
      <p className="text-center text-sm text-orange-400">
        Please <Link href={`/login?next=${encodeURIComponent(pathname)}`} className="underline">log in</Link> to vote.
      </p>
    );
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSent(false);
    try {
      await api("/api/votes", {
        method: "POST",
        body: JSON.stringify({ chart_id: chartId, flip, left, right, comment: comment.trim() || null }),
      });
      setSent(true);
      setComment("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "서버에 연결할 수 없습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 border-t border-neutral-600 pt-4">
      <h3 className="pb-1 text-lg text-white/90">Vote</h3>
      <Select label="FLIP" value={flip} onChange={setFlip} options={["OFF", "FLIP"]} />
      <Select label="1P(LEFT)" value={left} onChange={setLeft} options={OPTS} />
      <Select label="2P(RIGHT)" value={right} onChange={setRight} options={OPTS} />
      <label className="flex items-start gap-4 text-sm text-white/70">
        <span className="w-20 shrink-0 pt-2 text-right">Note</span>
        <span className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(chars(e.target.value).slice(0, MAX_COMMENT).join(""))}
            placeholder="Comment here"
            className="min-h-16 w-full resize-y rounded border border-neutral-600 bg-neutral-700 px-3 py-2 text-white outline-none focus:border-white/50"
          />
          <span className={`block text-right text-xs ${chars(comment).length >= 90 ? "text-orange-300/80" : "text-white/30"}`}>
            {chars(comment).length} / {MAX_COMMENT}
          </span>
        </span>
      </label>
      <div className="space-y-1.5 rounded border border-amber-600/25 bg-amber-900/10 p-3 text-xs leading-relaxed text-white/55">
        {WARNING.map((w) => <p key={w}>{w}</p>)}
      </div>
      {error && <p className={errorCls}>{error}</p>}
      {sent && <p className={successCls}>투표가 접수되었습니다. 관리자 승인 후 반영됩니다. (My Page에서 상태를 확인할 수 있습니다)</p>}
      <div className="text-center">
        <button type="submit" disabled={busy} className={`${buttonCls} px-10`}>{busy ? "Sending..." : "Submit"}</button>
      </div>
    </form>
  );
}
