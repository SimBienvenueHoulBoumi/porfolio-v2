"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const FloatingThemeToggle = () => {
  const [hidden, setHidden] = useState(true);
  const [suppress, setSuppress] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (window.location.pathname.startsWith("/tutorial")) {
      setSuppress(true);
      return;
    }

    const root = document.documentElement;
    const update = () => {
      setHidden(root.classList.contains("page-loading"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  if (hidden || suppress) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-[999] flex flex-col items-end gap-3 sm:bottom-24 sm:right-8">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default FloatingThemeToggle;
