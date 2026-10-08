"use client";

import { useEffect, useState } from "react";
import ChartModal from "@/components/ChartModal";
import ChartTable from "@/components/ChartTable";
import { api, type SortKey, type SortOrder } from "@/lib/api";
import { useCharts } from "@/lib/useCharts";

const PAGE = 100;
const LEVELS = [12, 11];
// 머리글을 처음 누를 때의 방향
const FIRST_ORDER: Record<SortKey, SortOrder> = { version: "asc", title: "asc", diff: "asc", level: "desc", lvx: "desc" };

const inputCls = "rounded border border-white/30 bg-white/10 px-3 py-2 text-sm outline-none focus:border-white/60";

export default function TableView() {
  const [level, setLevel] = useState<number | undefined>(12);
  const [version, setVersion] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("lvx");
  const [order, setOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(0);
  const [versions, setVersions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    api<string[]>("/api/versions").then(setVersions).catch(() => {});
  }, []);

  const { data, error, loading } = useCharts({
    q: q.trim(), level, version, sort, order, limit: PAGE, offset: page * PAGE,
  });
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE)) : 1;
  const filter = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(0); };
  const onSort = (key: SortKey) => {
    if (key === sort) setOrder(order === "asc" ? "desc" : "asc");
    else { setSort(key); setOrder(FIRST_ORDER[key]); }
    setPage(0);
  };

  return (
    <div className="mx-auto w-[calc(100%-1.5rem)] max-w-[980px] space-y-4 pb-6 sm:w-[95%]">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1">
          {[undefined, ...LEVELS].map((lv) => (
            <button
              key={lv ?? "all"}
              type="button"
              onClick={() => filter(setLevel)(lv)}
              className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                level === lv ? "border-white/85 bg-white/15" : "border-white/30 text-white/70 hover:bg-white/10"
              }`}
            >
              {lv === undefined ? "ALL" : `☆${lv}`}
            </button>
          ))}
        </div>
        <select value={version} onChange={(e) => filter(setVersion)(e.target.value)} className={inputCls}>
          <option value="" className="bg-neutral-700 text-white">All versions</option>
          {versions.map((v) => (
            <option key={v} value={v} className="bg-neutral-700 text-white">{v}</option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => filter(setQ)(e.target.value)}
          placeholder="Title 검색..."
          className={`${inputCls} min-w-40 flex-1`}
        />
      </div>

      {error && <p className="text-center text-red-300">{error}</p>}
      {loading && !data && <p className="text-center tracking-widest text-white/35">Loading...</p>}
      {data && (
        <div className={loading ? "opacity-50" : ""}>
          <p className="mb-2 text-right text-sm text-white/50">{data.total}곡</p>
          <ChartTable charts={data.items} onSelect={setSelected} sort={{ key: sort, order, onSort }} />
          {pages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm">
              <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)}
                className="cursor-pointer rounded border border-white/30 px-3 py-1 disabled:opacity-30">‹ Prev</button>
              <span className="text-white/60">{page + 1} / {pages}</span>
              <button type="button" disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}
                className="cursor-pointer rounded border border-white/30 px-3 py-1 disabled:opacity-30">Next ›</button>
            </div>
          )}
        </div>
      )}
      <ChartModal id={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
