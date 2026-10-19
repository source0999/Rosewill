import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventGallery } from "@/components/EventGallery";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { donationUrl, events, formatEventDate, getEvent, pastEvents } from "@/lib/events";

export function generateStaticParams() { return events.filter((event) => event.published).map((event) => ({ slug: event.slug })); }

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const isPast = pastEvents.some((pastEvent) => pastEvent.slug === event.slug);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || event.locationName)}`;
  return <><SiteHeader /><main className="event-detail"><section className="event-detail-hero"><div className="shell"><Link className="back-link" href="/events">← Back to Events</Link><div className="detail-hero-grid"><div><p className="eyebrow">{isPast ? "Past event · Sample archive" : "Upcoming event · Sample listing"}</p><h1>{event.title}</h1><p className="detail-lead">{event.summary}</p><dl className="detail-meta"><div><dt>Date</dt><dd>{formatEventDate(event.startDate)}</dd></div><div><dt>Time</dt><dd>{event.time}</dd></div><div><dt>Place</dt><dd>{event.isVirtual ? "Virtual Event" : event.locationName}</dd></div></dl></div><Image src={event.coverImage} alt="Community gathering placeholder" width={1200} height={820} priority /></div></div></section><section className="shell event-detail-content"><div className="event-prose"><p className="eyebrow">{isPast ? "About this recap" : "About this event"}</p><h2>{isPast ? "A moment to remember" : "Gather with purpose"}</h2><p>{event.description}</p><p className="fixture-callout">This is sample content for the Rosewill events experience. Confirm all details and replace approved imagery before publishing.</p></div><aside className="detail-actions"><h3>Event details</h3><p>{event.isVirtual ? "This sample event is designed as a virtual gathering." : `${event.locationName}${event.address ? ` · ${event.address}` : ""}`}</p>{!event.isVirtual && <a className="button ghost" href={directions} target="_blank">Get Directions</a>}{!isPast && event.registrationUrl && <a className="button" href={event.registrationUrl}>RSVP / Register</a>}<a className="button ghost" href={donationUrl} target="_blank">Support Rosewill</a></aside></section>{isPast && event.galleryImages?.length ? <section className="event-gallery-section"><div className="shell"><div className="events-heading"><div><p className="eyebrow">Photo highlights</p><h2>Shared Moments</h2></div><p>Use the arrows or keyboard to explore this sample gallery.</p></div><EventGallery images={event.galleryImages} title={event.title} /></div></section> : null}</main><SiteFooter /></>;
}
