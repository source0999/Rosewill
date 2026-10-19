"use client";

import { useEffect, useState } from "react";
import { typographyPresets, typographyStorageKey, type TypographyPreset } from "@/config/typography-presets";

const experimentalFontStylesheet = "https://fonts.googleapis.com/css2?family=Alegreya:wght@500;600&family=Figtree:wght@400;700&family=IBM+Plex+Sans:wght@400;700&family=Karla:wght@400;700&family=Lora:wght@500;600&family=Merriweather:wght@400;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Noto+Sans:wght@400;700&family=Open+Sans:wght@400;700&family=Sora:wght@600;700&display=swap";
const typographyProperties = ["--serif", "--sans", "--typography-heading-weight", "--typography-heading-letter-spacing", "--typography-heading-line-height", "--typography-body-weight", "--typography-body-line-height", "--typography-navigation-weight", "--typography-button-weight"];

function applyPreset(preset: TypographyPreset) {
  const root = document.documentElement;
  root.dataset.typographyLab = "active";
  root.style.setProperty("--serif", preset.headingFont);
  root.style.setProperty("--sans", preset.bodyFont);
  root.style.setProperty("--typography-heading-weight", preset.headingWeight);
  root.style.setProperty("--typography-heading-letter-spacing", preset.headingLetterSpacing);
  root.style.setProperty("--typography-heading-line-height", preset.headingLineHeight);
  root.style.setProperty("--typography-body-weight", preset.bodyWeight);
  root.style.setProperty("--typography-body-line-height", preset.bodyLineHeight);
  root.style.setProperty("--typography-navigation-weight", preset.navigationWeight);
  root.style.setProperty("--typography-button-weight", preset.buttonWeight);
}

function clearPreset() {
  const root = document.documentElement;
  delete root.dataset.typographyLab;
  typographyProperties.forEach((property) => root.style.removeProperty(property));
}

export function TypographyLab() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const preset = typographyPresets.find(({ id }) => id === window.localStorage.getItem(typographyStorageKey));
    if (preset) {
      applyPreset(preset);
      setSelectedPreset(preset.id);
    }
  }, []);

  function selectPreset(preset: TypographyPreset) {
    applyPreset(preset);
    window.localStorage.setItem(typographyStorageKey, preset.id);
    setSelectedPreset(preset.id);
  }

  function resetTypography() {
    clearPreset();
    window.localStorage.removeItem(typographyStorageKey);
    setSelectedPreset(null);
  }

  return (
    <aside className={`typography-lab${isCollapsed ? " is-collapsed" : ""}`} aria-label="Typography Lab">
      <link rel="stylesheet" href={experimentalFontStylesheet} />
      <div className="typography-lab-bar">
        <strong>Typography Lab</strong>
        <button className="typography-lab-collapse" type="button" onClick={() => setIsCollapsed((collapsed) => !collapsed)} aria-expanded={!isCollapsed} aria-label={isCollapsed ? "Expand Typography Lab" : "Collapse Typography Lab"} title={isCollapsed ? "Expand Typography Lab" : "Collapse Typography Lab"}>{isCollapsed ? "+" : "-"}</button>
      </div>
      {!isCollapsed && <div className="typography-lab-controls" role="toolbar" aria-label="Typography presets">
        {typographyPresets.map((preset) => <button key={preset.id} className={selectedPreset === preset.id ? "is-selected" : ""} type="button" onClick={() => selectPreset(preset)} aria-pressed={selectedPreset === preset.id} aria-label={`${preset.id}: ${preset.name}`} title={`${preset.id}: ${preset.name}`}>{preset.id}</button>)}
        <button className="typography-lab-reset" type="button" onClick={resetTypography}>Reset</button>
      </div>}
    </aside>
  );
}
