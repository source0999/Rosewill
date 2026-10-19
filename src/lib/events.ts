export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  startDate: string;
  endDate?: string;
  time: string;
  locationName: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  isVirtual?: boolean;
  coverImage: string;
  galleryImages?: string[];
  registrationUrl?: string;
  photoCount?: number;
  published: boolean;
  isSample: true;
};

export const donationUrl = "https://cash.app/qr/$Rosewill2009";

// Development fixtures only. Replace these records with confirmed Rosewill events before publishing.
export const events: EventRecord[] = [
  {
    id: "community-open-house",
    slug: "community-open-house",
    title: "Community Open House",
    summary: "A sample gathering space for neighbors to learn, connect, and support a shared purpose.",
    description: "This development-only sample illustrates how Rosewill can share a welcoming open-house invitation. Confirm the details, venue, and RSVP destination before publishing a live event.",
    startDate: "2027-03-20",
    time: "2:00 PM - 4:00 PM",
    locationName: "Sample Community Venue",
    address: "Gray Court, SC",
    coordinates: { lat: 34.6087, lng: -82.1134 },
    coverImage: "/Rosewill/images/events/community-table.jpg",
    registrationUrl: "mailto:wileen@rosewill.org?subject=Community%20Open%20House%20Interest",
    published: true,
    isSample: true,
  },
  {
    id: "caregiver-connection-circle",
    slug: "caregiver-connection-circle",
    title: "Caregiver Connection Circle",
    summary: "A sample virtual conversation designed to demonstrate a simple online event listing.",
    description: "This is a development fixture for a future online gathering. Before publishing, replace this copy with confirmed facilitation details, access information, and any registration requirements.",
    startDate: "2027-05-06",
    time: "6:30 PM - 7:30 PM",
    locationName: "Virtual Event",
    isVirtual: true,
    coverImage: "/Rosewill/images/events/community-connection.jpg",
    registrationUrl: "mailto:wileen@rosewill.org?subject=Caregiver%20Connection%20Circle%20Interest",
    published: true,
    isSample: true,
  },
  {
    id: "neighbor-to-neighbor",
    slug: "neighbor-to-neighbor",
    title: "Neighbor to Neighbor Gathering",
    summary: "A sample archive entry showing how Rosewill can preserve moments of connection.",
    description: "This past-event fixture demonstrates a recap layout and photo gallery. Replace it with verified event information and approved images before public use.",
    startDate: "2026-08-15",
    time: "Community gathering",
    locationName: "Sample Community Venue",
    address: "Gray Court, SC",
    coverImage: "/Rosewill/images/events/community-conversation.jpg",
    galleryImages: [
      "/Rosewill/images/events/community-conversation.jpg",
      "/Rosewill/images/events/community-gathering.jpg",
      "/Rosewill/images/events/community-table.jpg",
    ],
    photoCount: 3,
    published: true,
    isSample: true,
  },
  {
    id: "community-care-day",
    slug: "community-care-day",
    title: "Community Care Day",
    summary: "A sample archive entry for a future collection of community-led moments.",
    description: "This development fixture exists to demonstrate an event recap, image gallery, and consistent donation call to action.",
    startDate: "2026-04-12",
    time: "Community gathering",
    locationName: "Sample Community Venue",
    address: "Gray Court, SC",
    coverImage: "/Rosewill/images/events/community-gathering.jpg",
    galleryImages: [
      "/Rosewill/images/events/community-gathering.jpg",
      "/Rosewill/images/events/community-connection.jpg",
    ],
    photoCount: 2,
    published: true,
    isSample: true,
  },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const eventDate = (event: EventRecord) => new Date(`${event.startDate}T12:00:00`);

export const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );

export const formatDateBadge = (date: string) => {
  const value = new Date(`${date}T12:00:00`);
  return {
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(value),
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(value),
  };
};

export const upcomingEvents = events
  .filter((event) => event.published && eventDate(event) >= today)
  .sort((a, b) => eventDate(a).getTime() - eventDate(b).getTime());

export const pastEvents = events
  .filter((event) => event.published && eventDate(event) < today)
  .sort((a, b) => eventDate(b).getTime() - eventDate(a).getTime());

export const getEvent = (slug: string) => events.find((event) => event.slug === slug && event.published);
