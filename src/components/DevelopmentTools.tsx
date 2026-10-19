"use client";

import { TypographyLab } from "@/components/TypographyLab";

const typographyLabEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ENABLE_TYPOGRAPHY_LAB === "true";

export function DevelopmentTools() {
  return typographyLabEnabled ? <TypographyLab /> : null;
}
