import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { EXTRA_FEATURES } from "@/lib/constants/extras";

export const metadata: Metadata = { title: "Extras" };

export default function ExtrasPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/intelligence"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Intelligence Hub
      </Link>
      <PageHeader
        title="Extras"
        description="Wishlist features beyond the core six. Demo data; some hook into Open-Meteo, odds-api or scraped injury feeds in the cutover."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {EXTRA_FEATURES.map((f) => {
          const Icon = f.icon;
          const isReady = f.status === "ready";
          return (
            <Link
              key={f.slug}
              href={`/intelligence/extras/${f.slug}`}
              className="group block"
            >
              <Card hover className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-lg bg-accent-muted text-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-text-muted">
                    {f.tagline}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {f.description}
                  </p>
                </div>
                <div
                  className={
                    isReady
                      ? "mt-auto flex items-center gap-1 text-sm font-medium text-accent"
                      : "mt-auto text-sm text-text-muted"
                  }
                >
                  {isReady ? (
                    <>
                      Open
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  ) : (
                    "Coming soon"
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
