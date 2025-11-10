import { NextResponse } from "next/server";

import { SITE_CONTENT } from "@/lib/content";

export function GET() {
  return NextResponse.json(SITE_CONTENT);
}
