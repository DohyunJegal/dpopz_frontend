import type { Metadata } from "next";
import Link from "next/link";
import Title from "@/components/Title";

export const metadata: Metadata = { title: "About - Double Play Optionz" };

const SECTIONS: { heading: string; lines: string[] }[] = [
  { heading: "DPOPz", lines: ["Subby (@Subby_AJ)"] },
  {
    heading: "채보 옵션 데이터 제공",
    lines: ["XYZ012", "1899", "HATO40", "BeatmaniaIIDX UM Option DATABASE_EPOLIS with Team. DXER"],
  },
  { heading: "비공식 난이도(Lv.x) 데이터", lines: ["SNJ@KMZS beatmaniaIIDX DP非公式難易度表 (zasa.sakura.ne.jp/dp)"] },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-[92%] max-w-xl flex-col items-center gap-8">
      <Title />
      <Link href="/how2use" className="-mt-3 text-sm text-orange-400 underline hover:text-orange-300">
        How to use DPOPz?
      </Link>
      <div className="w-full space-y-6 rounded-md border border-white/15 bg-white/5 p-7">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-1.5 text-sm text-white/45">{s.heading}</h2>
            {s.lines.map((l) => <p key={l} className="leading-relaxed text-white/90">{l}</p>)}
          </section>
        ))}
      </div>
    </div>
  );
}
