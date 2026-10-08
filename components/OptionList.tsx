import type { Opt, OptionCombo } from "@/lib/api";
import { OPT_ABBR, OPT_COLOR } from "@/lib/options";

type Combo = Pick<OptionCombo, "flip" | "left" | "right">;

function Part({ value }: { value: Opt }) {
  return (
    <span className={OPT_COLOR[value]}>
      <span className="hidden sm:inline">{value}</span>
      <span className="sm:hidden">{OPT_ABBR[value]}</span>
    </span>
  );
}

/** `FLIP, 1p/2p` 형태, FLIP은 꺼져 있으면 생략 */
export function OptionText({ flip, left, right }: Combo) {
  return (
    <span>
      {flip === "FLIP" && (
        <>
          <span>
            <span className="hidden sm:inline">FLIP</span>
            <span className="sm:hidden">{OPT_ABBR.FLIP}</span>
          </span>
          ,{" "}
        </>
      )}
      <Part value={left} />/<Part value={right} />
    </span>
  );
}

/** 순위, 신뢰도가 붙은 옵션 목록 */
export function OptionList({ options }: { options: OptionCombo[] }) {
  if (options.length === 0) return <span className="text-neutral-600">-</span>;
  return (
    <ul className="leading-[1.8]">
      {options.map((o) => (
        <li key={`${o.flip}-${o.left}-${o.right}`}>
          <span className="text-neutral-400">
            [{o.rank}
            {o.pt !== null ? ` : ${o.pt}pt` : ""}]{" "}
          </span>
          <OptionText flip={o.flip} left={o.left} right={o.right} />
        </li>
      ))}
    </ul>
  );
}
