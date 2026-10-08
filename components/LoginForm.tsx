"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import Title from "@/components/Title";
import { api } from "@/lib/api";
import { buttonCls, errorCls, inputCls, safeNext } from "@/lib/ui";

export default function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const { refresh } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!loginId.trim() || !password) return setError("ID와 비밀번호를 입력해주세요.");
    setBusy(true);
    setError("");
    try {
      await api("/api/login", { method: "POST", body: JSON.stringify({ login_id: loginId.trim(), password }) });
      await refresh();
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "서버에 연결할 수 없습니다.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex w-[90%] max-w-sm flex-col items-center gap-8 pt-4">
      <Title />
      <form onSubmit={submit} className="flex w-full flex-col gap-4 rounded-md border border-white/15 bg-white/5 p-7">
        <h2 className="border-b border-white/10 pb-3 text-center text-lg font-normal text-white/50">Login</h2>
        <label className="flex flex-col gap-1.5 text-sm text-white/50">
          ID
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} autoComplete="username" className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/50">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" className={inputCls} />
        </label>
        {error && <p className={errorCls}>{error}</p>}
        <button type="submit" disabled={busy} className={buttonCls}>
          {busy ? "Verifying..." : "Login"}
        </button>
        <Link href="/signup" className="rounded border border-white/25 py-2.5 text-center text-white/60 hover:bg-white/10 hover:text-white">
          Sign up
        </Link>
      </form>
    </div>
  );
}
