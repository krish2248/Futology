import type { Metadata } from "next";
import { WeatherImpactView } from "./WeatherImpactView";

export const metadata: Metadata = { title: "Weather Impact" };

export default function WeatherImpactPage() {
  return <WeatherImpactView />;
}
