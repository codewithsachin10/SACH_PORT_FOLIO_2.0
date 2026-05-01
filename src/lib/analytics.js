import { db } from "@/lib/firebase";
import { 
  collection, addDoc, doc, setDoc, increment, serverTimestamp, 
  getDoc
} from "firebase/firestore";

/**
 * Generate a simple anonymous visitor ID stored in localStorage
 */
function getVisitorId() {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem("_vid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("_vid", id);
  }
  return id;
}

/**
 * Detect device type from user agent
 */
function getDeviceType() {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Track a page view — called on every route change
 */
export async function trackPageView(pathname) {
  try {
    const visitorId = getVisitorId();
    if (!visitorId) return;

    const device = getDeviceType();
    const referrer = document.referrer || "direct";
    const referrerDomain = referrer !== "direct" 
      ? new URL(referrer).hostname.replace("www.", "") 
      : "direct";

    // 1. Log the individual page view
    await addDoc(collection(db, "pageviews"), {
      path: pathname,
      visitorId,
      device,
      referrer: referrerDomain,
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split("T")[0], // "2026-05-01"
    });

    // 2. Increment global counters atomically
    const statsRef = doc(db, "analytics", "totals");
    await setDoc(statsRef, {
      totalPageViews: increment(1),
      lastUpdated: serverTimestamp(),
    }, { merge: true });

    // 3. Increment device counter
    const deviceRef = doc(db, "analytics", "devices");
    await setDoc(deviceRef, {
      [device]: increment(1),
    }, { merge: true });

    // 4. Increment per-page counter
    const pageKey = pathname.replace(/\//g, "_") || "_home";
    const pagesRef = doc(db, "analytics", "pages");
    await setDoc(pagesRef, {
      [pageKey]: increment(1),
    }, { merge: true });

    // 5. Increment referrer counter
    const refKey = referrerDomain.replace(/\./g, "_");
    const refRef = doc(db, "analytics", "referrers");
    await setDoc(refRef, {
      [refKey]: increment(1),
    }, { merge: true });

    // 6. Track unique visitor (only once per visitor)
    const visitorRef = doc(db, "visitors", visitorId);
    const visitorSnap = await getDoc(visitorRef);
    if (!visitorSnap.exists()) {
      await setDoc(visitorRef, {
        firstVisit: serverTimestamp(),
        device,
        referrer: referrerDomain,
      });
      await setDoc(statsRef, {
        totalVisitors: increment(1),
      }, { merge: true });
    }

    // 7. Track daily views
    const today = new Date().toISOString().split("T")[0];
    const dailyRef = doc(db, "analytics_daily", today);
    await setDoc(dailyRef, {
      views: increment(1),
      date: today,
    }, { merge: true });

  } catch (err) {
    // Silently fail — analytics should never break the site
    console.warn("Analytics tracking error:", err);
  }
}

/**
 * Track a click event
 */
export async function trackClick(label) {
  try {
    const statsRef = doc(db, "analytics", "totals");
    await setDoc(statsRef, {
      totalClicks: increment(1),
    }, { merge: true });

    await addDoc(collection(db, "events"), {
      type: "click",
      label,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Click tracking error:", err);
  }
}
