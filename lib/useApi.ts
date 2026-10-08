"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/** GET + reload(). path가 바뀌면 다시 조회 */
export function useApi<T>(path: string) {
  const [state, setState] = useState<{ path: string; data?: T; error?: string }>({ path: "" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;
    api<T>(path)
      .then((data) => alive && setState({ path, data }))
      .catch((e) => alive && setState({ path, error: e.message }));
    return () => {
      alive = false;
    };
  }, [path, tick]);

  const current = state.path === path;
  return {
    data: current ? state.data : undefined,
    error: current ? state.error : undefined,
    reload: () => setTick((t) => t + 1),
  };
}
