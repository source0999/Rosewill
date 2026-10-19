export type TeamProfile = {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: "Founder" | "Board" | "Staff" | "Advisor" | "Volunteer";
  shortBio: string;
  fullBio?: string;
  image?: string;
  imageAlt?: string;
  displayOrder: number;
  featured?: boolean;
  isPlaceholder?: boolean;
  published: boolean;
};

export const teamProfiles: TeamProfile[] = [
  {
    id: "wileen-stokes",
    slug: "wileen-stokes",
    name: "Wileen Stokes",
    role: "Founder",
    category: "Founder",
    shortBio: "Founder and advocate for people who have experienced sexual trauma.",
    fullBio: "Wileen is an adult survivor of childhood sexual abuse. Her greatest accomplishment is giving back to her community and advocating for victims who have experienced sexual trauma. She believes that if she overcame being a victim, so can every human being.",
    image: "/Rosewill/images/wileen-stokes.jpg",
    imageAlt: "Wileen Stokes",
    displayOrder: 1,
    featured: true,
    published: true,
  },
  // Clearly labeled development placeholders. Replace with approved board details before publishing.
  {
    id: "board-chair-placeholder",
    slug: "board-chair-placeholder",
    name: "Board Chair",
    role: "Leadership and governance",
    category: "Board",
    shortBio: "A confirmed board chair profile and biography will be added here.",
    displayOrder: 2,
    isPlaceholder: true,
    published: true,
  },
  {
    id: "board-treasurer-placeholder",
    slug: "board-treasurer-placeholder",
    name: "Board Treasurer",
    role: "Financial oversight",
    category: "Board",
    shortBio: "A confirmed board treasurer profile and biography will be added here.",
    displayOrder: 3,
    isPlaceholder: true,
    published: true,
  },
  {
    id: "board-secretary-placeholder",
    slug: "board-secretary-placeholder",
    name: "Board Secretary",
    role: "Records and compliance",
    category: "Board",
    shortBio: "A confirmed board secretary profile and biography will be added here.",
    displayOrder: 4,
    isPlaceholder: true,
    published: true,
  },
];

export const founder = teamProfiles.find((profile) => profile.featured && profile.published);
export const boardMembers = teamProfiles.filter((profile) => profile.category === "Board" && profile.published).sort((a, b) => a.displayOrder - b.displayOrder);
export const additionalTeamMembers = teamProfiles.filter((profile) => !profile.featured && profile.category !== "Board" && profile.published).sort((a, b) => a.displayOrder - b.displayOrder);
