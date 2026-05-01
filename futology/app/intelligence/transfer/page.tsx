import type { Metadata } from "next";
import { TransferOracleView } from "./TransferOracleView";

export const metadata: Metadata = { title: "Transfer Oracle" };

export default function TransferPage() {
  return <TransferOracleView />;
}
