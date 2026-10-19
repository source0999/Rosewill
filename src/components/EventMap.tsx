"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { EventRecord, formatEventDate } from "@/lib/events";

export default function EventMap({ events }: { events: EventRecord[] }) {
  const mappable = events.filter((event) => event.coordinates && !event.isVirtual);
  if (!mappable.length) return <div className="map-empty"><strong>No mappable events are scheduled yet.</strong><p>Location markers will appear here when a confirmed in-person gathering is added.</p></div>;

  const center = mappable[0].coordinates!;
  return <div className="event-map"><MapContainer center={[center.lat, center.lng]} zoom={9} scrollWheelZoom={false}><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{mappable.map((event) => <CircleMarker key={event.id} center={[event.coordinates!.lat, event.coordinates!.lng]} radius={11} pathOptions={{ color: "#8e314b", fillColor: "#bd536e", fillOpacity: 0.9, weight: 2 }}><Popup><strong>{event.title}</strong><br />{formatEventDate(event.startDate)}<br /><Link href={`/events/${event.slug}`}>View details</Link><br /><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address || event.locationName)}`} target="_blank">Get directions</a></Popup></CircleMarker>)}</MapContainer></div>;
}
