"use client";

import { useEffect, useState } from "react";
import { api, type ChartDetail } from "@/lib/api";
import { DIFF_COLOR, DIFF_LABEL } from "@/lib/options";
import { OptionList, OptionText } from "@/components/OptionList";
import VoteForm from "@/components/VoteForm";

/** 채보 상세 - 옵션 순위와 코멘트, id가 null 이면 닫힌 상태 */
export default function ChartModal({ id, onClose }: { id: number | null; onClose: () => void }) {
  const [state, setState] = useState<{ id: number; chart?: ChartDetail; error?: string } | null>(null);

  useEffect(() => {
    if (id === null) return;
    const ctl = new AbortController();
    api<ChartDetail>(`/api/charts/${id}`, { signal: ctl.signal })
      .then((chart) => setState({ id, chart }))
      .catch((e) => {
        if (e.name !== "AbortError") setState({ id, error: e.message });
      });
    return () => ctl.abort();
  }, [id]);

  useEffect(() => {
    if (id === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [id, onClose]);

  if (id === null) return null;
  const current = state?.id === id ? state : null;
  const chart = current?.chart;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-md border border-white/20 bg-[#2e2e2e]">
        <div className="sticky top-0 flex justify-end border-b border-white/10 bg-[#2e2e2e] px-3 py-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border border-white/30 px-3 py-1 text-sm text-white/70 hover:bg-white/10"
          >
            ✕ Close
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          {!chart && !current?.error && <p className="py-10 text-center tracking-widest text-white/40">Loading...</p>}
          {current?.error && <p className="py-10 text-center text-red-300">{current.error}</p>}
          {chart && (
            <>
              <table className="w-full border-collapse bg-white/5 text-center text-sm">
                <thead>
                  <tr className="bg-th">
                    <th className="border border-neutral-600 p-2">Title</th>
                    <th className="border border-neutral-600 p-2">Diff.</th>
                    <th className="border border-neutral-600 p-2">Lv</th>
                    <th className="border border-neutral-600 p-2">Lv.x</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-700 p-2">{chart.title}</td>
                    <td className={`border border-neutral-700 p-2 ${DIFF_COLOR[chart.difficulty]}`}>
                      {DIFF_LABEL[chart.difficulty]}
                    </td>
                    <td className="border border-neutral-700 p-2">{chart.level}</td>
                    <td className="border border-neutral-700 p-2 text-sky-200">{chart.lvx?.toFixed(1) ?? ""}</td>
                  </tr>
                </tbody>
              </table>

              <section>
                <h3 className="mb-2 text-sm text-white/50">Option</h3>
                <OptionList options={chart.options} />
              </section>

              <section>
                <h3 className="mb-2 text-sm text-white/50">Note</h3>
                {chart.comments.length === 0 ? (
                  <p className="text-white/30">-</p>
                ) : (
                  <ul className="space-y-1.5 text-[13px] leading-relaxed">
                    {chart.comments.map((c, i) => (
                      <li key={i}>
                        <span className="text-white/40">
                          [<OptionText flip={c.flip} left={c.left} right={c.right} />]{" "}
                        </span>
                        <span className="text-white/80">
                          {c.comment}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <VoteForm key={chart.id} chartId={chart.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
