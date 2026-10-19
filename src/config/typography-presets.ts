export type TypographyPreset = {
  id: "1" | "2" | "3" | "4" | "5";
  name: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  headingLetterSpacing: string;
  headingLineHeight: string;
  bodyWeight: string;
  bodyLineHeight: string;
  navigationWeight: string;
  buttonWeight: string;
};

// This is the single source of truth for the development-only Typography Lab.
export const typographyPresets: TypographyPreset[] = [
  {
    id: "1",
    name: "Shelter & Strength",
    headingFont: "Lora, Georgia, serif",
    bodyFont: '"Open Sans", Arial, sans-serif',
    headingWeight: "600",
    headingLetterSpacing: "-0.012em",
    headingLineHeight: "1.03",
    bodyWeight: "400",
    bodyLineHeight: "1.64",
    navigationWeight: "700",
    buttonWeight: "700",
  },
  {
    id: "2",
    name: "Open Heart",
    headingFont: "Alegreya, Georgia, serif",
    bodyFont: "Karla, Arial, sans-serif",
    headingWeight: "600",
    headingLetterSpacing: "-0.005em",
    headingLineHeight: "1.02",
    bodyWeight: "400",
    bodyLineHeight: "1.64",
    navigationWeight: "700",
    buttonWeight: "700",
  },
  {
    id: "3",
    name: "Quiet Confidence",
    headingFont: "Merriweather, Georgia, serif",
    bodyFont: '"Noto Sans", Arial, sans-serif',
    headingWeight: "700",
    headingLetterSpacing: "-0.018em",
    headingLineHeight: "1.04",
    bodyWeight: "400",
    bodyLineHeight: "1.65",
    navigationWeight: "700",
    buttonWeight: "700",
  },
  {
    id: "4",
    name: "Hopeful Clarity",
    headingFont: "Sora, Arial, sans-serif",
    bodyFont: "Figtree, Arial, sans-serif",
    headingWeight: "700",
    headingLetterSpacing: "-0.03em",
    headingLineHeight: "0.99",
    bodyWeight: "400",
    bodyLineHeight: "1.62",
    navigationWeight: "700",
    buttonWeight: "700",
  },
  {
    id: "5",
    name: "Rooted Care",
    headingFont: "Newsreader, Georgia, serif",
    bodyFont: '"IBM Plex Sans", Arial, sans-serif',
    headingWeight: "600",
    headingLetterSpacing: "-0.014em",
    headingLineHeight: "1.02",
    bodyWeight: "400",
    bodyLineHeight: "1.64",
    navigationWeight: "700",
    buttonWeight: "700",
  },
];

export const typographyStorageKey = "rosewill-typography-lab-preset";
