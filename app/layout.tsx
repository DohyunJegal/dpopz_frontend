import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

// 일본어 곡명은 이전 사이트와 같은 Noto Sans JP 로, JP 에 없는 한글만 Noto Sans KR 로 채운다.
// 글자 수가 많은 CJK 글꼴이라 preload 는 끄고 쓰는 조각만 불러온다.
const notoSansJP = Noto_Sans_JP({ display: "swap", preload: false, variable: "--font-noto-sans-jp" });
const notoSansKR = Noto_Sans_KR({ display: "swap", preload: false, variable: "--font-noto-sans-kr" });

export const metadata: Metadata = {
  title: "Double Play Optionz",
  description: "beatmania IIDX DP 배치(옵션) 통계 사이트",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansJP.variable} ${notoSansKR.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1 pt-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
