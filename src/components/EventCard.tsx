import Image from "next/image";
import Link from "next/link";
import { EventRecord, formatDateBadge } from "@/lib/events";

export function EventCard({ event, past = false }: { event: EventRecord; past?: boolean }) {
  const badge = formatDateBadge(event.startDate);
  return <article className={`event-card${past ? " past-event-card" : ""}`}>
    <Link href={`/events/${event.slug}`} className="event-image-wrap" aria-label={`View ${event.title}`}>
      <Image src={event.coverImage} alt="Community gathering placeholder" width={900} height={650} sizes="(max-width: 760px) 100vw, 33vw" />
      {!past && <span className="date-badge"><small>{badge.month}</small><b>{badge.day}</b></span>}
      <span className="sample-badge">Sample listing</span>
    </Link>
    <div className="event-card-body">
      <p className="event-meta">{past ? "Past event" : event.isVirtual ? "Virtual event" : event.locationName}</p>
      <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
      <p>{event.summary}</p>
      <dl className="event-details"><div><dt>Date</dt><dd>{new Date(`${event.startDate}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd></div><div><dt>{past ? "Location" : "Time"}</dt><dd>{past ? event.locationName : event.time}</dd></div></dl>
      {past && event.photoCount ? <span className="photo-count">{event.photoCount} photos</span> : <span className="event-status">{event.registrationUrl ? "Registration required" : "Free event"}</span>}
      <Link className="text-link" href={`/events/${event.slug}`}>{past ? "View highlights" : "View event"} →</Link>
    </div>
  </article>;
}
