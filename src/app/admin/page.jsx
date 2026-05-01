"use client";

import { useState, useEffect } from "react";
import { logout } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, orderBy, limit, getDocs, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Edit3, FolderGit2, Mail, 
  BarChart3, Bell, Settings, LogOut, Search, User,
  ArrowRight, Plus, Trash2, ExternalLink, Eye, EyeOff, X, Pencil,
  Upload, Link, Github, Linkedin, Twitter, Instagram,
  Clock, Shield, AlertTriangle, TrendingUp, MousePointerClick,
  Globe, Monitor, Smartphone, Tablet
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "edit", label: "Edit Portfolio", icon: Edit3 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

// --- Reusable UI Components ---

function GlassCard({ children, className, ...props }) {
  return (
    <div className={cn("bg-white/[0.02] border border-white/5 rounded-[24px]", className)} {...props}>
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, title, description, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Icon size={28} className="text-white/20" />
      </div>
      <h3 className="text-lg font-bold text-white/60 mb-2">{title}</h3>
      <p className="text-sm text-white/30 max-w-sm mb-6">{description}</p>
      {action && (
        <button onClick={onAction} className="bg-white/10 hover:bg-white/15 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
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
      <label className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />}
        <Component
          type={type}
          placeholder={placeholder}
          {...controlled}
          rows={textarea ? 3 : undefined}
          className={cn(
            "w-full bg-[#0B0F1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#7C3AED]/50 outline-none transition-colors",
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

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white font-sans flex overflow-hidden">
      {/* SIDEBAR */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-[260px] h-screen bg-white/[0.02] border-r border-white/5 backdrop-blur-xl flex flex-col flex-shrink-0 relative z-20"
      >
        <div className="p-6 pb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#00D4FF] flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            SG
          </div>
          <div>
            <span className="font-bold tracking-wide text-sm block">Admin Panel</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest">Portfolio CMS</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group text-sm",
                activeTab === item.id ? "text-white bg-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-transparent border-l-2 border-[#7C3AED] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon size={18} className={cn("relative z-10", activeTab === item.id && "text-[#00D4FF]")} />
              <span className="font-medium relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 mt-auto border-t border-white/5">
          <button 
            onClick={async () => {
              await logout();
              window.location.href = "/admin/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen flex flex-col relative z-10 overflow-y-auto">
        {/* TOP BAR */}
        <header className="h-[72px] border-b border-white/5 bg-[#0B0F1A]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
          <h1 className="text-lg font-bold capitalize tracking-tight flex items-center gap-3">
             <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#00D4FF]" />
             {activeTab === "edit" ? "Edit Portfolio" : activeTab}
          </h1>
          
          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#7C3AED]/50 transition-all w-[220px] text-white placeholder:text-white/20"
              />
            </div>
            
            <div className="flex items-center gap-3 pl-5 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Sachin G.</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                 <User size={16} className="text-white/50" />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl mx-auto"
            >
              {activeTab === "dashboard" && <DashboardHome />}
              {activeTab === "edit" && <EditPortfolio />}
              {activeTab === "projects" && <ProjectsManager />}
              {activeTab === "messages" && <MessagesPanel />}
              {activeTab === "analytics" && <AnalyticsPanel />}
              {activeTab === "notifications" && <NotificationsPanel />}
              {activeTab === "settings" && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ===== SECTION COMPONENTS =====

function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <GlassCard className="p-8 relative overflow-hidden border-[#7C3AED]/20 bg-gradient-to-r from-[#7C3AED]/10 to-transparent">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#00D4FF]/10 blur-[80px] rounded-full" />
        <h2 className="text-2xl font-black tracking-tight relative z-10">Welcome back, Sachin 👋</h2>
        <p className="text-white/40 text-sm mt-1 relative z-10">Manage your portfolio from here.</p>
      </GlassCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Projects", value: "7", sub: "Live on Vercel" },
          { label: "Messages", value: "0", sub: "Unread" },
          { label: "Last Updated", value: "Today", sub: "Portfolio" },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6">
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-3">{stat.label}</p>
            <h3 className="text-3xl font-black">{stat.value}</h3>
            <p className="text-xs text-white/30 mt-1">{stat.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Edit Hero", icon: Edit3 },
            { label: "Add Project", icon: Plus },
            { label: "View Site", icon: ExternalLink },
            { label: "Settings", icon: Settings },
          ].map((action, i) => (
            <button key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all text-sm font-medium text-white/60 hover:text-white">
              <action.icon size={16} />
              {action.label}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function EditPortfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "socials", label: "Social Links" },
    { id: "resume", label: "Resume" },
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
                : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
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
            <p className="text-sm text-white/30 mb-6">Update the main landing area of your portfolio.</p>
            <InputField label="Headline" placeholder="e.g. Architecting Digital Experiences" />
            <InputField label="Subheadline" placeholder="A brief intro about yourself" textarea />
            <InputField label="CTA Button Text" placeholder="e.g. View My Work" />
            <InputField label="CTA Button Link" placeholder="e.g. #projects" icon={Link} />
            <div className="pt-4"><SaveButton /></div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">About Section</h3>
            <p className="text-sm text-white/30 mb-6">Tell visitors who you are.</p>
            <InputField label="Full Name" placeholder="Sachin Gopalakrishnan" />
            <InputField label="Bio" placeholder="Write your biography here..." textarea />
            <InputField label="Location" placeholder="e.g. India" />
            <InputField label="Profile Image URL" placeholder="/assets/profile.png" icon={Link} />
            <div className="pt-4"><SaveButton /></div>
          </div>
        )}

        {activeSection === "skills" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Skills</h3>
            <p className="text-sm text-white/30 mb-6">Manage your tech stack categories and skills.</p>
            <InputField label="Frontend Skills" placeholder="React, Next.js, TypeScript, Tailwind..." />
            <InputField label="Backend Skills" placeholder="Node.js, Express, MongoDB, Supabase..." />
            <InputField label="Tools" placeholder="Git, Figma, VS Code, Vercel..." />
            <InputField label="Design" placeholder="UI/UX, Figma, Typography..." />
            <div className="pt-4"><SaveButton /></div>
          </div>
        )}

        {activeSection === "experience" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Experience</h3>
            <p className="text-sm text-white/30 mb-6">Add your work experience and education timeline.</p>
            <EmptyState 
              icon={Clock}
              title="No entries yet"
              description="Add your work experience, internships, or education history."
              action="+ Add Entry"
            />
          </div>
        )}

        {activeSection === "contact" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Contact Info</h3>
            <p className="text-sm text-white/30 mb-6">Update your contact details.</p>
            <InputField label="Email" type="email" placeholder="your@email.com" icon={Mail} />
            <InputField label="LinkedIn URL" placeholder="https://linkedin.com/in/..." icon={Linkedin} />
            <InputField label="Calendar Link" placeholder="https://calendly.com/..." icon={Link} />
            <div className="pt-4"><SaveButton /></div>
          </div>
        )}

        {activeSection === "socials" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Social Links</h3>
            <p className="text-sm text-white/30 mb-6">Connect your social profiles.</p>
            <InputField label="GitHub" placeholder="https://github.com/codewithsachin10" icon={Github} />
            <InputField label="LinkedIn" placeholder="https://linkedin.com/in/..." icon={Linkedin} />
            <InputField label="Twitter / X" placeholder="https://x.com/..." icon={Twitter} />
            <InputField label="Instagram" placeholder="https://instagram.com/..." icon={Instagram} />
            <div className="pt-4"><SaveButton /></div>
          </div>
        )}

        {activeSection === "resume" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-2">Resume</h3>
            <p className="text-sm text-white/30 mb-6">Upload your latest resume for visitors to download.</p>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[#7C3AED]/30 transition-colors cursor-pointer">
              <Upload size={32} className="text-white/20 mb-4" />
              <p className="text-sm font-bold text-white/50">Click to upload or drag and drop</p>
              <p className="text-xs text-white/20 mt-1">PDF, DOC up to 5MB</p>
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
  const [form, setForm] = useState({ title: "", description: "", url: "", github: "", tech: "" });
  const [saving, setSaving] = useState(false);

  // Real-time listener for projects
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleAdd = async () => {
    if (!form.title || !form.url) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "projects"), {
        ...form,
        tech: form.tech.split(",").map(t => t.trim()).filter(Boolean),
        createdAt: serverTimestamp(),
      });
      setForm({ title: "", description: "", url: "", github: "", tech: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add project:", err);
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
          <p className="text-sm text-white/30 mt-1">Manage your portfolio projects.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
        >
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Project</>}
        </button>
      </div>

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
              <h3 className="text-lg font-bold">New Project</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Project Name" placeholder="e.g. Snackzo" value={form.title} onChange={(v) => setForm({...form, title: v})} />
                <InputField label="Live URL" placeholder="https://your-project.vercel.app" icon={Link} value={form.url} onChange={(v) => setForm({...form, url: v})} />
              </div>

              <InputField label="Description" placeholder="A short description of what this project does..." textarea value={form.description} onChange={(v) => setForm({...form, description: v})} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="GitHub URL" placeholder="https://github.com/..." icon={Github} value={form.github} onChange={(v) => setForm({...form, github: v})} />
                <InputField label="Tech Stack" placeholder="React, Firebase, Tailwind (comma-separated)" value={form.tech} onChange={(v) => setForm({...form, tech: v})} />
              </div>

              {/* Live Preview */}
              {form.url && form.url.startsWith("http") && (
                <div>
                  <label className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2 block">Live Preview</label>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black h-[280px] relative">
                    <iframe
                      src={form.url}
                      className="w-full h-full border-0 pointer-events-none"
                      title="Preview"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={saving || !form.title || !form.url}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Saving...</> : "Save Project"}
                </button>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white text-sm font-medium px-4 py-2.5 transition-colors">Cancel</button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <GlassCard key={project.id} className="overflow-hidden group hover:border-white/10 transition-all">
              {/* Preview Thumbnail */}
              <div className="h-[200px] bg-black relative overflow-hidden">
                {project.url ? (
                  <iframe
                    src={project.url}
                    className="w-[200%] h-[200%] border-0 origin-top-left scale-50 pointer-events-none"
                    title={project.title}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Globe size={32} className="text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />

                {/* Hover Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <ExternalLink size={14} className="text-white" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Github size={14} className="text-white" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(project.id)} className="w-8 h-8 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                {project.description && <p className="text-sm text-white/40 mb-3 line-clamp-2">{project.description}</p>}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-[#7C3AED]/10 text-[#7C3AED] px-2.5 py-1 rounded-md border border-[#7C3AED]/10">
                        {t}
                      </span>
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
    </div>
  );
}

function MessagesPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Messages</h2>
          <p className="text-sm text-white/30 mt-1">Contact form submissions from your portfolio.</p>
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <EmptyState 
          icon={Mail}
          title="No messages yet"
          description="When visitors send you a message through your contact form, it will appear here."
        />
      </GlassCard>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Notifications</h2>
          <p className="text-sm text-white/30 mt-1">System alerts and activity updates.</p>
        </div>
        <button className="text-sm text-white/30 hover:text-white transition-colors">Mark all as read</button>
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
      <p className="text-sm text-white/30">Manage your admin account.</p>

      {/* Profile */}
      <GlassCard className="p-8">
        <h3 className="text-lg font-bold mb-6 pb-4 border-b border-white/5">Profile</h3>
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
        <h3 className="text-lg font-bold mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
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
        <p className="text-white/30 text-sm mb-6">This action cannot be undone.</p>
        <button 
          onClick={async () => {
            await logout();
            window.location.href = "/admin/login";
          }}
          className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all border border-red-500/20"
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
          <p className="text-sm text-white/30 mt-1">Real-time portfolio performance from Firestore.</p>
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
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-1">{metric.label}</p>
            <h3 className="text-2xl font-black">{metric.value.toLocaleString()}</h3>
          </GlassCard>
        ))}
      </div>

      {/* Chart */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">Last 7 Days</h3>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <TrendingUp size={14} /> Daily page views
          </div>
        </div>

        {hasChartData ? (
          <div className="h-[220px] flex items-end gap-3 border-b border-l border-white/5 pl-1 pb-1">
            {dailyData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-white/40 font-bold">{bar.value}</span>
                <div
                  className="w-full bg-gradient-to-t from-[#7C3AED] to-[#00D4FF] rounded-t-md transition-all duration-700 min-h-[4px]"
                  style={{ height: `${(bar.value / maxDaily) * 100}%` }}
                />
                <span className="text-[10px] text-white/30 font-bold">{bar.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[220px] flex items-center justify-center border border-dashed border-white/5 rounded-2xl">
            <div className="text-center">
              <BarChart3 size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-sm text-white/30 font-medium">No data yet</p>
              <p className="text-xs text-white/20 mt-1">Visit your portfolio to start tracking.</p>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <GlassCard className="p-6">
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-5">Top Pages</h3>
          {sortedPages.length > 0 ? (
            <div className="space-y-3">
              {sortedPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/30">{i + 1}</span>
                    <span className="text-sm font-medium text-white/60 font-mono">{page.path}</span>
                  </div>
                  <span className="text-sm font-bold text-white/40">{page.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/20 text-center py-8">No page data yet.</p>
          )}
        </GlassCard>

        {/* Devices + Referrers */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-5">Devices</h3>
            <div className="space-y-4">
              {[
                { label: "Desktop", icon: Monitor, count: devices.desktop || 0 },
                { label: "Mobile", icon: Smartphone, count: devices.mobile || 0 },
                { label: "Tablet", icon: Tablet, count: devices.tablet || 0 },
              ].map((device, i) => {
                const pct = devicePct(device.count);
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      <device.icon size={16} className="text-white/30" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/60 font-medium">{device.label}</span>
                        <span className="text-white/40 font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-5">Top Referrers</h3>
            {sortedRefs.length > 0 ? (
              <div className="space-y-3">
                {sortedRefs.map((ref, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-white/60 w-28 truncate">{ref.source}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(ref.views / maxRef) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-white/40 w-8 text-right">{ref.views}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/20 text-center py-4">No referrer data yet.</p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
