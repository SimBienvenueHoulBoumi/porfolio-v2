"use client";
import { ForwardedRef, forwardRef } from "react";

const Footer = forwardRef<HTMLDivElement, {}>((_props, ref: ForwardedRef<HTMLDivElement>) => (
  <footer ref={ref} className="py-4 text-center text-gray-600 text-sm bg-black">
    &copy; 2025 Alex Martin – Dev Fullstack Java/React. Fait avec ❤️ et TailwindCSS.
  </footer>
));
Footer.displayName = "Footer";
export default Footer;
