"use client";
import { forwardRef } from "react";
import { FaHeart, FaCode } from "react-icons/fa";

const Footer = forwardRef<HTMLDivElement>((_props, ref) => (
  <footer ref={ref} className="relative py-8 text-center bg-black border-t border-cyan-500/20 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
    
    <div className="relative z-10 max-w-4xl mx-auto px-4">
      {/* Main text */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400 text-sm mb-4">
        <span className="flex items-center gap-2">
          &copy; 2025 Sim Bienvenue HOULBOUMI
        </span>
        <span className="hidden sm:inline text-cyan-500/50">•</span>
        <span className="flex items-center gap-2">
          Dev Fullstack Java/React
        </span>
      </div>

      {/* Made with love */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
        <span>Fait avec</span>
        <FaHeart className="text-red-500 animate-pulse" />
        <span>et</span>
        <FaCode className="text-cyan-400" />
        <span>par un passionné de code</span>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="px-2 py-1 bg-gray-900 border border-cyan-500/20 rounded text-cyan-400">
          Next.js
        </span>
        <span className="px-2 py-1 bg-gray-900 border border-blue-500/20 rounded text-blue-400">
          React
        </span>
        <span className="px-2 py-1 bg-gray-900 border border-purple-500/20 rounded text-purple-400">
          TypeScript
        </span>
        <span className="px-2 py-1 bg-gray-900 border border-cyan-500/20 rounded text-cyan-400">
          Tailwind CSS
        </span>
      </div>

      {/* Decorative line */}
      <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </div>
  </footer>
));

Footer.displayName = "Footer";
export default Footer;
