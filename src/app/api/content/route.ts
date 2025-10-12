import { NextResponse } from "next/server";

import { SITE_CONTENT } from "@/lib/content";

type SupportedLanguage = keyof typeof SITE_CONTENT;

const DEFAULT_LANGUAGE: SupportedLanguage = "fr";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLang = searchParams.get("lang");

  const language = requestedLang && isSupportedLanguage(requestedLang)
    ? requestedLang
    : DEFAULT_LANGUAGE;

  return NextResponse.json(SITE_CONTENT[language]);
}

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return lang in SITE_CONTENT;
}
