import type { Metadata } from "next";
import { ProfileView } from "./ProfileView";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfileView />
    </ErrorBoundary>
  );
}
