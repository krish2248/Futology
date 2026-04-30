"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type DemoNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const SEED: DemoNotification[] = [
  {
    id: "n1",
    title: "Match starting soon",
    body: "Manchester United vs Liverpool kicks off in 15 minutes.",
    time: "Just now",
    read: false,
  },
  {
    id: "n2",
    title: "AI prediction ready",
    body: "Real Madrid vs Barcelona — predicted 2-1 (54% confidence).",
    time: "12 min ago",
    read: false,
  },
  {
    id: "n3",
    title: "Welcome to FUTOLOGY",
    body: "Real notifications wire up via Supabase Realtime in Phase 5.",
    time: "2 hr ago",
    read: true,
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(SEED);
  const containerRef = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={
          unread > 0
            ? `Notifications, ${unread} unread`
            : "Notifications"
        }
        aria-expanded={open}
        className="relative grid h-9 w-9 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 ? (
          <span
            aria-hidden
            className="tabular absolute -right-0.5 -top-0.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-bg-primary"
          >
            {unread}
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="surface-elevated absolute right-0 top-11 z-40 w-80 overflow-hidden md:w-96"
            role="dialog"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-medium">Notifications</p>
              {unread > 0 ? (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary"
                >
                  <Check className="h-3 w-3" aria-hidden /> Mark all read
                </button>
              ) : null}
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-text-muted">
                  You&apos;re all caught up 🎉
                </li>
              ) : (
                items.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      "border-b border-border px-4 py-3 last:border-b-0",
                      !n.read && "bg-accent-muted/30",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read ? (
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                      ) : (
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="mt-0.5 text-xs text-text-secondary">
                          {n.body}
                        </p>
                        <p className="mt-1 text-[11px] text-text-muted">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-border px-4 py-2 text-center text-[11px] text-text-muted">
              Realtime via Supabase wires up in Phase 5
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
