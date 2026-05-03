"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AnalyticsTracker() {
  useEffect(() => {
    // Basic visit tracking
    const trackVisit = async () => {
      // Don't track in development
      if (process.env.NODE_ENV === "development") return;

      try {
        const userAgent = window.navigator.userAgent.toLowerCase();
        let device = "desktop";
        if (userAgent.includes("mobile")) device = "mobile";
        else if (userAgent.includes("tablet")) device = "tablet";

        await addDoc(collection(db, "analytics"), {
          timestamp: serverTimestamp(),
          path: window.location.pathname,
          referrer: document.referrer || "direct",
          device: device,
          screen: `${window.innerWidth}x${window.innerHeight}`
        });
      } catch (err) {
        console.error("Analytics error:", err);
      }
    };

    trackVisit();
  }, []);

  return null;
}
