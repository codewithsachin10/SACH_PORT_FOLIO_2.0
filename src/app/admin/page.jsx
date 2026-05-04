"use client";

import { useState, useEffect, useRef } from "react";
import { logout } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, orderBy, limit, getDocs, addDoc, deleteDoc, setDoc, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Edit3, FolderGit2, Mail, 
  BarChart3, Bell, Settings, LogOut, Search, User,
  ArrowRight, Plus, Trash2, ExternalLink, Eye, EyeOff, X, Pencil,
  Upload, Link, Github, Linkedin, Twitter, Instagram,
  Clock, Shield, AlertTriangle, TrendingUp, MousePointerClick,
  Globe, Monitor, Smartphone, Tablet, Code2, ChevronDown,
  Activity, MessageSquare, Sun, Moon, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tech name → Simple Icons slug mapping
const TECH_ICONS = {
  react: "react", "react.js": "react", reactjs: "react",
  next: "nextdotjs", "next.js": "nextdotjs", nextjs: "nextdotjs",
  vue: "vuedotjs", "vue.js": "vuedotjs", vuejs: "vuedotjs",
  angular: "angular",
  svelte: "svelte",
  node: "nodedotjs", "node.js": "nodedotjs", nodejs: "nodedotjs",
  express: "express", "express.js": "express",
  typescript: "typescript", ts: "typescript",
  javascript: "javascript", js: "javascript",
  python: "python",
  java: "openjdk",
  go: "go", golang: "go",
  rust: "rust",
  swift: "swift",
  kotlin: "kotlin",
  dart: "dart",
  flutter: "flutter",
  firebase: "firebase",
  supabase: "supabase",
  mongodb: "mongodb", mongo: "mongodb",
  postgresql: "postgresql", postgres: "postgresql",
  mysql: "mysql",
  redis: "redis",
  prisma: "prisma",
  graphql: "graphql",
  docker: "docker",
  kubernetes: "kubernetes", k8s: "kubernetes",
  aws: "amazonaws",
  gcp: "googlecloud",
  azure: "microsoftazure",
  vercel: "vercel",
  netlify: "netlify",
  tailwind: "tailwindcss", tailwindcss: "tailwindcss", "tailwind css": "tailwindcss",
  css: "css3",
  html: "html5",
  sass: "sass", scss: "sass",
  bootstrap: "bootstrap",
  figma: "figma",
  git: "git",
  github: "github",
  npm: "npm",
  vite: "vite",
  webpack: "webpack",
  stripe: "stripe",
  openai: "openai",
  tensorflow: "tensorflow",
  threejs: "threedotjs", "three.js": "threedotjs",
  electron: "electron",
  redux: "redux",
  zustand: "zustand",
  framer: "framer", "framer motion": "framer",
  "socket.io": "socketdotio", socketio: "socketdotio",
  linux: "linux",
  nginx: "nginx",
  cloudflare: "cloudflare",
};

function getTechSlug(name) {
  return TECH_ICONS[name.toLowerCase()] || null;
}

function TechTag({ name, onRemove }) {
  const slug = getTechSlug(name);
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#1C202B] text-slate-900/70 dark:text-white/70 px-2 py-1 rounded-md border border-slate-200 dark:border-[#2B3040]">
      {slug && (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={name}
          className="w-3.5 h-3.5"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      {name}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 text-slate-900/30 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors">
          <X size={10} />
        </button>
      )}
    </span>
  );
}

// All unique display names for the search dropdown
const TECH_LIST = [...new Set(Object.entries(TECH_ICONS).filter(([key, val]) => {
  // Only include "canonical" names (skip aliases like "js", "ts", "k8s")
  const canonical = ["react", "next.js", "vue", "angular", "svelte", "node.js", "express", 
    "typescript", "javascript", "python", "java", "go", "rust", "swift", "kotlin", "dart",
    "flutter", "firebase", "supabase", "mongodb", "postgresql", "mysql", "redis", "prisma",
    "graphql", "docker", "kubernetes", "aws", "gcp", "azure", "vercel", "netlify",
    "tailwind", "css", "html", "sass", "bootstrap", "figma", "git", "github", "npm",
    "vite", "webpack", "stripe", "openai", "tensorflow", "three.js", "electron",
    "redux", "zustand", "framer", "socket.io", "linux", "nginx", "cloudflare"];
  return canonical.includes(key);
}).map(([key]) => key))];

function TechStackInput({ value, onChange }) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Parse comma-separated string into array
  const selected = value ? value.split(",").map(t => t.trim()).filter(Boolean) : [];
  
  const filtered = search.length > 0 
    ? TECH_LIST.filter(t => 
        t.toLowerCase().includes(search.toLowerCase()) && 
        !selected.some(s => s.toLowerCase() === t.toLowerCase())
      )
    : TECH_LIST.filter(t => !selected.some(s => s.toLowerCase() === t.toLowerCase())).slice(0, 12);

  const addTech = (tech) => {
    const displayName = tech.charAt(0).toUpperCase() + tech.slice(1);
    const newSelected = [...selected, displayName];
    onChange(newSelected.join(", "));
    setSearch("");
  };

  const removeTech = (index) => {
    const newSelected = selected.filter((_, i) => i !== index);
    onChange(newSelected.join(", "));
  };

  return (
    <div>
      <label className="text-xs text-slate-900/40 dark:text-white/40 font-bold uppercase tracking-widest mb-2 block">Tech Stack</label>
      
      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {selected.map((t, i) => (
            <TechTag key={i} name={t} onRemove={() => removeTech(i)} />
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/20 dark:text-white/20" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search technologies..."
          className="w-full bg-slate-50 dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-900/40 dark:text-white/20 focus:border-[#7C3AED]/50 outline-none transition-colors"
        />

        {/* Dropdown */}
        {showDropdown && filtered.length > 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-[#111427] border border-slate-200/10 dark:border-white/10 rounded-xl shadow-2xl max-h-[200px] overflow-y-auto">
            {filtered.map((tech) => {
              const slug = getTechSlug(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => { addTech(tech); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-900/5 dark:bg-white/5 transition-colors text-left"
                >
                  {slug && (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={tech}
                      className="w-4 h-4"
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <span className="text-sm text-slate-900/70 dark:text-white/70 capitalize">{tech}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  );
}

// Unique UIverse Loader Component
function WaveLoader() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full animate-bounce" />
    </div>
  );
}

function MultiImageInput({ value, onChange }) {
  const [newUrl, setNewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const images = value ? value.split(",").map(t => t.trim()).filter(Boolean) : [];

  const addImage = (url) => {
    const finalUrl = url || newUrl;
    if (!finalUrl) return;
    const newImages = [...images, finalUrl];
    onChange(newImages.join(", "));
    setNewUrl("");
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages.join(", "));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      addImage(downloadUrl);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload image. Check your Firebase Storage rules.");
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
         <label className="text-xs text-slate-900/40 dark:text-white/40 font-bold uppercase tracking-widest block">Showcase Gallery</label>
         <button 
           type="button"
           onClick={() => fileInputRef.current?.click()}
           disabled={isUploading}
           className="text-[10px] font-black uppercase tracking-tighter text-blue-500 hover:text-blue-400 flex items-center gap-2 transition-colors"
         >
           {isUploading ? <div className="w-3 h-3 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /> : <Upload size={12} />}
           Upload from computer
         </button>
         <input 
           type="file" 
           ref={fileInputRef} 
           onChange={handleFileUpload} 
           accept="image/*" 
           className="hidden" 
         />
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
        {images.map((url, i) => (
          <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900/5 dark:bg-white/5">
            <img 
              src={url} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop"; }}
            />
            <button 
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        
        {/* Dropzone Placeholder */}
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-slate-900/20 dark:text-white/10 hover:border-blue-500/50 hover:text-blue-500/50 transition-all group"
        >
          {isUploading ? <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /> : (
            <>
              <Plus size={20} />
              <span className="text-[8px] font-bold mt-1 uppercase tracking-tighter">New Image</span>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/20 dark:text-white/20" />
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
            placeholder="Or paste external URL..."
            className="w-full bg-slate-900/5 dark:bg-black/40 border border-slate-200/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blue-500/50 outline-none transition-colors"
          />
        </div>
        <button 
          type="button"
          onClick={() => addImage()}
          className="bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 text-slate-900 dark:text-white px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
        >
          Add URL
        </button>
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "edit", label: "Edit Portfolio", icon: Edit3 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "summit", label: "Summit Hub", icon: TrendingUp },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

// --- Reusable UI Components ---

function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn("bg-white/80 dark:bg-[#111827]/80 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-[16px] shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/10 flex items-center justify-center mb-6">
        <Icon size={28} className="text-slate-900/20 dark:text-white/20" />
      </div>
      <h3 className="text-lg font-bold text-slate-900/60 dark:text-white/60 mb-2">{title}</h3>
      <p className="text-sm text-slate-900/30 dark:text-white/30 max-w-sm mb-6">{description}</p>
      {action && (
        <button onClick={onAction} className="bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/15 dark:bg-white/15 border border-slate-200/10 dark:border-white/10 text-slate-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
          {action}
        </button>
      )}
    </div>
  );
}

function InputField({ label, type = "text", placeholder, defaultValue, textarea, icon: Icon, value, onChange }) {
  const Component = textarea ? "textarea" : "input";
  const controlled = value !== undefined ? { value, onChange: (e) => onChange?.(e.target.value) } : { defaultValue };
  return (
    <div>
      <label className="text-xs text-slate-900/40 dark:text-white/40 font-bold uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900/20 dark:text-white/20" />}
        <Component
          type={type}
          placeholder={placeholder}
          {...controlled}
          rows={textarea ? 3 : undefined}
          className={cn(
            "w-full bg-slate-900/5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-900/40 dark:text-white/20 focus:border-[#7C3AED]/50 outline-none transition-colors",
            textarea && "resize-none",
            Icon && "pl-11"
          )}
        />
      </div>
    </div>
  );
}

function SaveButton({ label = "Save Changes" }) {
  return (
    <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all">
      {label}
    </button>
  );
}

// --- Main Dashboard ---

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [config, setConfig] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "config", "portfolio"), (doc) => {
      if (doc.exists()) {
        setConfig(doc.data());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] text-slate-900 dark:text-slate-200 font-sans flex overflow-hidden selection:bg-[#6366F1]/30">
      {/* SIDEBAR */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-[280px] h-screen bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-white/5 flex flex-col flex-shrink-0 relative z-20"
      >
        <div className="p-8 pb-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#3B82F6] flex items-center justify-center font-black text-xl text-white shadow-lg">
            SG
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-base leading-tight text-white">Admin Panel</h2>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Portfolio CMS</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 relative group text-sm",
                activeTab === item.id ? "text-[#6366F1] dark:text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} className={cn("relative z-10 transition-colors", activeTab === item.id ? "text-[#6366F1]" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
              <span className={cn("font-medium relative z-10 transition-colors", activeTab === item.id ? "text-slate-900 dark:text-white" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300")}>{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#6366F1]/10 rounded-xl border border-[#6366F1]/20 dark:border-[#6366F1]/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-white/5">
          <div className="bg-slate-50 dark:bg-[#111827] rounded-2xl p-4 mb-4 border border-slate-200 dark:border-white/5">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">S</div>
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Sachin G.</p>
                   <p className="text-[10px] text-slate-500 truncate">Admin</p>
                </div>
             </div>
             <button 
              onClick={async () => { await logout(); window.location.href = "/admin/login"; }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500 dark:text-red-400 transition-colors text-[10px] font-bold uppercase tracking-wider"
             >
               <LogOut size={12} /> Logout
             </button>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 h-screen flex flex-col relative z-10 overflow-y-auto bg-slate-50 dark:bg-[#0B0F1A]">
        <header className="h-[72px] border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">
               {activeTab === "edit" ? "Edit Portfolio" : activeTab === "dashboard" ? "Dashboard" : activeTab}
             </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search anything... (⌘K)" 
                className="bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-[#6366F1]/50 transition-all w-[280px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="relative">
                <Bell size={20} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6366F1] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#0B0F1A]">2</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-7xl mx-auto"
            >
              {activeTab === "dashboard" && <DashboardHome setActiveTab={setActiveTab} />}
              {activeTab === "edit" && <EditPortfolio config={config} />}
              {activeTab === "projects" && <ProjectsManager />}
              {activeTab === "messages" && <MessagesPanel />}
              {activeTab === "analytics" && <AnalyticsPanel />}
              {activeTab === "summit" && <SummitControl />}
              {activeTab === "notifications" && <NotificationsPanel />}
              {activeTab === "settings" && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
    );
}

function DashboardHome({ setActiveTab }) {
  const [stats, setStats] = useState({ visits: 0, projects: 0, messages: 0, views: 0 });
  const [activities, setActivities] = useState([]);
  const [deviceStats, setDeviceStats] = useState({ desktop: 65, mobile: 25, tablet: 10 });

  useEffect(() => {
    // Real-time stats from Firestore
    const unsubAnalytics = onSnapshot(doc(db, "analytics", "totals"), (snap) => {
      if (snap.exists()) setStats(prev => ({ ...prev, visits: snap.data().totalVisitors || 0, views: snap.data().totalPageViews || 0 }));
    });
    
    // Fetch device distribution
    const unsubDevices = onSnapshot(collection(db, "analytics"), (snap) => {
      const devices = { desktop: 0, mobile: 0, tablet: 0 };
      snap.docs.forEach(doc => {
        const d = doc.data().device;
        if (devices[d] !== undefined) devices[d]++;
      });
      if (snap.size > 0) setDeviceStats(devices);
    });

    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => {
      setStats(prev => ({ ...prev, projects: snap.size }));
    });

    const unsubMessages = onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "desc"), limit(5)), (snap) => {
      setStats(prev => ({ ...prev, messages: snap.size }));
      const recent = snap.docs.map(doc => ({
        id: doc.id,
        title: `New message from ${doc.data().name || "Visitor"}`,
        time: doc.data().timestamp?.toDate() || new Date(),
        status: doc.data().status
      }));
      setActivities(recent);
    });

    return () => { unsubAnalytics(); unsubDevices(); unsubProjects(); unsubMessages(); };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
      {/* 🌌 CELESTIAL HERO BANNER */}
      <motion.div variants={itemVariants} className="relative h-[240px] rounded-[24px] overflow-hidden bg-[#0B0F1A] border border-white/5 flex items-center px-12 group shadow-2xl">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Glowing Portal/Moon with Mountains */}
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[320px] h-[320px]">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-[#6366F1]/10 rounded-full blur-3xl" />
            
            {/* The Portal Circle */}
            <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden bg-[#111827]/40 backdrop-blur-sm">
              {/* Stars inside circle */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={`inner-${i}`}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                />
              ))}
              {/* Mountain Silhouette */}
              <svg className="absolute bottom-0 w-full h-[60%] text-[#0B0F1A]" viewBox="0 0 200 120" preserveAspectRatio="none">
                <path d="M0,120 L0,100 L40,60 L80,90 L120,40 L160,100 L200,80 L200,120 Z" fill="currentColor" opacity="0.8" />
                <path d="M0,120 L0,110 L50,80 L100,110 L150,60 L200,100 L200,120 Z" fill="#6366F1" opacity="0.1" />
              </svg>
            </div>
            {/* Light border reflection */}
            <div className="absolute inset-0 rounded-full border-t border-l border-white/20" />
          </div>

          {/* Shooting Star Animation */}
          <motion.div 
            animate={{ 
              x: [-100, 400], 
              y: [-100, 300], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatDelay: 4, 
              ease: "linear" 
            }}
            className="absolute left-[40%] top-[20%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45"
          />

          {/* Background Stars */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" 
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`, 
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: `${Math.random() * 5}s` 
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white mb-3 tracking-tight"
          >
            Welcome back, Sachin! 👋
          </motion.h2>
          <p className="text-slate-400 text-lg font-medium mb-8">
            You have <span className="text-[#6366F1] font-bold">1 new update</span> today. Let's build something amazing.
          </p>
          
          <div className="flex gap-4">
             <div className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-sm font-bold text-slate-300 flex items-center gap-3 hover:bg-white/[0.08] transition-all cursor-default">
               <Code2 size={16} className="text-slate-500" /> Developer
             </div>
             <div className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-sm font-bold text-slate-300 flex items-center gap-3 hover:bg-white/[0.08] transition-all cursor-default">
               <TrendingUp size={16} className="text-slate-500" /> Creator
             </div>
             <div className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-sm font-bold text-slate-300 flex items-center gap-3 hover:bg-white/[0.08] transition-all cursor-default">
               <Shield size={16} className="text-slate-500" /> Problem Solver
             </div>
          </div>
        </div>
      </motion.div>

      {/* 📊 STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Visitors", value: stats.visits, trend: "+100%", icon: Globe, color: "text-indigo-400", bg: "bg-indigo-500/10", data: [10, 40, 20, 50, 30, 80] },
          { label: "Messages", value: stats.messages, trend: "New", icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10", data: [30, 20, 40, 10, 50, 40] },
          { label: "Active Projects", value: stats.projects, trend: "+50%", icon: FolderGit2, color: "text-emerald-400", bg: "bg-emerald-500/10", data: [60, 70, 50, 80, 70, 90] },
          { label: "Total Views", value: stats.views, trend: "+80%", icon: Eye, color: "text-amber-400", bg: "bg-amber-500/10", data: [20, 30, 50, 40, 60, 50] },
        ].map((card, i) => (
          <GlassCard key={i} className="p-6 hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.bg)}>
                <card.icon size={20} className={card.color} />
              </div>
              <div className="h-8 w-16">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible opacity-50">
                  <path d={`M 0 40 ${card.data.map((v, idx) => `L ${idx * 20} ${40 - (v/100 * 40)}`).join(' ')}`} fill="none" stroke="currentColor" strokeWidth="2" className={card.color} />
                </svg>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{card.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{card.value.toLocaleString()}</h3>
              <span className="text-[10px] font-bold text-[#10B981]">{card.trend}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 VISITOR CHART */}
        <div className="lg:col-span-2">
          <GlassCard className="p-8 h-full">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visitor Overview</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Traffic performance for this week</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400">
                This Week <ChevronDown size={14} />
              </div>
            </div>
            
            <div className="h-[280px] w-full relative">
               <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="restoredGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                     <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 <path d="M0,250 C100,220 200,260 300,200 C400,140 500,180 600,120 C700,60 800,100 800,100 L800,300 L0,300 Z" fill="url(#restoredGrad)" />
                 <path d="M0,250 C100,220 200,260 300,200 C400,140 500,180 600,120 C700,60 800,100 800,100" fill="none" stroke="#6366F1" strokeWidth="2.5" />
                 {[0, 150, 300, 450, 600, 800].map((x, i) => (
                   <circle key={i} cx={x} cy={100 + Math.random()*150} r="4" fill="#0B0F1A" stroke="#6366F1" strokeWidth="2" />
                 ))}
               </svg>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          {/* 📱 TRAFFIC SOURCES */}
          <GlassCard className="p-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-8">Traffic Sources</h3>
            <div className="space-y-6">
              {[
                { label: "Desktop", val: deviceStats.desktop, icon: Monitor, color: "bg-[#6366F1]" },
                { label: "Mobile", val: deviceStats.mobile, icon: Smartphone, color: "bg-[#3B82F6]" },
                { label: "Tablet", val: deviceStats.tablet, icon: Tablet, color: "bg-slate-400 dark:bg-slate-600" }
              ].map((item, i) => {
                const total = deviceStats.desktop + deviceStats.mobile + deviceStats.tablet || 1;
                const pct = Math.round((item.val / total) * 100);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <item.icon size={16} className="text-slate-400 dark:text-slate-500" />
                         <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</span>
                      </div>
                      <span className="text-xs font-black text-slate-400">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className={cn("h-full rounded-full transition-all duration-1000", item.color)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* ⚡ QUICK ACTIONS */}
          <GlassCard className="p-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: "Add Project", icon: Plus, tab: "projects" },
                 { label: "Edit Portfolio", icon: Edit3, tab: "edit" },
                 { label: "Messages", icon: Mail, tab: "messages" },
                 { label: "Settings", icon: Settings, tab: "settings" }
               ].map((btn, i) => (
                 <button 
                  key={i} 
                  onClick={() => setActiveTab(btn.tab)}
                  className="flex flex-col items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 transition-all group"
                 >
                   <btn.icon size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                   <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-slate-900 dark:group-hover:text-slate-300">{btn.label}</span>
                 </button>
               ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 🔔 ACTIVITY FEED */}
      <GlassCard className="p-8">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
           <button onClick={() => setActiveTab("messages")} className="text-xs font-bold text-[#6366F1] hover:underline transition-all">View All Activity</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {activities.length > 0 ? activities.map((act, i) => (
             <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
               <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#6366F1]/10 text-[#6366F1]">
                 <Mail size={18} />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{act.title}</p>
                 <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{act.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   {act.status === "unread" && (
                     <>
                       <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
                       <span className="text-[10px] text-[#6366F1] font-bold uppercase tracking-wider">Unread</span>
                     </>
                   )}
                 </div>
               </div>
             </div>
           )) : (
             <p className="text-sm text-slate-400 dark:text-slate-500 py-4 italic">No recent activities to show.</p>
           )}
        </div>
      </GlassCard>

    </motion.div>
  );
}

function EditPortfolio({ config }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "config", "portfolio"), formData, { merge: true });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    }
    setSaving(false);
  };

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact Info" },
    { id: "socials", label: "Social Links" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all",
              activeSection === s.id
                ? "bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                : "bg-slate-100 dark:bg-white/5 text-slate-900/40 dark:text-white/40 hover:text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor Panel */}
      <GlassCard className="p-8">
        {activeSection === "hero" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Hero Section</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Update the main landing area of your portfolio.</p>
            <InputField 
              label="Headline" 
              value={formData.hero?.headline || ""} 
              onChange={(val) => updateField("hero", "headline", val)}
              placeholder="e.g. Architecting Digital Experiences" 
            />
            <InputField 
              label="Subheadline" 
              value={formData.hero?.subheadline || ""} 
              onChange={(val) => updateField("hero", "subheadline", val)}
              placeholder="A brief intro about yourself" textarea 
            />
            <InputField 
              label="CTA Button Text" 
              value={formData.hero?.ctaText || ""} 
              onChange={(val) => updateField("hero", "ctaText", val)}
              placeholder="e.g. View My Work" 
            />
            <InputField 
              label="CTA Button Link" 
              value={formData.hero?.ctaLink || ""} 
              onChange={(val) => updateField("hero", "ctaLink", val)}
              placeholder="e.g. #projects" icon={Link} 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save Hero"} /></div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">About Section</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Tell visitors who you are.</p>
            <InputField 
              label="Full Name" 
              value={formData.about?.name || ""} 
              onChange={(val) => updateField("about", "name", val)}
              placeholder="Sachin Gopalakrishnan" 
            />
            <InputField 
              label="Bio" 
              value={formData.about?.bio || ""} 
              onChange={(val) => updateField("about", "bio", val)}
              placeholder="Write your biography here..." textarea 
            />
            <InputField 
              label="Location" 
              value={formData.about?.location || ""} 
              onChange={(val) => updateField("about", "location", val)}
              placeholder="e.g. India" 
            />
            <InputField 
              label="Profile Image URL" 
              value={formData.about?.image || ""} 
              onChange={(val) => updateField("about", "image", val)}
              placeholder="/assets/profile.png" icon={Link} 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save About"} /></div>
          </div>
        )}

        {activeSection === "skills" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Skills</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Manage your tech stack categories and skills.</p>
            <InputField 
              label="Frontend Skills" 
              value={formData.skills?.frontend || ""} 
              onChange={(val) => updateField("skills", "frontend", val)}
              placeholder="React, Next.js, TypeScript, Tailwind..." 
            />
            <InputField 
              label="Backend Skills" 
              value={formData.skills?.backend || ""} 
              onChange={(val) => updateField("skills", "backend", val)}
              placeholder="Node.js, Express, MongoDB, Supabase..." 
            />
            <InputField 
              label="Tools" 
              value={formData.skills?.tools || ""} 
              onChange={(val) => updateField("skills", "tools", val)}
              placeholder="Git, Figma, VS Code, Vercel..." 
            />
            <InputField 
              label="Design" 
              value={formData.skills?.design || ""} 
              onChange={(val) => updateField("skills", "design", val)}
              placeholder="UI/UX, Figma, Typography..." 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save Skills"} /></div>
          </div>
        )}

        {activeSection === "experience" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Experience</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Manage your professional journey.</p>
            <InputField 
              label="Work Experience (Raw JSON or List)" 
              value={formData.experience?.raw || ""} 
              onChange={(val) => updateField("experience", "raw", val)}
              textarea
              placeholder="Coming soon: Better list management" 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save Experience"} /></div>
          </div>
        )}

        {activeSection === "contact" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Contact Info</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Update your contact details.</p>
            <InputField 
              label="Email" type="email" 
              value={formData.contact?.email || ""} 
              onChange={(val) => updateField("contact", "email", val)}
              placeholder="your@email.com" icon={Mail} 
            />
            <InputField 
              label="LinkedIn URL" 
              value={formData.contact?.linkedin || ""} 
              onChange={(val) => updateField("contact", "linkedin", val)}
              placeholder="https://linkedin.com/in/..." icon={Linkedin} 
            />
            <InputField 
              label="Calendar Link" 
              value={formData.contact?.calendar || ""} 
              onChange={(val) => updateField("contact", "calendar", val)}
              placeholder="https://calendly.com/..." icon={Link} 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save Contact Info"} /></div>
          </div>
        )}

        {activeSection === "socials" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Social Links</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Connect your social profiles.</p>
            <InputField 
              label="GitHub" 
              value={formData.socials?.github || ""} 
              onChange={(val) => updateField("socials", "github", val)}
              placeholder="https://github.com/codewithsachin10" icon={Github} 
            />
            <InputField 
              label="LinkedIn" 
              value={formData.socials?.linkedin || ""} 
              onChange={(val) => updateField("socials", "linkedin", val)}
              placeholder="https://linkedin.com/in/..." icon={Linkedin} 
            />
            <InputField 
              label="Twitter / X" 
              value={formData.socials?.twitter || ""} 
              onChange={(val) => updateField("socials", "twitter", val)}
              placeholder="https://twitter.com/..." icon={Twitter} 
            />
            <InputField 
              label="Instagram" 
              value={formData.socials?.instagram || ""} 
              onChange={(val) => updateField("socials", "instagram", val)}
              placeholder="https://instagram.com/..." icon={Instagram} 
            />
            <div className="pt-4" onClick={handleSave}><SaveButton label={saving ? "Saving..." : "Save Socials"} /></div>
          </div>
        )}

        {activeSection === "resume" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Resume</h3>
            <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6">Upload your latest resume for visitors to download.</p>
            <div className="border-2 border-dashed border-slate-200/10 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[#7C3AED]/30 transition-colors cursor-pointer">
              <Upload size={32} className="text-slate-900/20 dark:text-white/20 mb-4" />
              <p className="text-sm font-bold text-slate-900/50 dark:text-white/50">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-900/20 dark:text-white/20 mt-1">PDF, DOC up to 5MB</p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ 
    title: "", 
    tagline: "",
    description: "", 
    url: "", 
    github: "", 
    tech: "", 
    images: "",
    featured: false,
    order_index: 0,
    isVisible: true 
  });
  const [saving, setSaving] = useState(false);
  const [fetchingGithub, setFetchingGithub] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio"); // "portfolio", "github", "vercel"

  const handleGithubImport = async (directUrl) => {
    const targetUrl = typeof directUrl === 'string' ? directUrl : form.github;
    
    if (!targetUrl || !targetUrl.includes("github.com/")) {
      alert("Please enter a valid GitHub repository URL.");
      return;
    }
    
    setFetchingGithub(true);
    if (typeof directUrl === 'string') {
      setShowForm(true);
      setForm(prev => ({ ...prev, github: targetUrl }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    try {
      let repoPath = targetUrl.split("github.com/")[1];
      if (repoPath.endsWith("/")) repoPath = repoPath.slice(0, -1);
      const [owner, repo] = repoPath.split("/");
      
      if (!owner || !repo) throw new Error("Invalid GitHub URL format.");
      
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!res.ok) throw new Error("Repository not found or is private.");
      const data = await res.json();
      
      // Fetch languages to auto-populate tech stack
      const langRes = await fetch(data.languages_url);
      const langData = langRes.ok ? await langRes.json() : {};
      const techList = Object.keys(langData).join(", ");
      
      setForm(prev => ({
        ...prev,
        github: targetUrl,
        title: prev.title || data.name.replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        description: prev.description || data.description || "",
        url: prev.url || data.homepage || "",
        tech: prev.tech && typeof directUrl !== 'string' ? `${prev.tech}, ${techList}` : techList
      }));
    } catch (err) {
      alert("Failed to auto-fill from GitHub: " + err.message);
    }
    setFetchingGithub(false);
  };

  // Real-time listener for projects
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setForm({ 
      title: "", 
      tagline: "",
      description: "", 
      url: "", 
      github: "", 
      tech: "", 
      images: "",
      featured: false,
      order_index: 0,
      isVisible: true 
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setForm({
      title: project.title || "",
      tagline: project.tagline || "",
      description: project.description || "",
      url: project.url || project.live_url || "",
      github: project.github || project.github_url || "",
      tech: Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : (Array.isArray(project.tech) ? project.tech.join(", ") : (project.tech || "")),
      images: Array.isArray(project.images) ? project.images.join(", ") : "",
      featured: project.featured === true,
      order_index: project.order_index || 0,
      isVisible: project.isVisible !== false,
    });
    setShowForm(true);
  };

  const toggleVisibility = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "projects", id), {
        isVisible: !currentStatus
      });
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.url) return;
    setSaving(true);
    try {
      const data = {
        ...form,
        tech_stack: form.tech.split(",").map(t => t.trim()).filter(Boolean),
        images: form.images.split(",").map(t => t.trim()).filter(Boolean),
        live_url: form.url,
        github_url: form.github,
        order_index: Number(form.order_index),
        updatedAt: serverTimestamp(),
      };
      // Clean up legacy fields
      delete data.tech;
      delete data.url;
      delete data.github;

      if (editId) {
        await updateDoc(doc(db, "projects", editId), data);
      } else {
        await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp() });
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save project:", err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Projects</h2>
          <p className="text-sm text-slate-900/30 dark:text-white/30 mt-1">Manage your portfolio and integrations.</p>
        </div>
        {/* Simple Pill Button - Only show on Portfolio tab */}
        {activeTab === "portfolio" && (
          <button
            onClick={() => { if (showForm) { resetForm(); } else { setShowForm(true); } }}
            className="flex items-center gap-2 bg-slate-100 dark:bg-[#1C202B] hover:bg-slate-200 dark:hover:bg-[#2B3040] border border-slate-200 dark:border-[#242835] text-slate-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          >
            {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Project</>}
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar border-b border-transparent">
        {[
          { id: "portfolio", label: "Portfolio Projects", icon: FolderGit2 },
          { id: "github", label: "GitHub Repositories", icon: Code2 },
          { id: "vercel", label: "Vercel Deployments", icon: Globe }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20' 
                : 'bg-slate-100 dark:bg-[#1C202B] text-slate-900/50 dark:text-white/50 hover:text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-[#2B3040]'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Tab Content */}
      {activeTab === "portfolio" && (
        <>
          {/* Add Project Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <GlassCard className="p-8 space-y-5">
              <h3 className="text-lg font-bold">{editId ? "Edit Project" : "New Project"}</h3>

              {/* Magic Import Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-4 rounded-2xl mb-2">
                <div className="flex-1 flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Github size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Magic Import</h4>
                    <p className="text-xs text-slate-900/50 dark:text-white/50">Auto-fill details from a GitHub repository.</p>
                  </div>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                  <input 
                    type="text" 
                    placeholder="https://github.com/..."
                    className="bg-slate-900/5 dark:bg-black/40 border border-slate-200/10 dark:border-white/10 rounded-xl px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-900/30 dark:text-white/30 focus:border-blue-500/50 outline-none w-full sm:w-64 transition-colors"
                    value={form.github}
                    onChange={(e) => setForm({...form, github: e.target.value})}
                  />
                  <button 
                    onClick={handleGithubImport}
                    disabled={fetchingGithub || !form.github}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900/10 dark:bg-white/10 disabled:text-slate-900/30 dark:text-white/30 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 min-w-[100px]"
                  >
                    {fetchingGithub ? <div className="w-4 h-4 border-2 border-slate-200/30 dark:border-white/30 border-t-white rounded-full animate-spin" /> : "Auto-fill"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Project Name" placeholder="e.g. Snackzo" value={form.title} onChange={(v) => setForm({...form, title: v})} />
                <InputField label="Tagline (1 line)" placeholder="blazing-fast campus delivery" value={form.tagline} onChange={(v) => setForm({...form, tagline: v})} />
              </div>

              <InputField label="Description" placeholder="A short description of what this project does..." textarea value={form.description} onChange={(v) => setForm({...form, description: v})} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField label="Live URL" placeholder="https://..." icon={Link} value={form.url} onChange={(v) => setForm({...form, url: v})} />
                <InputField label="GitHub URL" placeholder="https://github.com/..." icon={Github} value={form.github} onChange={(v) => setForm({...form, github: v})} />
                <div className="flex items-center gap-4 px-4 h-[42px] mt-[26px] bg-slate-900/5 dark:bg-black/40 border border-slate-200/10 dark:border-white/10 rounded-xl">
                   <label className="text-xs font-bold text-slate-500 uppercase cursor-pointer flex items-center gap-2">
                      <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded border-white/10 bg-white/5" />
                      Featured Project
                   </label>
                   <div className="h-4 w-[1px] bg-white/10" />
                   <input 
                    type="number" 
                    className="bg-transparent border-none outline-none text-xs font-bold text-slate-300 w-12" 
                    value={form.order_index} 
                    onChange={(e) => setForm({...form, order_index: e.target.value})}
                    placeholder="Order"
                   />
                </div>
              </div>

              <div className="space-y-5">
                <TechStackInput value={form.tech} onChange={(v) => setForm({...form, tech: v})} />
                <MultiImageInput value={form.images} onChange={(v) => setForm({...form, images: v})} />
              </div>

              {/* Live Preview */}
              {form.url && form.url.startsWith("http") && (
                <div>
                  <label className="text-xs text-slate-900/40 dark:text-white/40 font-bold uppercase tracking-widest mb-2 block">Live Preview</label>
                  <div className="rounded-2xl overflow-hidden border border-slate-200/10 dark:border-white/10 bg-white dark:bg-[#111427] h-[280px] relative">
                    <img
                      src={`https://api.microlink.io/?url=${encodeURIComponent(form.url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`}
                      alt="Preview"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://image.thum.io/get/width/800/crop/500/${form.url}`;
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {/* UIverse Animated Border Button */}
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.url}
                  className="relative group overflow-hidden px-8 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all"
                >
                  <span className="absolute inset-0 w-full h-full bg-white dark:bg-[#111427] border border-slate-200/10 dark:border-white/10 rounded-xl group-hover:border-[#7C3AED] transition-colors duration-300" />
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#7C3AED]/80 to-[#3B82F6]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                    {saving ? <WaveLoader /> : editId ? "Update Project" : "Save Project"}
                  </span>
                </button>
                <button onClick={resetForm} className="text-slate-900/40 dark:text-white/40 hover:text-slate-900 dark:text-white text-sm font-medium px-4 py-2.5 transition-colors">Cancel</button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <GlassCard key={project.id} className="overflow-hidden group hover:border-slate-200/10 dark:border-white/10 transition-all">
              {/* Preview Thumbnail */}
              <div className="h-[220px] bg-slate-100 dark:bg-[#0F1115] border-b border-slate-200 dark:border-[#242835] relative overflow-hidden">
                {project.url ? (
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://image.thum.io/get/width/640/crop/400/${project.url}`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#1E3A8A] -rotate-12 opacity-80 shadow-2xl shadow-blue-500/20" />
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-slate-200/10 dark:border-white/10 flex items-center justify-center hover:bg-slate-900/20 dark:bg-white/20 transition-colors">
                      <ExternalLink size={14} className="text-slate-900 dark:text-white" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-slate-200/10 dark:border-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-900/20 transition-colors">
                      <Github size={14} className="text-slate-900 dark:text-white" />
                    </a>
                  )}
                  <button onClick={() => handleEdit(project)} className="w-8 h-8 rounded-lg bg-[#7C3AED]/30 backdrop-blur-sm border border-[#7C3AED]/20 flex items-center justify-center hover:bg-[#7C3AED]/50 transition-colors">
                    <Pencil size={14} className="text-[#7C3AED]" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="w-8 h-8 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-2xl truncate pr-3">{project.title}</h3>
                  <button 
                    onClick={() => toggleVisibility(project.id, project.isVisible !== false)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-full border shrink-0 mt-0.5 transition-colors cursor-pointer ${
                      project.isVisible !== false 
                        ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20' 
                        : 'bg-slate-900/5 dark:bg-white/5 border-slate-200/10 dark:border-white/10 hover:bg-slate-900/10 dark:bg-white/10'
                    }`}
                    title={project.isVisible !== false ? "Click to hide from portfolio" : "Click to show on portfolio"}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${project.isVisible !== false ? 'bg-green-500 animate-pulse' : 'bg-slate-900/40 dark:bg-white/40'}`} />
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${project.isVisible !== false ? 'text-green-500' : 'text-slate-900/40 dark:text-white/40'}`}>
                      {project.isVisible !== false ? 'Active' : 'Hidden'}
                    </span>
                  </button>
                </div>
                
                {project.description && <p className="text-sm text-slate-900/30 dark:text-white/30 mb-6 line-clamp-2">{project.description}</p>}
                
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <TechTag key={i} name={t} />
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        !showForm && (
          <GlassCard className="overflow-hidden">
            <EmptyState
              icon={FolderGit2}
              title="No projects added yet"
              description="Start adding your projects to showcase them on your portfolio."
              action="+ Add Your First Project"
              onAction={() => setShowForm(true)}
            />
          </GlassCard>
        )
      )}
        </>
      )}

      {/* GitHub Integration Section */}
      {activeTab === "github" && (
        <GithubReposList onImport={(url) => {
          setActiveTab("portfolio");
          handleGithubImport(url);
        }} />
      )}

      {/* Vercel Integration Section */}
      {activeTab === "vercel" && (
        <VercelProjectsList />
      )}
    </div>
  );
}

function GithubReposList({ onImport }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/codewithsachin10/repos?sort=updated&per_page=100");
        if (res.ok) {
          const data = await res.json();
          setRepos(data.filter(r => !r.fork));
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchRepos();
  }, []);

  if (loading) return null;
  if (repos.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200/10 dark:border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/10 flex items-center justify-center">
          <Github size={20} className="text-slate-900/60 dark:text-white/60" />
        </div>
        <div>
          <h2 className="text-xl font-black">Your GitHub Repositories</h2>
          <p className="text-sm text-slate-900/30 dark:text-white/30">Quickly import your public repositories into your portfolio.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map(repo => (
          <GlassCard key={repo.id} className="flex flex-col justify-between group hover:border-slate-200/10 dark:border-white/10 transition-colors overflow-hidden">
            
            {/* Live Preview Header if exists */}
            {repo.homepage && repo.homepage.startsWith("http") ? (
              <div className="h-[120px] bg-white dark:bg-[#111427] relative overflow-hidden border-b border-slate-200/5 dark:border-white/5">
                <img
                  src={`https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`}
                  alt={repo.name}
                  className="w-full h-full object-cover object-top transition-opacity duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://image.thum.io/get/width/640/crop/400/${repo.homepage}`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-[#0B0F1A] to-transparent" />
              </div>
            ) : (
              <div className="h-1 bg-gradient-to-r from-[#7C3AED]/20 to-transparent" />
            )}

            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-base truncate pr-4 group-hover:text-[#7C3AED] transition-colors">{repo.name}</h4>
                <div className="flex gap-2 shrink-0">
                  {repo.homepage && repo.homepage.startsWith("http") && (
                    <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-slate-900/20 dark:text-white/20 hover:text-slate-900 dark:text-white transition-colors" title="Live Site"><Globe size={14} /></a>
                  )}
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-slate-900/20 dark:text-white/20 hover:text-slate-900 dark:text-white transition-colors" title="Source Code"><ExternalLink size={14} /></a>
                </div>
              </div>
              <p className="text-xs text-slate-900/40 dark:text-white/40 mb-4 line-clamp-2">{repo.description || "No description provided."}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-[#242835]">
                {repo.language ? <TechTag name={repo.language} /> : <span className="text-[10px] uppercase tracking-widest font-bold text-slate-900/40 dark:text-white/40">Code</span>}
                <button 
                  onClick={() => onImport(repo.html_url)}
                  className="text-xs font-bold bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/40 hover:text-slate-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors border border-[#7C3AED]/20 flex items-center gap-1.5"
                >
                  <Plus size={12} /> Import
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const markAsRead = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "messages", id), {
        status: currentStatus === "read" ? "unread" : "read"
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Messages</h2>
          <p className="text-sm text-slate-900/30 dark:text-white/30 mt-1">Contact form submissions from your portfolio.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/5 dark:bg-white/5 rounded-lg border border-slate-200/5 dark:border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-900/40 dark:text-white/40 uppercase tracking-widest">Live Sync</span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><WaveLoader /></div>
      ) : messages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <GlassCard key={msg.id} className={cn(
              "p-6 transition-all duration-300 group hover:border-slate-200/10 dark:border-white/10",
              msg.status === "unread" ? "border-l-4 border-l-[#7C3AED]" : "opacity-70"
            )}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-xl font-black text-slate-900/20 dark:text-white/20">
                    {msg.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{msg.name}</h4>
                    <p className="text-sm text-slate-900/30 dark:text-white/30">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-900/20 dark:text-white/20 font-medium">
                    {msg.timestamp?.toDate().toLocaleDateString()}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => markAsRead(msg.id, msg.status)}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors",
                        msg.status === "read" ? "bg-slate-900/5 dark:bg-white/5 border-slate-200/10 dark:border-white/10 text-slate-900/40 dark:text-white/40" : "bg-indigo-500/20 border-indigo-500/20 text-indigo-400"
                      )}
                      title={msg.status === "read" ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCircle2 size={14} />
                    </button>
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-slate-900/60 dark:text-white/60 text-sm leading-relaxed bg-slate-100 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                {msg.message}
              </p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard className="overflow-hidden">
          <EmptyState 
            icon={Mail}
            title="No messages yet"
            description="When visitors send you a message through your contact form, it will appear here."
          />
        </GlassCard>
      )}
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Notifications</h2>
          <p className="text-sm text-slate-900/30 dark:text-white/30 mt-1">System alerts and activity updates.</p>
        </div>
        <button className="text-sm text-slate-900/30 dark:text-white/30 hover:text-slate-900 dark:text-white transition-colors">Mark all as read</button>
      </div>

      <GlassCard className="overflow-hidden">
        <EmptyState 
          icon={Bell}
          title="All caught up"
          description="You have no new notifications."
        />
      </GlassCard>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Settings</h2>
      <p className="text-sm text-slate-900/30 dark:text-white/30">Manage your admin account.</p>

      {/* Profile */}
      <GlassCard className="p-8">
        <h3 className="text-lg font-bold mb-6 pb-4 border-b border-slate-200/5 dark:border-white/5">Profile</h3>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Display Name" defaultValue="Sachin G." />
            <InputField label="Admin Email" type="email" defaultValue="sachinthegreat08@gmail.com" icon={Mail} />
          </div>
          <SaveButton label="Update Profile" />
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard className="p-8">
        <h3 className="text-lg font-bold mb-6 pb-4 border-b border-slate-200/5 dark:border-white/5 flex items-center gap-2">
          <Shield size={18} className="text-[#7C3AED]" /> Security
        </h3>
        <div className="space-y-5 max-w-md">
          <InputField label="Current Password" type="password" placeholder="••••••••••••" />
          <InputField label="New Password" type="password" placeholder="Enter new password" />
          <SaveButton label="Change Password" />
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/10 rounded-[24px] p-8">
        <h3 className="text-lg font-bold mb-1 text-red-400">Danger Zone</h3>
        <p className="text-slate-900/30 dark:text-white/30 text-sm mb-6">This action cannot be undone.</p>
        <button 
          onClick={async () => {
            await logout();
            window.location.href = "/admin/login";
          }}
          className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-slate-900 dark:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-red-500/20"
        >
          Sign Out of All Devices
        </button>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const [totals, setTotals] = useState({ totalVisitors: 0, totalPageViews: 0, totalClicks: 0 });
  const [devices, setDevices] = useState({ desktop: 0, mobile: 0, tablet: 0 });
  const [pages, setPages] = useState({});
  const [referrers, setReferrers] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [live, setLive] = useState(true);

  // Real-time listener: totals
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "analytics", "totals"), (snap) => {
      if (snap.exists()) setTotals(snap.data());
    });
    return () => unsub();
  }, []);

  // Real-time listener: devices
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "analytics", "devices"), (snap) => {
      if (snap.exists()) setDevices(snap.data());
    });
    return () => unsub();
  }, []);

  // Real-time listener: pages
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "analytics", "pages"), (snap) => {
      if (snap.exists()) setPages(snap.data());
    });
    return () => unsub();
  }, []);

  // Real-time listener: referrers
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "analytics", "referrers"), (snap) => {
      if (snap.exists()) setReferrers(snap.data());
    });
    return () => unsub();
  }, []);

  // Fetch last 7 days of daily data
  useEffect(() => {
    async function fetchDaily() {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split("T")[0]);
      }
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const results = [];
      for (const day of days) {
        const unsub = onSnapshot(doc(db, "analytics_daily", day), (snap) => {
          const date = new Date(day + "T00:00:00");
          const existing = results.find(r => r.date === day);
          const views = snap.exists() ? (snap.data().views || 0) : 0;
          if (existing) {
            existing.value = views;
          } else {
            results.push({ label: dayNames[date.getDay()], date: day, value: views });
          }
          setDailyData([...results].sort((a, b) => a.date.localeCompare(b.date)));
        });
      }
    }
    fetchDaily();
  }, []);

  const totalDevices = (devices.desktop || 0) + (devices.mobile || 0) + (devices.tablet || 0);
  const devicePct = (val) => totalDevices > 0 ? Math.round(((val || 0) / totalDevices) * 100) : 0;

  const maxDaily = Math.max(...dailyData.map(d => d.value), 1);
  const hasChartData = dailyData.some(d => d.value > 0);

  // Sort pages by views descending
  const sortedPages = Object.entries(pages)
    .map(([key, val]) => ({ path: key === "_home" ? "/" : key.replace(/_/g, "/"), views: val }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Sort referrers
  const sortedRefs = Object.entries(referrers)
    .map(([key, val]) => ({ source: key.replace(/_/g, "."), views: val }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  const maxRef = sortedRefs.length > 0 ? sortedRefs[0].views : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black">Analytics</h2>
          <p className="text-sm text-slate-900/30 dark:text-white/30 mt-1">Real-time portfolio performance from Firestore.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Visitors", value: totals.totalVisitors || 0, icon: Globe, color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
          { label: "Page Views", value: totals.totalPageViews || 0, icon: Eye, color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
          { label: "Clicks", value: totals.totalClicks || 0, icon: MousePointerClick, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Referrers", value: sortedRefs.length, icon: ExternalLink, color: "text-amber-400", bg: "bg-amber-400/10" },
        ].map((metric, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", metric.bg)}>
                <metric.icon size={16} className={metric.color} />
              </div>
            </div>
            <p className="text-xs text-slate-900/30 dark:text-white/30 font-bold uppercase tracking-widest mb-1">{metric.label}</p>
            <h3 className="text-2xl font-black">{metric.value.toLocaleString()}</h3>
          </GlassCard>
        ))}
      </div>

      {/* Chart */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-900/50 dark:text-white/50 uppercase tracking-widest">Last 7 Days</h3>
          <div className="flex items-center gap-2 text-xs text-slate-900/30 dark:text-white/30">
            <TrendingUp size={14} /> Daily page views
          </div>
        </div>

        {hasChartData ? (
          <div className="h-[220px] flex items-end gap-3 border-b border-l border-slate-200 dark:border-white/5 pl-1 pb-1">
            {dailyData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-slate-900/40 dark:text-white/40 font-bold">{bar.value}</span>
                <div
                  className="w-full bg-gradient-to-t from-[#7C3AED] to-[#00D4FF] rounded-t-md transition-all duration-700 min-h-[4px]"
                  style={{ height: `${(bar.value / maxDaily) * 100}%` }}
                />
                <span className="text-[10px] text-slate-900/30 dark:text-white/30 font-bold">{bar.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[220px] flex items-center justify-center border border-dashed border-slate-200/5 dark:border-white/5 rounded-2xl">
            <div className="text-center">
              <BarChart3 size={32} className="text-slate-900/10 dark:text-white/10 mx-auto mb-3" />
              <p className="text-sm text-slate-900/30 dark:text-white/30 font-medium">No data yet</p>
              <p className="text-xs text-slate-900/20 dark:text-white/20 mt-1">Visit your portfolio to start tracking.</p>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <GlassCard className="p-6">
          <h3 className="text-sm font-bold text-slate-900/50 dark:text-white/50 uppercase tracking-widest mb-5">Top Pages</h3>
          {sortedPages.length > 0 ? (
            <div className="space-y-3">
              {sortedPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-900/30 dark:text-white/30">{i + 1}</span>
                    <span className="text-sm font-medium text-slate-900/60 dark:text-white/60 font-mono">{page.path}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900/40 dark:text-white/40">{page.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-900/20 dark:text-white/20 text-center py-8">No page data yet.</p>
          )}
        </GlassCard>

        {/* Devices + Referrers */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-sm font-bold text-slate-900/50 dark:text-white/50 uppercase tracking-widest mb-5">Devices</h3>
            <div className="space-y-4">
              {[
                { label: "Desktop", icon: Monitor, count: devices.desktop || 0 },
                { label: "Mobile", icon: Smartphone, count: devices.mobile || 0 },
                { label: "Tablet", icon: Tablet, count: devices.tablet || 0 },
              ].map((device, i) => {
                const pct = devicePct(device.count);
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center">
                      <device.icon size={16} className="text-slate-900/30 dark:text-white/30" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-900/60 dark:text-white/60 font-medium">{device.label}</span>
                        <span className="text-slate-900/40 dark:text-white/40 font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-sm font-bold text-slate-900/50 dark:text-white/50 uppercase tracking-widest mb-5">Top Referrers</h3>
            {sortedRefs.length > 0 ? (
              <div className="space-y-3">
                {sortedRefs.map((ref, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-slate-900/60 dark:text-white/60 w-28 truncate">{ref.source}</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(ref.views / maxRef) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-slate-900/40 dark:text-white/40 w-8 text-right">{ref.views}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-900/20 dark:text-white/20 text-center py-4">No referrer data yet.</p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function VercelProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("VERCEL_TOKEN");
    if (savedToken) {
      setToken(savedToken);
      fetchVercel(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchVercel = async (apiToken) => {
    setLoading(true);
    try {
      const res = await fetch("https://api.vercel.com/v9/projects", {
        headers: { Authorization: `Bearer ${apiToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
        localStorage.setItem("VERCEL_TOKEN", apiToken);
        setToken(apiToken);
      } else {
        alert("Invalid Vercel Token or fetch failed.");
        localStorage.removeItem("VERCEL_TOKEN");
        setToken("");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("VERCEL_TOKEN");
    setToken("");
    setProjects([]);
  };

  if (!token && !loading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6">
          <Globe size={28} className="text-slate-900/40 dark:text-white/40" />
        </div>
        <h3 className="text-xl font-bold mb-2">Connect to Vercel</h3>
        <p className="text-sm text-slate-900/40 dark:text-white/40 max-w-md mb-8">Enter your Vercel Personal Access Token to view your deployed projects securely.</p>
        
        <div className="flex gap-2 max-w-sm w-full">
          <input 
            type="password" 
            placeholder="Enter Vercel token..." 
            className="flex-1 bg-slate-50 dark:bg-[#0B0F1A] border border-slate-200/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#7C3AED] transition-colors"
            onKeyDown={(e) => { if(e.key==='Enter') fetchVercel(e.target.value) }}
            id="vercel-token-input"
          />
          <button 
            onClick={() => fetchVercel(document.getElementById("vercel-token-input").value)}
            className="bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:bg-white/20 text-slate-900 dark:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          >
            Connect
          </button>
        </div>
        <a href="https://vercel.com/account/tokens" target="_blank" rel="noreferrer" className="text-xs text-[#7C3AED] hover:underline mt-4">Get a Token from Vercel →</a>
      </div>
    );
  }

  if (loading) return <div className="py-12 flex justify-center"><WaveLoader /></div>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200/5 dark:border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/10 flex items-center justify-center">
            <Globe size={20} className="text-slate-900/60 dark:text-white/60" />
          </div>
          <div>
            <h2 className="text-xl font-black">Your Vercel Deployments</h2>
            <p className="text-sm text-slate-900/30 dark:text-white/30">View your active deployments.</p>
          </div>
        </div>
        <button onClick={handleDisconnect} className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-500/10 transition-colors border border-red-500/20">Disconnect</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => {
          const aliases = project.targets?.production?.alias || [];
          const rawUrl = aliases.length > 0 ? aliases[0] : project.targets?.production?.url;
          const prodUrl = rawUrl ? `https://${rawUrl}` : null;
          
          return (
            <GlassCard key={project.id} className="flex flex-col justify-between group hover:border-slate-200/10 dark:border-white/10 transition-colors overflow-hidden">
              {prodUrl ? (
                <div className="h-[140px] bg-slate-100 dark:bg-[#0F1115] border-b border-slate-200 dark:border-[#242835] relative overflow-hidden">
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(prodUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://image.thum.io/get/width/640/crop/400/${prodUrl}`;
                    }}
                  />
                </div>
              ) : (
                <div className="h-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base truncate pr-4 group-hover:text-blue-400 transition-colors">{project.name}</h4>
                  {prodUrl && (
                    <a href={prodUrl} target="_blank" rel="noreferrer" className="text-slate-900/20 dark:text-white/20 hover:text-slate-900 dark:text-white transition-colors" title="Live Site"><ExternalLink size={14} /></a>
                  )}
                </div>
                <div className="mb-4">
                  <TechTag name={project.framework || "Static"} />
                </div>
                
                {prodUrl && (
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/5 dark:border-white/5">
                    <span className="text-[10px] text-slate-900/30 dark:text-white/30 truncate max-w-[200px]">{prodUrl.replace("https://", "")}</span>
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function MiniMechanicalCounter({ count }) {
  const NDIGS = 6;
  const digits = String(count).padStart(NDIGS, '0').split('');
  const drumHeight = 110; 
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-100 dark:to-slate-300 border border-slate-300/50 rounded-[32px] p-12 shadow-2xl relative overflow-hidden group">
        {/* Live Activity Pulse */}
        <motion.div 
          key={count}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-indigo-500 blur-3xl pointer-events-none"
        />
        
        <div className="relative z-10 flex gap-4">
          {digits.map((digit, i) => (
            <div key={i} className="flex items-center gap-4">
              {i === 3 && <div className="w-1.5 h-20 bg-black/5 rounded-full" />}
              <div className="w-20 h-[110px] bg-[#000] rounded-2xl border border-white/10 overflow-hidden relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)]">
                 <motion.div 
                   animate={{ y: -(9 - parseInt(digit)) * drumHeight }}
                   transition={{ type: "spring", stiffness: 45, damping: 12, mass: 1.5 }}
                   className="absolute inset-0"
                 >
                   {[9,8,7,6,5,4,3,2,1,0].map(n => (
                     <div key={n} style={{ height: drumHeight }} className="flex items-center justify-center font-['Oswald'] text-6xl font-black text-white/95 leading-none">
                       {n}
                     </div>
                   ))}
                 </motion.div>
                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-70" />
                 <div className="absolute inset-0 pointer-events-none border-y border-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummitControl() {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Listen to main total
    const unsubTotal = onSnapshot(doc(db, "stats", "visitors"), (snap) => {
      if (snap.exists()) {
        setTotal(snap.data().total || 0);
        setLastUpdate(new Date());
      }
    });

    // Listen to today's count
    const todayKey = new Date().toISOString().slice(0, 10);
    const unsubToday = onSnapshot(doc(db, "stats", `daily_${todayKey}`), (snap) => {
      if (snap.exists()) setToday(snap.data().count || 0);
    });

    // Fetch last 7 days for trend
    const fetchHistory = async () => {
      const history = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const snap = await getDocs(query(collection(db, "stats"), where("__name__", "==", `daily_${key}`)));
        const count = !snap.empty ? snap.docs[0].data().count : 0;
        history.push({ date: key, count });
      }
      setDailyData(history.reverse());
    };
    fetchHistory();

    return () => {
      unsubTotal();
      unsubToday();
    };
  }, []);

  if (!mounted) return null;

  const nextMilestone = Math.ceil((total + 1) / 1000) * 1000;
  const progress = (total / nextMilestone) * 100;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Summit Hub</h2>
          <p className="text-slate-500 font-medium">Live Visitor Monitoring Station</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <GlassCard className="px-6 py-3 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Sync Active</span>
          </GlassCard>
          {lastUpdate && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last Pulse: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* DIGITAL DRUM BAR */}
          <MiniMechanicalCounter count={total} />

          {/* Milestone Progress Bar */}
          <GlassCard className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Globe size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Journey to Milestone</p>
                  <h3 className="text-2xl font-black">{total.toLocaleString()} / {nextMilestone.toLocaleString()}</h3>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Completion</p>
                   <p className="text-xl font-black text-indigo-500">{progress.toFixed(1)}%</p>
                </div>
              </div>

              <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mb-8 border border-slate-200 dark:border-white/10">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"
                 />
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Today's Peak</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-black text-slate-900 dark:text-white">{today}</span>
                       <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1"><TrendingUp size={10} /> Active</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Global Average</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-black text-slate-900 dark:text-white">{(total / 30).toFixed(1)}</span>
                       <span className="text-[10px] font-bold text-slate-500">/ day</span>
                    </div>
                 </div>
              </div>
            </div>
          </GlassCard>

          {/* Trend Chart */}
          <GlassCard className="p-8">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-lg font-bold flex items-center gap-2">
                 <BarChart3 size={20} className="text-blue-500" /> Weekly Traction
               </h3>
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Visitors</div>
               </div>
            </div>
            
            <div className="h-[240px] flex items-end gap-3 px-2">
              {dailyData.map((d, i) => {
                const max = Math.max(...dailyData.map(x => x.count), 1);
                const pct = (d.count / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full relative flex flex-col justify-end h-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${pct}%` }}
                        className="w-full bg-gradient-to-t from-indigo-600/80 to-indigo-400 rounded-xl relative group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-xl whitespace-nowrap z-50">
                          {d.count} Users
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                      {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-base font-bold mb-6">Unit Diagnostics</h3>
            <div className="space-y-4">
              <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl relative overflow-hidden group">
                 <Activity size={40} className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 transition-transform" />
                 <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Real-time Feed</p>
                 <p className="text-base font-black text-slate-900 dark:text-white">Active & Synchronized</p>
              </div>
              <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                 <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Contribution Security</p>
                 <p className="text-base font-black text-slate-900 dark:text-white">Session-Locked (Unique)</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
            <h3 className="text-base font-bold mb-4 relative z-10">Admin Note</h3>
            <p className="text-xs text-slate-400 leading-relaxed relative z-10">
              The Summit Counter counts unique visitor sessions. To maintain data integrity, manual milestone editing is disabled in this view.
            </p>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center font-bold text-xs">SG</div>
                  <div>
                     <p className="text-[10px] font-bold">System Auditor</p>
                     <p className="text-[10px] text-slate-500">Verifying global stats...</p>
                  </div>
               </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

