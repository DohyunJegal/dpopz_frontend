import type { Metadata } from "next";
import MyPage from "@/components/MyPage";

export const metadata: Metadata = { title: "My Page - Double Play Optionz" };

export default function Page() {
  return <MyPage />;
}
