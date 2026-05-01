import {
  Activity,
  Crown,
  CloudRain,
  Gavel,
  type LucideIcon,
} from "lucide-react";

export type ExtraFeature = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  status: "ready" | "soon";
};

export const EXTRA_FEATURES: readonly ExtraFeature[] = [
  {
    slug: "tournament-simulator",
    title: "Tournament Simulator",
    tagline: "Monte Carlo · 10,000 sims",
    description:
      "Run 10,000 bracket simulations over a knockout tournament. See each team's advancement probability and final-winner odds.",
    icon: Crown,
    status: "ready",
  },
  {
    slug: "momentum",
    title: "Match Momentum",
    tagline: "Rolling 5-min xG",
    description:
      "Track in-game momentum minute by minute with a 5-minute rolling xG window. Spot the swing moments.",
    icon: Activity,
    status: "ready",
  },
  {
    slug: "referee-bias",
    title: "Referee Bias",
    tagline: "Cards · big-game effect",
    description:
      "Average cards per match per referee, with a big-game comparison toggle so you can see who tightens up under pressure.",
    icon: Gavel,
    status: "ready",
  },
  {
    slug: "weather",
    title: "Weather Impact",
    tagline: "Open-Meteo-style buckets",
    description:
      "Home-win rate split by weather: rain / heat / wind / clear. Filter by league and competition tier.",
    icon: CloudRain,
    status: "ready",
  },
] as const;
