"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function EventGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (active === null) return; if (event.key === "Escape") setActive(null); if (event.key === "ArrowRight") setActive((active + 1) % images.length); if (event.key === "ArrowLeft") setActive((active - 1 + images.length) % images.length); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [active, images.length]);
  return <><div className="gallery-grid">{images.map((image, index) => <button key={image} className="gallery-image" onClick={() => setActive(index)} aria-label={`Open photo ${index + 1} from ${title}`}><Image src={image} alt={`${title} gallery photo ${index + 1}`} width={1100} height={760} loading="lazy" sizes="(max-width: 760px) 50vw, 33vw" /></button>)}</div>{active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} photo gallery`}><button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close photo viewer">×</button><button className="lightbox-nav previous" onClick={() => setActive((active - 1 + images.length) % images.length)} aria-label="Previous photo">‹</button><Image src={images[active]} alt={`${title} gallery photo ${active + 1}`} width={1600} height={1100} priority /><button className="lightbox-nav next" onClick={() => setActive((active + 1) % images.length)} aria-label="Next photo">›</button></div>}</>;
}
