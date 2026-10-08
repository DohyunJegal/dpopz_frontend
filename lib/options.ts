import type { Opt } from "@/lib/api";

// 옵션 값별 색 (OFF 회색, MIRROR 연두, RANDOM 주황, S-RANDOM 빨강)
export const OPT_COLOR: Record<Opt, string> = {
  OFF: "text-neutral-500",
  MIRROR: "text-green-300",
  RANDOM: "text-orange-400",
  "R-RANDOM": "text-orange-400",
  "S-RANDOM": "text-red-400",
};

// 좁은 화면용 약어
export const OPT_ABBR: Record<Opt | "FLIP", string> = {
  FLIP: "F",
  OFF: "-",
  MIRROR: "M",
  RANDOM: "R",
  "R-RANDOM": "RR",
  "S-RANDOM": "SR",
};

export const DIFF_LABEL = { HYPER: "H", ANOTHER: "A", LEGGENDARIA: "L" } as const;
export const DIFF_COLOR = {
  HYPER: "text-orange-400",
  ANOTHER: "text-white",
  LEGGENDARIA: "text-[#fd067c]",
} as const;
