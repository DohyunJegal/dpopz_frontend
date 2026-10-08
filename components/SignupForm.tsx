"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Title from "@/components/Title";
import { ApiError, api } from "@/lib/api";
import { LANGS, SIGNUP, type Lang } from "@/lib/i18n";
import { buttonCls, errorCls, inputCls, successCls } from "@/lib/ui";

export default function SignupForm() {
  const [lang, setLang] = useState<Lang>("ko");
  const t = SIGNUP[lang];
  const [f, setF] = useState({ loginId: "", password: "", confirm: "", iidx: "", email: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const iidx = f.iidx.replace(/-/g, "");
    // 서버와 같은 규칙으로 먼저 검사
    if (!/^[A-Za-z0-9_.-]{4,20}$/.test(f.loginId)) return setError(t.errId);
    if (f.password.length < 6 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password)) return setError(t.errPw);
    if (f.password !== f.confirm) return setError(t.errMatch);
    if (!/^\d{8}$/.test(iidx)) return setError(t.errIidx);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setError(t.errEmail);

    setBusy(true);
    setError("");
    try {
      await api("/api/signup", {
        method: "POST",
        body: JSON.stringify({ login_id: f.loginId, password: f.password, iidx_id: iidx, email: f.email }),
      });
      setDone(true);
      setBusy(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t.errServer);
      setBusy(false);
    }
  }

  const field = (label: string, key: keyof typeof f, hint: string, props: React.ComponentProps<"input"> = {}) => (
    <label className="flex flex-col gap-1.5 text-sm text-white/50">
      {label}
      <input value={f[key]} onChange={set(key)} disabled={done} className={inputCls} {...props} />
      <span className="text-xs text-white/30">{hint}</span>
    </label>
  );

  return (
    <div className="mx-auto flex w-[92%] max-w-md flex-col items-center gap-6 pb-8">
      <Title />
      <div className="flex gap-1">
        {LANGS.map(({ code, label }) => (
          <button key={code} type="button" onClick={() => setLang(code)}
            className={`cursor-pointer rounded border px-3 py-1 text-xs ${lang === code ? "border-white/80 bg-white/15" : "border-white/25 text-white/50"}`}>
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="flex w-full flex-col gap-4 rounded-md border border-white/15 bg-white/5 p-6">
        <h2 className="border-b border-white/10 pb-3 text-center text-lg font-normal text-white/50">Sign Up</h2>
        {field(t.labelId, "loginId", t.hintId, { autoComplete: "username" })}
        {field(t.labelPw, "password", t.hintPw, { type: "password", autoComplete: "new-password" })}
        {field(t.labelPwConfirm, "confirm", "", { type: "password", autoComplete: "new-password" })}
        {field(t.labelIidx, "iidx", t.hintIidx, { inputMode: "numeric", maxLength: 10 })}
        {field(t.labelEmail, "email", t.hintEmail, { type: "email", autoComplete: "email" })}

        <div className="space-y-2 rounded border border-amber-600/30 bg-amber-900/10 p-3 text-xs leading-relaxed text-white/60">
          <p className="font-bold text-amber-300/90">{t.termsTitle}</p>
          <ul className="space-y-1.5">{t.terms.map((x) => <li key={x}>{x}</li>)}</ul>
          <label className="flex cursor-pointer items-center gap-2 pt-1 text-white/80">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} disabled={done} />
            {t.termsCheck}
          </label>
        </div>

        {error && <p className={errorCls}>{error}</p>}
        {done && <p className={successCls}>{t.success}</p>}
        <button type="submit" disabled={!agreed || busy || done} className={buttonCls}>
          {busy ? t.sending : t.request}
        </button>
        <Link href="/login" className="text-center text-sm text-white/50 hover:text-white">{t.back}</Link>
      </form>
    </div>
  );
}
