/* eslint-disable */
// @ts-nocheck
"use client";
import "./hero-40.css";

import { SectionHero } from "@/components/originkit/ui/hero-40/section-hero";

const Hero40 = ({ onStartChat, theme, onToggleTheme }) => (
  <SectionHero
    onStartChat={onStartChat}
    theme={theme}
    onToggleTheme={onToggleTheme}
  />
);

export default Hero40;
