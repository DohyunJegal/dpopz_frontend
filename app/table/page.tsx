import type { Metadata } from "next";
import TableView from "@/components/TableView";

export const metadata: Metadata = { title: "Table - Double Play Optionz" };

export default function TablePage() {
  return <TableView />;
}
