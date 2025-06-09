"use client";
import { useEffect } from "react";

const useFadeIn = (): void => {
  useEffect(() => {
    const animateOnScroll = () => {
      document.querySelectorAll<HTMLElement>('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) el.classList.add('visible');
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
};

export default useFadeIn;
