"use client";

import { useEffect, useState } from "react";
import { api, chartQueryString, type ChartList, type ChartQuery } from "@/lib/api";

/** 조건이 바뀌면 250ms 뒤 다시 조회, enabled=false 면 조회하지 않음 */
export function useCharts(params: ChartQuery, enabled = true) {
  const key = chartQueryString(params);
  const [state, setState] = useState<{ key: string; data?: ChartList; error?: string }>({ key: "" });

  useEffect(() => {
    if (!enabled) return;
    const ctl = new AbortController();
    const timer = setTimeout(() => {
      api<ChartList>(`/api/charts?${key}`, { signal: ctl.signal })
        .then((data) => setState({ key, data }))
        .catch((e) => {
          if (e.name !== "AbortError") setState({ key, error: e.message });
        });
    }, 250);
    return () => {
      clearTimeout(timer);
      ctl.abort();
    };
  }, [key, enabled]);

  const current = state.key === key;
  return {
    data: current ? state.data : undefined,
    error: current ? state.error : undefined,
    loading: enabled && !current,
  };
}
