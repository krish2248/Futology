"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/store/session";
import { useIsClient } from "@/hooks/useHydratedSession";

const PUBLIC_PATHS = ["/login", "/onboarding"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/**
 * Replaces the previous middleware.ts route protection. We can't use
 * middleware with `output: 'export'` (GitHub Pages), so this client-side
 * component watches the persisted session and redirects to /login when
 * needed. Auth pages are allowlisted.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const ready = useIsClient();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSession((s) => s.user);

  useEffect(() => {
    if (!ready) return;
    if (user) return;
    if (isPublic(pathname)) return;
    const params = new URLSearchParams();
    if (pathname && pathname !== "/") params.set("next", pathname);
    const qs = params.toString();
    router.replace(`/login${qs ? `?${qs}` : ""}`);
  }, [ready, user, pathname, router]);

  return <>{children}</>;
}
