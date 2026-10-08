import type { Metadata } from "next";
import AdminPage from "@/components/AdminPage";

export const metadata: Metadata = { title: "Admin - Double Play Optionz", robots: { index: false } };

export default function Page() {
  return <AdminPage />;
}
