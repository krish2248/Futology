"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogIn,
  LogOut,
  Trophy,
  Shield,
  Users,
  Crown,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import { ProfileSkeleton } from "@/components/shared/ProfileSkeleton";
import { useSession } from "@/lib/store/session";
import { useIsClient } from "@/hooks/useHydratedSession";

export function ProfileView() {
  const ready = useIsClient();
  const router = useRouter();
  const user = useSession((s) => s.user);
  const followedLeagues = useSession((s) => s.followedLeagues);
  const followedClubs = useSession((s) => s.followedClubs);
  const followedPlayers = useSession((s) => s.followedPlayers);
  const followedTournaments = useSession((s) => s.followedTournaments);
  const signOut = useSession((s) => s.signOut);

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  if (!ready) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage who you follow, your predictions and notifications."
      />

      <Card className="flex items-center gap-4">
        <div
          aria-hidden
          className="grid h-14 w-14 place-items-center rounded-full bg-bg-elevated text-text-secondary"
        >
          <User className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          {ready && user ? (
            <>
              <p className="truncate font-medium">{user.displayName}</p>
              <p className="truncate text-sm text-text-secondary">
                {user.email}
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">Guest</p>
              <p className="text-sm text-text-secondary">
                Sign in to follow leagues, save predictions and join leagues.
              </p>
            </>
          )}
        </div>
        {ready && user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
          >
            <LogOut className="h-4 w-4" aria-hidden /> Sign out
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover"
          >
            <LogIn className="h-4 w-4" aria-hidden /> Sign in
          </Link>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Predictions" value="0" />
        <StatTile label="Accuracy" value="—" />
        <StatTile
          label="Leagues"
          value={ready ? String(followedLeagues.length) : "—"}
        />
        <StatTile
          label="Following"
          value={
            ready
              ? String(followedClubs.length + followedPlayers.length)
              : "—"
          }
        />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-medium tracking-wide text-text-secondary">
          Following
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <FollowList
            icon={Trophy}
            title="Leagues"
            count={ready ? followedLeagues.length : 0}
            items={ready ? followedLeagues.map((l) => l.name) : []}
          />
          <FollowList
            icon={Shield}
            title="Clubs"
            count={ready ? followedClubs.length : 0}
            items={ready ? followedClubs.map((c) => c.name) : []}
          />
          <FollowList
            icon={Users}
            title="Players"
            count={ready ? followedPlayers.length : 0}
            items={ready ? followedPlayers.map((p) => p.name) : []}
          />
          <FollowList
            icon={Crown}
            title="Tournaments"
            count={ready ? followedTournaments.length : 0}
            items={ready ? followedTournaments.map((t) => t.name) : []}
          />
        </div>
      </section>

      <Link href="/profile/settings" className="block">
        <Card hover className="flex items-start gap-3">
          <div
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-bg-elevated text-text-secondary"
          >
            <Settings className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium">Settings</p>
            <p className="mt-1 text-sm text-text-secondary">
              Notification preferences, email, theme (always dark), reset demo
              session.
            </p>
          </div>
          <span aria-hidden className="self-center text-text-muted">
            →
          </span>
        </Card>
      </Link>
    </div>
  );
}

function FollowList({
  icon: Icon,
  title,
  count,
  items,
}: {
  icon: typeof Trophy;
  title: string;
  count: number;
  items: string[];
}) {
  const preview = items.slice(0, 3);
  const rest = Math.max(0, count - preview.length);
  return (
    <Card>
      <div className="flex items-center gap-2">
        <div
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-muted text-accent"
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="font-medium">{title}</p>
        <span className="tabular ml-auto rounded bg-bg-elevated px-2 py-0.5 text-xs text-text-secondary">
          {count}
        </span>
      </div>
      {count === 0 ? (
        <p className="mt-3 text-sm text-text-muted">
          Pick some during onboarding.
        </p>
      ) : (
        <p className="mt-3 text-sm text-text-secondary">
          {preview.join(" · ")}
          {rest > 0 ? ` · +${rest} more` : ""}
        </p>
      )}
    </Card>
  );
}
