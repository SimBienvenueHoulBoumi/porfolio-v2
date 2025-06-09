"use client";
import { forwardRef } from "react";

const Footer = forwardRef<HTMLDivElement>((_props, ref) => (
  <footer ref={ref} className="py-4 text-center text-gray-600 text-sm bg-black">
    &copy; 2025 Sim Bienvenue HOULBOUMI – Dev Fullstack Java/React.
  </footer>
));
Footer.displayName = "Footer";
export default Footer;
