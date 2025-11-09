"use client";

import { FC } from "react";
import { FiMail, FiClock, FiZap } from "react-icons/fi";

import { ContactContent, ContactChannel } from "@/lib/content";
import { ICON_MAP, IconKey } from "@/lib/icon-map";
import { useTheme } from "@/context/ThemeContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

const channelIcon = (channel: ContactChannel) => ICON_MAP[channel.icon as IconKey] ?? FiMail;

const Contact: FC<{ content: ContactContent }> = ({ content }) => {
  const { theme } = useTheme();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver();
  const { language } = useLanguage();
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-100 via-sky-50 to-white"
    : "from-gray-950 via-gray-900 to-black";

  const primaryPanel = isAurora
    ? "border-sky-200/70 !bg-white text-slate-700 shadow-sky-200/30"
    : "border-cyan-500/30 bg-gray-950/80 text-gray-200 shadow-cyan-500/20";

  const stepCard = isAurora
    ? "border-sky-200/60 !bg-white"
    : "border-cyan-500/30 bg-gray-900/70";

  const channelCard = isAurora
    ? "border-sky-200/70 !bg-white text-slate-700 shadow-sky-200/30 focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-gray-900/80 text-gray-200 shadow-cyan-500/20 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-gray-950";

  const primaryChannel = content.channels[0];
  const secondaryChannel = content.channels[1];
  const primaryCta = isAurora
    ? "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-slate-900/25 transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
    : "inline-flex items-center justify-center rounded-full bg-cyan-500 text-slate-950 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400";
  const secondaryCta = isAurora
    ? "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
    : "inline-flex items-center justify-center rounded-full border border-cyan-500/40 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400";

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className={`contact-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-24 px-4 sm:px-8 ${hasIntersected ? "scroll-reveal revealed" : "scroll-reveal"}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(circle at 50% 75%, rgba(147,51,234,0.12), transparent 65%)"
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
              backgroundSize: "46px 46px"
            }}
          />
        </div>
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <SectionHeader
          isAurora={isAurora}
          align="center"
          title={content.title}
          description={content.description}
          titleClassName="text-4xl sm:text-5xl"
          eyebrow={
            <Badge
              isAurora={isAurora}
              variant="soft"
              icon={<FiClock className="text-sm" />}
            >
              {content.subtitle}
            </Badge>
          }
        >
          {(primaryChannel || secondaryChannel) && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {primaryChannel && (
                <a
                  href={primaryChannel.href}
                  target={primaryChannel.external ? "_blank" : undefined}
                  rel={primaryChannel.external ? "noopener noreferrer" : undefined}
                  className={primaryCta}
                >
                  {primaryChannel.action}
                </a>
              )}
              {secondaryChannel && (
                <a
                  href={secondaryChannel.href}
                  target={secondaryChannel.external ? "_blank" : undefined}
                  rel={secondaryChannel.external ? "noopener noreferrer" : undefined}
                  className={secondaryCta}
                >
                  {secondaryChannel.action}
                </a>
              )}
            </div>
          )}
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,400px)]">
          <div className="space-y-8">
            <div
              className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl px-8 py-10 sm:px-10 sm:py-12 ${primaryPanel}`}
            >
              <div className="relative z-10 space-y-6">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                    isAurora ? "bg-slate-100 text-slate-700" : "bg-cyan-500/15 text-cyan-200"
                  }`}
                >
                  <FiZap className="text-sm" />
                  {content.processTitle}
                </span>
                <p className={isAurora ? "text-base text-slate-600" : "text-base text-gray-300"}>
                  {content.description}
                </p>
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {content.steps.map((step) => (
                    <li
                      key={step.title}
                      className={`relative overflow-hidden rounded-2xl border px-4 py-5 transition-transform duration-300 ${stepCard}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-lg font-semibold ${
                            isAurora ? "text-slate-800" : "text-white"
                          }`}
                        >
                          {step.accent}
                        </span>
                        <span className={`text-[11px] uppercase tracking-[0.35em] ${isAurora ? "text-slate-500" : "text-cyan-200/80"}`}>
                          {language === "fr" ? "Étape" : "Step"}
                        </span>
                      </div>
                      <h4 className={`mt-3 text-sm font-semibold ${isAurora ? "text-slate-700" : "text-gray-100"}`}>
                        {step.title}
                      </h4>
                      <p className={`mt-2 text-xs leading-relaxed ${isAurora ? "text-slate-600" : "text-gray-400"}`}>
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.callouts.map((callout) => (
                <div
                  key={callout.label}
                  className={`rounded-2xl border px-5 py-4 text-left backdrop-blur-md transition-colors ${
                    isAurora ? "border-sky-200/70 bg-white text-slate-700" : "border-cyan-500/25 bg-gray-900/70 text-gray-200"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.35em] opacity-80">{callout.label}</p>
                  <p className="mt-2 text-lg font-semibold">{callout.value}</p>
                </div>
              ))}
            </div>

            <p className={`text-xs ${isAurora ? "text-slate-600" : "text-gray-400"}`}>{content.footnote}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {content.channels.map((channel) => {
              const Icon = channelIcon(channel);
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className={`relative flex overflow-hidden rounded-2xl border px-6 py-6 transition-all duration-500 hover-lift hover-glow group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${channelCard} ${hasIntersected ? "animate-scale-in" : ""}`}
                  style={{ animationDelay: `${content.channels.indexOf(channel) * 100}ms` }}
                  aria-label={channel.action}
                >
                  <div className="relative z-10 flex w-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                            isAurora
                              ? "bg-gradient-to-br from-sky-400 to-indigo-400 text-white shadow-sky-200/40"
                              : "bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950"
                          }`}
                        >
                          <Icon className="text-lg transition-transform duration-300 group-hover:scale-125" />
                        </span>
                        <div>
                          <p className={`text-sm font-semibold ${isAurora ? "text-slate-800" : "text-white"}`}>
                            {channel.label}
                          </p>
                          {channel.badge && (
                            <span
                              className={`mt-1 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                                isAurora ? "bg-slate-100 text-slate-700" : "bg-cyan-500/20 text-cyan-200"
                              }`}
                            >
                              {channel.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${isAurora ? "text-slate-600" : "text-gray-400"}`}>
                      {channel.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] ${
                        isAurora ? "text-slate-600" : "text-cyan-300"
                      }`}
                    >
                      {channel.action}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
