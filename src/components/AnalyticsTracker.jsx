"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Invisible component that auto-tracks page views on route changes.
 * Place once in the layout — it handles everything.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef(new Set());

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    // Debounce: don't double-track the same path in the same session load
    const key = `${pathname}-${Date.now().toString().slice(0, -3)}`; // ~1s window
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    trackPageView(pathname);
  }, [pathname]);

  return null;
}
