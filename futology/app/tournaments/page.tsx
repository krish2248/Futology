import type { Metadata } from "next";
import { Crown } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = { title: "Tournaments" };

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tournaments"
        description="Major tournaments — UCL, Europa, World Cup, Euros, Copa America and more."
      />
      <EmptyState
        icon={Crown}
        title="Tournament view coming in Phase 2"
        description="Brackets, group standings and ongoing/upcoming/completed filters."
      />
    </div>
  );
}
