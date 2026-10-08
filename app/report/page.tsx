import type { Metadata } from "next";
import ReportForm from "@/components/ReportForm";

export const metadata: Metadata = { title: "Report - Double Play Optionz" };

export default function ReportPage() {
  return <ReportForm />;
}
