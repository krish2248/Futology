"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/cards/NewsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  NEWS_ITEMS,
  isPersonalized,
  rankPersonalized,
} from "@/lib/data/demoNews";
import { useSession } from "@/lib/store/session";
import { useIsClient } from "@/hooks/useHydratedSession";

export function HomeNews() {
  const ready = useIsClient();
  const followedClubs = useSession((s) => s.followedClubs);
  const followedPlayers = useSession((s) => s.followedPlayers);
  const followedLeagues = useSession((s) => s.followedLeagues);

  const followed = useMemo(
    () => ({
      clubs: ready ? followedClubs.map((c) => c.id) : [],
      players: ready ? followedPlayers.map((p) => p.id) : [],
      leagues: ready ? followedLeagues.map((l) => l.id) : [],
    }),
    [ready, followedClubs, followedPlayers, followedLeagues],
  );

  const items = useMemo(
    () => rankPersonalized(NEWS_ITEMS, followed).slice(0, 6),
    [followed],
  );

  return (
    <section>
      <PageHeader
        title="News"
        description={
          ready && (followedClubs.length || followedPlayers.length || followedLeagues.length)
            ? "Personalized to what you follow first, then everything else."
            : "Sign in and follow teams to personalize this feed."
        }
        action={
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            All news <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            personalized={ready && isPersonalized(item, followed)}
          />
        ))}
      </div>
    </section>
  );
}
