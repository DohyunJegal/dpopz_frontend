import type { Chart, SortKey, SortOrder } from "@/lib/api";
import { DIFF_COLOR, DIFF_LABEL } from "@/lib/options";
import { OptionList } from "@/components/OptionList";

interface SortState {
  key: SortKey;
  order: SortOrder;
  onSort: (key: SortKey) => void;
}

interface Props {
  charts: Chart[];
  onSelect: (id: number) => void;
  sort?: SortState;
}

const TH = "border border-neutral-600 bg-th p-0 text-[9.5pt] font-bold sm:text-[10.5pt]";
const TD = "border border-neutral-700 px-0.5 py-[5px] sm:px-1 sm:py-[7px]";

export default function ChartTable({ charts, onSelect, sort }: Props) {
  const head = (key: SortKey, label: string, cls: string) => {
    const active = sort?.key === key;
    return (
      <th className={`${TH} ${cls}`} aria-sort={active ? (sort.order === "asc" ? "ascending" : "descending") : undefined}>
        {sort ? (
          <button
            type="button"
            onClick={() => sort.onSort(key)}
            title={`${label} 순으로 정렬`}
            className="w-full cursor-pointer px-1 py-1.5 font-bold hover:bg-white/10 sm:py-2"
          >
            {label}
            {active && <span className="ml-0.5 text-[10px]">{sort.order === "asc" ? "▲" : "▼"}</span>}
          </button>
        ) : (
          <span className="block px-1 py-1.5 sm:py-2">{label}</span>
        )}
      </th>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse bg-white/5 text-center text-[9.5pt] sm:text-[10.5pt]">
        <thead>
          <tr>
            {head("version", "Ver.", "hidden w-[9%] sm:table-cell")}
            {head("title", "Title", "w-[30%] sm:w-[26%]")}
            {head("diff", "Diff.", "w-12 sm:w-[6%]")}
            {head("level", "Lv", "w-9 sm:w-[4%]")}
            {head("lvx", "Lv.x", "hidden w-[6%] sm:table-cell")}
            <th className={`${TH} px-1 py-1.5 sm:py-2`}>Option</th>
            <th className={`${TH} w-14 px-1 py-1.5 sm:py-2`}>Vote</th>
          </tr>
        </thead>
        <tbody>
          {charts.map((c) => (
            <tr key={c.id}>
              <td className={`${TD} hidden text-neutral-400 sm:table-cell`}>{c.version}</td>
              <td className={`${TD} break-words [overflow-wrap:anywhere]`}>{c.title}</td>
              <td className={`${TD} ${DIFF_COLOR[c.difficulty]}`}>{DIFF_LABEL[c.difficulty]}</td>
              <td className={TD}>{c.level}</td>
              <td className={`${TD} hidden text-sky-200 sm:table-cell`}>{c.lvx?.toFixed(1) ?? ""}</td>
              <td className={`${TD} text-left`}>
                <OptionList options={c.options} />
              </td>
              <td className="border border-neutral-700 p-0.5">
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  title="상세 보기"
                  className="cursor-pointer whitespace-nowrap rounded px-1 py-0.5 sm:text-[14pt] text-[12pt] leading-none text-white/70 hover:bg-white/10 hover:text-white"
                >
                  ✎{String(c.votes).padStart(2, "0")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
