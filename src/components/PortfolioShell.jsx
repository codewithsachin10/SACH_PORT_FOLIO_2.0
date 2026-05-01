"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GridBackground from "@/components/GridBackground";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function PortfolioShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnalyticsTracker />
      <GridBackground />
      <CustomCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
