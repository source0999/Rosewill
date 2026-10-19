"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventRecord } from "@/lib/events";

const EventMap = dynamic(() => import("@/components/EventMap"), { ssr: false, loading: () => <div className="map-loading">Loading map…</div> });

export function EventExplorer({ events }: { events: EventRecord[] }) {
  const [view, setView] = useState<"cards" | "map">("cards");
  return <><div className="event-view-bar"><div><p className="sample-note">Development fixtures · Dates and locations are examples only.</p></div><div className="view-toggle" aria-label="Event display mode"><button className={view === "cards" ? "selected" : ""} onClick={() => setView("cards")} aria-pressed={view === "cards"}>Cards</button><button className={view === "map" ? "selected" : ""} onClick={() => setView("map")} aria-pressed={view === "map"}>Map</button></div></div>{view === "cards" ? events.length ? <div className="event-grid">{events.map((event) => <EventCard event={event} key={event.id} />)}</div> : <div className="events-empty"><h3>More opportunities to connect are on the way.</h3><p>Check back for upcoming gatherings, community initiatives, and ways to get involved.</p></div> : <EventMap events={events} />}</>;
}
