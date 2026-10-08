"use client";

import { useState } from "react";
import ChartModal from "@/components/ChartModal";
import ChartTable from "@/components/ChartTable";
import Title from "@/components/Title";
import { useCharts } from "@/lib/useCharts";

export default function SearchView() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const searching = q.trim().length > 0;
  const { data, error, loading } = useCharts({ q: q.trim(), limit: 50 }, searching);

  return (
    <div className="mx-auto flex w-[94%] max-w-3xl flex-col items-center gap-5 pt-6">
      <Title />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Title 검색..."
        autoFocus
        className="w-full max-w-lg rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base outline-none focus:border-white/60"
      />

      <div className="mt-4 w-full">
        {loading && <p className="text-center tracking-widest text-white/35">Loading...</p>}
        {error && <p className="text-center text-red-300">{error}</p>}
        {searching && data && data.items.length === 0 && <p className="text-center">검색 결과가 없습니다.</p>}
        {data && data.items.length > 0 && (
          <>
            <ChartTable charts={data.items} onSelect={setSelected} />
            {data.total > data.items.length && (
              <p className="mt-3 text-center text-sm text-white/50">
                {data.total}건 중 {data.items.length}건만 표시됩니다. 검색어를 더 구체적으로 입력해주세요.
              </p>
            )}
          </>
        )}
      </div>
      <ChartModal id={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
