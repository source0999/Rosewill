"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TeamProfile } from "@/lib/team";

export function BioModal({ profile }: { profile: TeamProfile }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  if (!profile.fullBio) return null;
  return <><button className="text-link bio-trigger" onClick={() => setOpen(true)}>View Bio →</button>{open && <div className="bio-modal" role="dialog" aria-modal="true" aria-labelledby={`bio-${profile.slug}`}><div className="bio-modal-panel"><button className="bio-close" onClick={() => setOpen(false)} aria-label="Close biography">×</button>{profile.image && <Image src={profile.image} alt={profile.imageAlt || profile.name} width={760} height={950} /> }<div><p className="eyebrow">{profile.category}</p><h2 id={`bio-${profile.slug}`}>{profile.name}</h2><p className="bio-role">{profile.role}</p><p>{profile.fullBio}</p></div></div></div>}</>;
}
