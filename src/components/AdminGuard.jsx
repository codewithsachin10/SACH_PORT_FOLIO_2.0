"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
            <Shield size={20} className="text-white animate-pulse" />
          </div>
          <div className="w-6 h-6 border-2 border-white/10 border-t-[#7C3AED] rounded-full animate-spin" />
          <p className="text-white/30 text-sm font-medium">Verifying session...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
