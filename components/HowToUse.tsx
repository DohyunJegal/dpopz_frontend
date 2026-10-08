"use client";

import { useState } from "react";
import { LANGS, type Lang } from "@/lib/i18n";

interface Doc {
  what: string; whatBody: string[];
  how: string;
  items: [string, string[]][];
  levels: { head: [string, string, string]; rows: [string, string, string][]; note: string };
}

const DOCS: Record<Lang, Doc> = {
  ko: {
    what: "DPOPz (Double Play Optionz)란?",
    whatBody: [
      "DPOPz는 Double Player들을 위한 배치표 자료 통계 사이트입니다.",
      "의견 제안을 통해 다른 DPer들, 특히 초심자들을 위한 배치 가이드라인으로 사용하기 위해 제작된 페이지입니다.",
    ],
    how: "웹 페이지 사용 방법",
    items: [
      ["Top", ["곡명을 검색하면 해당 곡에 사용된 배치들의 분포도가 표시됩니다.", "✎ 버튼에서 상세 정보를 보고 투표할 수 있습니다. (투표를 위해서는 가입이 필요합니다.)"]],
      ["Table", ["데이터가 수집된 모든 곡을 열람할 수 있습니다."]],
      ["How to Read", [
        "[1 : 00pt] 숫자 1은 우선 순위를 나타냅니다.",
        "pt는 옵션에 대한 신뢰도 점수이며, ereter.net 값(★)이 높을수록 부여되는 점수가 높아집니다.",
        "pt를 기반으로 우선 순위가 결정되며, pt가 없는 데이터는 득표 수 순으로 표시됩니다.",
      ]],
      ["Vote", ["투표는 관리자 검수 후 반영됩니다. 한 번 투표한 데이터는 취소하거나 수정할 수 없습니다.", "My Page에서 내 투표의 처리 상태를 확인할 수 있습니다."]],
      ["Report", ["사이트에 오류가 있을 경우 Report 페이지로 보고를 부탁드립니다."]],
    ],
    levels: {
      head: ["레벨", "집계 대상", "집계 여부"],
      rows: [["☆12", "AC 전체 보면", "집계"], ["☆11", "AC 전체 보면", "집계"]],
      note: "*추후 INFINITAS 추가 예정",
    },
  },
  ja: {
    what: "DPOPz (Double Play Optionz)とは？",
    whatBody: [
      "DPOPzは、Double Playerのための配置統計サイトです。",
      "ご意見の提案を通じて、他のDPerたち、特に初心者のための配置ガイドラインとして活用することを目的として制作されたページです。",
    ],
    how: "ウェブページの使い方",
    items: [
      ["Top", ["曲名を検索すると、その曲で使用された配置の分布が表示されます。", "✎ボタンから詳細を確認し、投票できます。(投票には登録が必要です。)"]],
      ["Table", ["データが収集された全曲を閲覧できます。"]],
      ["How to Read", [
        "[1 : 00pt] 「1」は優先順位です。",
        "ptはオプションに対する信頼度スコアで、ereter.netの値(★)が高いほど付与されるポイントが高くなります。",
        "ptの合計を元に優先順位が決定され、ptのないデータは得票数順に表示されます。",
      ]],
      ["Vote", ["投票は管理者の審査後に反映されます。一度投票したデータはキャンセル・修正できません。", "My Pageで投票の処理状況を確認できます。"]],
      ["Report", ["サイトに不具合がある場合は、Reportページからご報告をお願いします。"]],
    ],
    levels: {
      head: ["レベル", "集計対象", "集計状況"],
      rows: [["☆12", "AC 全譜面", "集計中"], ["☆11", "AC 全譜面", "集計中"]],
      note: "*今後INFINITASを追加予定",
    },
  },
  en: {
    what: "What is DPOPz (Double Play Optionz)?",
    whatBody: [
      "DPOPz is a chart option statistics site for Double Players.",
      "It is designed to serve as an option placement guideline for other DPers, especially beginners, through suggestions from the community.",
    ],
    how: "How to use",
    items: [
      ["Top", ["Search for a song title to see the distribution of options used for it.", "Open the ✎ button for details and to vote. (Sign-up is required to vote.)"]],
      ["Table", ["Browse every song with collected data."]],
      ["How to Read", [
        "[1 : 00pt] The number 1 represents the priority.",
        "pt is the reliability score of the option: the higher the ereter.net value (★), the more points are given.",
        "Priority is determined by pt; options without pt are ordered by number of votes.",
      ]],
      ["Vote", ["Votes are reflected after administrator review. A submitted vote cannot be cancelled or edited.", "You can check the status of your votes on My Page."]],
      ["Report", ["If you encounter any issues on this site, please submit a report via the Report page."]],
    ],
    levels: {
      head: ["Level", "Target Charts", "Status"],
      rows: [["☆12", "All AC Charts", "Active"], ["☆11", "All AC Charts", "Active"]],
      note: "*INFINITAS will be added later",
    },
  },
};

export default function HowToUse() {
  const [lang, setLang] = useState<Lang>("ko");
  const d = DOCS[lang];
  return (
    <div className="mx-auto w-[92%] max-w-2xl space-y-6 pb-8">
      <div className="flex justify-center gap-1">
        {LANGS.map(({ code, label }) => (
          <button key={code} type="button" onClick={() => setLang(code)}
            className={`cursor-pointer rounded border px-3 py-1 text-xs ${lang === code ? "border-white/80 bg-white/15" : "border-white/25 text-white/50"}`}>
            {label}
          </button>
        ))}
      </div>
      <section className="space-y-2 rounded-md border border-white/15 bg-white/5 p-6">
        <h2 className="text-lg text-white/90">{d.what}</h2>
        {d.whatBody.map((l) => <p key={l} className="leading-relaxed text-white/70">{l}</p>)}
      </section>
      <section className="space-y-5 rounded-md border border-white/15 bg-white/5 p-6">
        <h2 className="text-lg text-white/90">{d.how}</h2>
        {d.items.map(([name, lines]) => (
          <div key={name}>
            <h3 className="mb-1 text-accent">{name}</h3>
            {lines.map((l) => <p key={l} className="leading-relaxed text-white/70">{l}</p>)}
            {name === "Table" && (
              <table className="mt-3 w-full border-collapse text-center text-sm">
                <thead><tr className="bg-th">{d.levels.head.map((h) => <th key={h} className="border border-neutral-600 p-1.5">{h}</th>)}</tr></thead>
                <tbody>{d.levels.rows.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c} className="border border-neutral-700 p-1.5">{c}</td>)}</tr>)}</tbody>
              </table>
            )}
            {name === "Table" && <p className="mt-1 text-xs text-white/40">{d.levels.note}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
