"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

const TABS = [
  { href: "/", label: "Top" },
  { href: "/table", label: "Table" },
  { href: "/about", label: "About" },
  { href: "/report", label: "Report" },
];

export default function Header() {
  const pathname = usePathname();
  const { me, loading } = useAuth();
  const tabs = me?.is_admin ? [...TABS, { href: "/admin", label: "Admin" }] : TABS;
  const authPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="border-b border-white/15">
      <div className="mx-auto flex max-w-[1012px] items-center justify-between gap-3 px-3 pb-2 pt-3 sm:px-4">
        <Link href="/" className="text-xl font-bold tracking-wider">
          <span className="text-accent">DP</span>OPz
        </Link>
        {!loading && me && (
          <Link href="/mypage" title="My Page" className="max-w-40 truncate rounded bg-[#b5285a] px-3 py-1 text-sm">
            {me.login_id}
          </Link>
        )}
        {!loading && !me && !authPage && (
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="rounded bg-[#b5285a] px-3 py-1 text-sm"
          >
            Log in
          </Link>
        )}
      </div>
      <nav className="mx-auto -mb-px flex max-w-[1012px] px-1">
        {tabs.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex-1 border-b-2 py-2.5 text-center sm:flex-none sm:px-8 ${
                active ? "border-accent text-white" : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
