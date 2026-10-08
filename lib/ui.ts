// 폼
export const inputCls =
  "w-full rounded border border-white/20 bg-white/10 px-3 py-2.5 text-base outline-none focus:border-white/50";
export const buttonCls =
  "cursor-pointer rounded border border-white/50 px-4 py-2.5 text-base text-white/85 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";
export const errorCls = "rounded border border-red-400/40 bg-red-900/20 px-3 py-2 text-center text-sm text-red-300";
export const successCls =
  "rounded border border-green-500/40 bg-green-900/20 px-3 py-2 text-center text-sm text-green-300";

/** 로그인 후 돌아갈 주소,  같은 사이트 안의 경로만 허용 */
export function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

/** 서버가 주는 UTC 시각('YYYY-MM-DD HH:MM:SS')을 한국 시간 문자열로 */
export function formatTime(utc: string): string {
  return new Date(utc.replace(" ", "T") + "Z").toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });
}

export const thCls = "whitespace-nowrap border border-neutral-600 p-2";
export const tdCls = "border border-neutral-700 p-2 align-top";
export const smallBtn =
  "cursor-pointer rounded border border-white/40 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";
export const dangerBtn =
  "cursor-pointer rounded border border-red-400/50 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/15 disabled:opacity-40";
