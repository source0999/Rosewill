"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const eventsActive = pathname?.startsWith("/events");
  const teamActive = pathname?.startsWith("/team");
  const contactActive = pathname?.startsWith("/contact");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDonationOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="shell nav">
        <Link className="brand" href="/" onClick={close} aria-label="Rosewill Loving Arms home">
          <img className="nav-logo" src="/Rosewill/logos/rosewill-logo-enhanced.png" alt="Rosewill Loving Arms Covenant House" />
        </Link>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="site-navigation">
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <nav id="site-navigation" className={open ? "links open" : "links"} aria-label="Primary navigation">
          <Link href="/#about" onClick={close}>Home</Link>
          <Link className={eventsActive ? "active" : undefined} href="/events" onClick={close}>Events</Link>
          <Link className={teamActive ? "active" : undefined} href="/team" onClick={close}>Our Team</Link>
          <Link className={contactActive ? "active" : undefined} href="/contact" onClick={close}>Contact</Link>
          <button className="button small donation-nav-button" type="button" onClick={() => { close(); setDonationOpen(true); }} aria-haspopup="dialog" aria-expanded={donationOpen}>Donation</button>
        </nav>
      </div>
      {donationOpen ? <div className="donation-modal" role="presentation" onMouseDown={() => setDonationOpen(false)}><div className="donation-modal-panel" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="donation-modal-close" type="button" onClick={() => setDonationOpen(false)} aria-label="Close donation message">x</button><p className="eyebrow">Rosewill donations</p><h2 id="donation-modal-title">Donations are coming soon.</h2><p>Thank you for your interest in supporting Rosewill Loving Arms.</p><button className="button" type="button" onClick={() => setDonationOpen(false)}>Close</button></div></div> : null}
    </header>
  );
}
