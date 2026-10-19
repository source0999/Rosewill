"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CinematicVideoProps = {
  className?: string;
  poster: string;
  src: string;
  mobileSrc?: string;
  alt: string;
  priority?: boolean;
};

export function CinematicVideo({ className = "", poster, src, mobileSrc, alt, priority = false }: CinematicVideoProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const useMobileSource = window.matchMedia("(max-width: 900px)").matches;
    const sourceForDevice = useMobileSource ? mobileSrc ?? src : src;

    if (reduceMotion || connection?.saveData) return;
    if (priority) {
      setActiveSource(sourceForDevice);
      return;
    }

    const node = mediaRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSource(sourceForDevice);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mobileSrc, priority, src]);

  return (
    <div className={`cinematic-video ${className}`} ref={mediaRef}>
      <Image src={poster} alt={alt} fill priority={priority} sizes="100vw" className="cinematic-poster" />
      {activeSource ? (
        <video
          aria-hidden="true"
          autoPlay
          className={isReady ? "is-ready" : ""}
          loop
          muted
          onCanPlay={() => setIsReady(true)}
          playsInline
          preload={priority ? "metadata" : "none"}
        >
          <source src={activeSource} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
