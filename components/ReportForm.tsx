"use client";

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import { buttonCls, errorCls, inputCls, successCls } from "@/lib/ui";

const CATEGORIES = [
  ["bug", "Bug / Error"], ["data", "Data Issue"], ["ui", "UI / Display"], ["other", "Other"],
];
const PAGES = [
  ["index", "Top"], ["table", "Table"], ["vote", "Vote"], ["login", "Login"], ["signup", "Sign Up"],
  ["mypage", "My Page"], ["about", "About"], ["other", "Other / Unknown"],
];

export default function ReportForm() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("other");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!category) return setError("Please select a category.");
    if (!description.trim()) return setError("Please enter a description.");
    setBusy(true);
    setError("");
    try {
      await api("/api/reports", { method: "POST", body: JSON.stringify({ category, page, description }) });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-[92%] max-w-lg flex-col gap-4 rounded-md border border-white/15 bg-white/5 p-7">
      <h2 className="border-b border-white/10 pb-3 text-center text-lg font-normal text-white/50">Report</h2>
      <label className="flex flex-col gap-1.5 text-sm text-white/50">
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={done} className={inputCls}>
          <option value="" className="bg-neutral-700">-- Select --</option>
          {CATEGORIES.map(([v, l]) => <option key={v} value={v} className="bg-neutral-700">{l}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-white/50">
        Page
        <select value={page} onChange={(e) => setPage(e.target.value)} disabled={done} className={inputCls}>
          {PAGES.map(([v, l]) => <option key={v} value={v} className="bg-neutral-700">{l}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-white/50">
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={done} maxLength={1000}
          placeholder="Please describe the issue in detail." className={`${inputCls} min-h-28 resize-y`} />
      </label>
      {error && <p className={errorCls}>{error}</p>}
      {done && <p className={successCls}>Report submitted. Thank you!</p>}
      <button type="submit" disabled={busy || done} className={buttonCls}>{done ? "Done" : busy ? "Sending..." : "Submit"}</button>
    </form>
  );
}
