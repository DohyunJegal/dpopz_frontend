"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { OptionText } from "@/components/OptionList";
import { api, type MyVote, type VoteStatus } from "@/lib/api";
import { DIFF_COLOR, DIFF_LABEL } from "@/lib/options";
import { formatTime } from "@/lib/ui";

const STATUS: Record<VoteStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "text-amber-300" },
  approved: { label: "Approved", cls: "text-green-300" },
  rejected: { label: "Rejected", cls: "text-red-300" },
};

export default function MyPage() {
  const router = useRouter();
  const { me, loading, logout } = useAuth();
  const [state, setState] = useState<{ votes?: MyVote[]; error?: string }>({});

  useEffect(() => {
    if (loading) return;
    if (!me) {
      router.replace("/login?next=/mypage");
      return;
    }
    api<MyVote[]>("/api/me/votes")
      .then((votes) => setState({ votes }))
      .catch((e) => setState({ error: e.message }));
  }, [loading, me, router]);

  if (!me) return <p className="py-16 text-center tracking-widest text-white/35">Loading...</p>;
  const { votes, error } = state;

  return (
    <div className="mx-auto w-[96%] max-w-4xl space-y-5 pb-8">
      <div className="flex items-center justify-between rounded-md bg-[#b5285a] px-5 py-3">
        <span className="tracking-wide">Player, {me.login_id}</span>
        <button type="button" onClick={async () => { await logout(); router.push("/"); }}
          className="cursor-pointer rounded border border-white/50 px-4 py-1.5 text-sm text-white/80 hover:bg-white/10">
          Logout
        </button>
      </div>

      <section>
        <h2 className="mb-3 flex justify-between border-b border-white/10 pb-1.5 text-sm tracking-wider text-white/50">
          VOTE LOG
          {votes && <span className="text-white/35">{votes.length} votes</span>}
        </h2>
        {error && <p className="py-8 text-center text-red-300">{error}</p>}
        {!votes && !error && <p className="py-8 text-center tracking-widest text-white/35">Loading...</p>}
        {votes && votes.length === 0 && <p className="py-10 text-center text-white/30">아직 투표한 기록이 없습니다.</p>}
        {votes && votes.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/5 text-[13px]">
              <thead>
                <tr className="bg-th">
                  {["Timestamp", "Title", "Diff.", "Option", "Note", "Status"].map((h) => (
                    <th key={h} className="whitespace-nowrap border border-neutral-600 p-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {votes.map((v) => (
                  <tr key={v.id}>
                    <td className="whitespace-nowrap border border-neutral-700 p-2 text-xs text-white/45">{formatTime(v.voted_at)}</td>
                    <td className="border border-neutral-700 p-2 [overflow-wrap:anywhere]">{v.title}</td>
                    <td className={`border border-neutral-700 p-2 text-center ${DIFF_COLOR[v.difficulty]}`}>{DIFF_LABEL[v.difficulty]}</td>
                    <td className="border border-neutral-700 p-2"><OptionText flip={v.flip} left={v.left} right={v.right} /></td>
                    <td className="border border-neutral-700 p-2 text-xs text-white/60 [overflow-wrap:anywhere]">{v.comment}</td>
                    <td className={`border border-neutral-700 p-2 text-center ${STATUS[v.status].cls}`}>{STATUS[v.status].label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
