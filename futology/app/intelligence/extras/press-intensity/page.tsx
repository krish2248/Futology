import type { Metadata } from "next";
import { PressIntensityView } from "./PressIntensityView";

export const metadata: Metadata = { title: "Press Intensity" };

export default function PressIntensityPage() {
  return <PressIntensityView />;
}
