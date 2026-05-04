"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, setDoc, onSnapshot } from "firebase/firestore";
import "./SummitCounter.css";

const NDIGS = 6;
const THEMES = [
  { id: 1, name: "Industrial", swatch: "s1" },
  { id: 2, name: "Minimal", swatch: "s2" },
  { id: 3, name: "Carbon", swatch: "s3" },
  { id: 4, name: "Glass", swatch: "s4" },
  { id: 5, name: "Neon", swatch: "s5" },
  { id: 6, name: "Flat", swatch: "s6" },
];

export default function SummitCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [theme, setTheme] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [effects, setEffects] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [hasContributed, setHasContributed] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // Check local contribution status
    const contributed = localStorage.getItem("sgc_contributed");
    if (contributed) {
      setHasContributed(true);
    }

    // Total Count Listener
    const totalDocRef = doc(db, "stats", "visitors");
    const unsubscribeTotal = onSnapshot(totalDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTotalCount(docSnap.data().total || 0);
      } else {
        setDoc(totalDocRef, { total: 0 });
      }
    });

    // Today's Count Listener
    const todayKey = new Date().toISOString().slice(0, 10);
    const todayDocRef = doc(db, "stats", `daily_${todayKey}`);
    const unsubscribeToday = onSnapshot(todayDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTodayCount(docSnap.data().count || 0);
      } else {
        setDoc(todayDocRef, { count: 0 });
      }
    });

    return () => {
      unsubscribeTotal();
      unsubscribeToday();
    };
  }, []);

  const handleLevelClick = async () => {
    if (isPressed) return;
    setIsPressed(true);
    setSessionCount(prev => prev + 1);

    // Only update global/today totals if NOT already contributed
    if (!hasContributed) {
      try {
        const totalDocRef = doc(db, "stats", "visitors");
        const todayKey = new Date().toISOString().slice(0, 10);
        const todayDocRef = doc(db, "stats", `daily_${todayKey}`);

        updateDoc(totalDocRef, { total: increment(1) });
        updateDoc(todayDocRef, { count: increment(1) });
        
        // Lock contribution for this user
        setHasContributed(true);
        localStorage.setItem("sgc_contributed", "true");
      } catch (err) {
        console.error("Firebase Sync Error:", err);
      }
    }

    // Spawn FX (Visual only)
    if (containerRef.current) {
      const rect = containerRef.current.querySelector(".lv-knob").getBoundingClientRect();
      const newFx = {
        id: Date.now(),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      setEffects(prev => [...prev, newFx]);
      setTimeout(() => setEffects(prev => prev.filter(f => f.id !== newFx.id)), 1000);
    }

    setTimeout(() => setIsPressed(false), 200);
  };

  if (!mounted) return null;

  return (
    <div className={`summit-wrapper t${theme}`}>
      {/* Backgrounds */}
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className={`summit-bg bg-${num} ${theme === num ? "" : "hidden"}`}>
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 300 L0 200 L80 170 L200 150 L310 110 L420 140 L520 90 L620 120 L720 75 L820 105 L920 80 L1020 110 L1120 90 L1200 115 L1200 300Z" fill="rgba(160,190,220,.3)"/>
            <path d="M720 75 L705 100 L737 97Z" fill="rgba(255,255,255,.7)"/>
            <path d="M520 90 L507 112 L535 109Z" fill="rgba(255,255,255,.65)"/>
            <path d="M0 300 L0 240 L150 225 L350 230 L550 215 L750 220 L950 215 L1200 225 L1200 300Z" fill="rgba(130,170,210,.5)"/>
          </svg>
        </div>
      ))}

      {/* FX Layer */}
      <div className="fx-layer">
        <AnimatePresence>
          {effects.map(fx => (
            <motion.div 
              key={fx.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -150, scale: 1.2 }}
              className="num-fx"
              style={{ left: fx.x, top: fx.y, transform: 'translateX(-50%)' }}
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="scene" ref={containerRef}>
        <div className="stats">
          <div><span className="stat-n">{todayCount.toLocaleString()}</span><span className="stat-l">Today</span></div>
          <div className="sdiv"></div>
          <div><span className="stat-n">{totalCount.toLocaleString()}</span><span className="stat-l">All Time</span></div>
          <div className="sdiv"></div>
          <div><span className="stat-n">{sessionCount.toLocaleString()}</span><span className="stat-l">Session</span></div>
        </div>

        <p className="hint" style={{ fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', textAlign: 'center', marginBottom: '.6rem' }}>
          Pull the red lever — every click is counted
        </p>

        <div className="pole">
          <div className="pole-seg pt"></div>
          <div className="bracket"></div>

          <div className={`counter ${isPressed ? 'pressed' : ''}`} onClick={handleLevelClick}>
            <div className="rivet rtl"></div><div className="rivet rtr"></div>
            <div className="rivet rbl"></div><div className="rivet rbr"></div>

            <div className="lever">
              <div className="lv-knob"></div>
              <div className="lv-arm"></div>
              <div className="lv-base"></div>
            </div>

            <div className="shell">
              <div className="digit-housing">
                <div className="drums-row">
                  {String(totalCount).padStart(NDIGS, '0').split('').map((digit, i) => {
                    const elements = [];
                    if (i === 3) elements.push(<div key={`sep-${i}`} className="drum-sep" />);
                    elements.push(
                      <div key={i} className="drum">
                        <div 
                          className="drum-strip"
                          style={{ transform: `translateY(-${(9 - parseInt(digit)) * 74}px)` }}
                        >
                          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n, idx) => (
                            <div key={idx} className="drum-digit">{n}</div>
                          ))}
                        </div>
                      </div>
                    );
                    return elements;
                  })}
                </div>
              </div>

              <div className="info-plate">
                <div className="plate-left">
                  <svg className="mountain-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 34 L14 14 L19 20 L24 10 L36 34Z" fill="currentColor" />
                    <path d="M24 10 L20 16 L24 15 L28 16Z" fill="rgba(255,255,255,.4)"/>
                  </svg>
                  <div><div className="plate-title">SG. Portfolio</div></div>
                </div>
                <div className="plate-right">
                  <div className="plate-title">CLIMB HIGHER</div>
                  <div className="plate-sub">Trust the climb.</div>
                  <div className="plate-sub2">Enjoy the view.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bracket"></div>
          <div className="pole-seg pb"></div>

          <div className="elev">
            <div className="elev-n">{totalCount.toLocaleString()}</div>
            <div className="elev-u">visitors</div>
          </div>
        </div>

        {/* Theme Picker */}
        <div className="picker">
          <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: '10px' }}>✦ Choose your style</div>
          <div className="picker-grid">
            {THEMES.map((t) => (
              <button key={t.id} className={`theme-btn ${theme === t.id ? 'active' : ''}`} onClick={() => setTheme(t.id)}>
                <div className={`swatch ${t.swatch}`}></div>
                <span className="theme-name">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
