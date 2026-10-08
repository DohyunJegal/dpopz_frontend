"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ReportsTab from "@/components/admin/ReportsTab";
import SyncTab from "@/components/admin/SyncTab";
import UnmatchedTab from "@/components/admin/UnmatchedTab";
import UsersTab from "@/components/admin/UsersTab";
import VotesTab from "@/components/admin/VotesTab";

const TABS = [
  { key: "users", label: "Users", view: UsersTab },
  { key: "votes", label: "Votes", view: VotesTab },
  { key: "sync", label: "zasa Sync", view: SyncTab },
  { key: "unmatched", label: "Unmatched", view: UnmatchedTab },
  { key: "reports", label: "Reports", view: ReportsTab },
];

export default function AdminPage() {
  const router = useRouter();
  const { me, loading } = useAuth();
  const [tab, setTab] = useState("users");

  useEffect(() => {
    if (!loading && !me) router.replace("/login?next=/admin");
  }, [loading, me, router]);

  if (!me) return <p className="py-16 text-center tracking-widest text-white/35">Loading...</p>;
  if (!me.is_admin) return <p className="py-16 text-center text-red-300">관리자 권한이 필요합니다.</p>;

  const View = TABS.find((t) => t.key === tab)!.view;
  return (
    <div className="mx-auto w-[96%] max-w-6xl space-y-5 pb-8">
      <h1 className="border-b border-white/10 pb-2 text-sm tracking-wider text-white/50">ADMIN</h1>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`cursor-pointer rounded border px-4 py-2 ${tab === t.key ? "border-white/85 bg-white/15" : "border-white/30 text-white/70 hover:bg-white/10"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <View />
    </div>
  );
}
