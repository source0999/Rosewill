import Link from "next/link";
import { CinematicVideo } from "@/components/CinematicVideo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { donationUrl, upcomingEvents } from "@/lib/events";

const strengths = [
  ["01", "Therapeutic transitional housing", "A safe-haven home setting where young women can focus on recovery and their future."],
  ["02", "Trauma-focused care", "Trauma Focused Cognitive Behavioral Therapy (TF-CBT) and individualized care designed around each girl's needs."],
  ["03", "On-site support", "Most services are provided at the home, reducing the need for girls to be exposed to the public while receiving care."],
];

export default function HomePage() {
  const confirmedUpcomingEvents = upcomingEvents.filter((event) => !event.isSample).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="home" className="cinematic-home">
        <section className="cinematic-hero">
          <CinematicVideo
            priority
            src="/Rosewill/media/hero-women-walking.mp4"
            mobileSrc="/Rosewill/media/hero-women-walking-mobile.mp4"
            poster="/Rosewill/media/hero-women-walking-poster.webp"
            alt="Women walking together outdoors"
          />
          <div className="cinematic-hero-shade" />
          <div className="shell cinematic-hero-content">
            <p className="eyebrow">Rosewill Loving Arms Covenant House</p>
            <h1>A Place for Healing. <em>A Future of Hope.</em></h1>
            <p>Rosewill Loving Arms Covenant House is creating a safe place for females ages 13-20 during some of the most vulnerable times in their lives, so they can heal, become educated, and grow into confident young women.</p>
            <div className="actions cinematic-actions">
              <a className="button" href="#give">Support Our Mission</a>
              <a className="button hero-secondary" href="#about">Learn About Our Work</a>
            </div>
          </div>
        </section>

        <section className="editorial-mission" id="about">
          <div className="shell editorial-mission-grid">
            <p className="eyebrow">Our Mission</p>
            <div>
              <h2>Every woman deserves the opportunity to <em>heal and thrive.</em></h2>
              <p>Rosewill Loving Arms provides a safe haven with therapeutic transitional housing for those impacted by sexual abuse, sexual assault, and sex trafficking.</p>
              <a className="text-link" href="#services">Explore our approach &rarr;</a>
            </div>
          </div>
        </section>

        <section className="healing-feature">
          <div className="healing-media-wrap">
            <CinematicVideo
              src="/Rosewill/media/healing-hillside.mp4"
              mobileSrc="/Rosewill/media/healing-hillside-mobile.mp4"
              poster="/Rosewill/media/healing-hillside-poster.webp"
              alt="Women holding hands outdoors"
            />
          </div>
          <div className="healing-copy">
            <p className="eyebrow">A path forward</p>
            <h2>Healing is the beginning. <em>Empowerment is the journey.</em></h2>
            <p>Rosewill is designed as a transitional home for females who have experienced sexual abuse, sexual assault, or sexual exploitation. Here, each young woman can focus on her recovery and future.</p>
            <a className="text-link" href="#journey">How care begins &rarr;</a>
          </div>
        </section>

        <section className="what-we-do" id="services">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">What we do</p>
              <h2>Care that centers <em>her healing.</em></h2>
              <p>Every service is designed to help young women feel safe, understood, and supported in the next stage of their lives.</p>
            </div>
            <div className="care-list">
              {strengths.map(([number, title, text]) => (
                <article key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sisterhood-feature" id="journey">
          <div className="shell sisterhood-grid">
            <div className="sisterhood-copy">
              <p className="eyebrow">Connection matters</p>
              <h2>Stronger <em>together.</em></h2>
              <p>Thoughtful support begins with an evaluation and a care plan shaped around each girl&apos;s needs, because no two healing journeys are exactly alike.</p>
              <a className="text-link" href="#founder">Meet our founder &rarr;</a>
            </div>
            <div className="sisterhood-media-wrap">
              <CinematicVideo
                src="/Rosewill/media/sisterhood-embrace.mp4"
                poster="/Rosewill/media/sisterhood-embrace-poster.webp"
                alt="Women embracing in support"
              />
            </div>
          </div>
        </section>

        <section className="founder-callout" id="founder">
          <div className="shell founder-callout-grid">
            <p className="eyebrow">Meet our founder</p>
            <div>
              <h2>Advocacy rooted in <em>lived experience.</em></h2>
              <p>Wileen Stokes is an adult survivor of childhood sexual abuse. Her greatest accomplishment is giving back to her community and advocating for victims who have experienced sexual trauma.</p>
              <Link className="text-link" href="/team/">Meet Wileen Stokes &rarr;</Link>
            </div>
          </div>
        </section>

        <section className="home-events">
          <div className="shell">
            <div className="home-events-panel">
              <div>
                <p className="eyebrow">Community engagement</p>
                <h2>Stay <em>connected.</em></h2>
              </div>
            {confirmedUpcomingEvents.length ? (
              <div className="home-event-list">
                {confirmedUpcomingEvents.map((event) => <Link href={`/events/${event.slug}`} key={event.id}>{event.title}</Link>)}
              </div>
            ) : (
              <p className="events-empty">Confirmed community events will be shared here soon.</p>
            )}
              <Link className="button ghost events-link" href="/events/">Explore events</Link>
            </div>
          </div>
        </section>

        <section className="shell" id="give">
          <div className="cinematic-donate">
            <p className="eyebrow">Support Rosewill</p>
            <h2>Your support can help create a <em>brighter tomorrow.</em></h2>
            <p>Your gift helps Rosewill create a safe, therapeutic environment for young women on their healing journey.</p>
            <div className="actions"><a className="button" target="_blank" href={donationUrl}>Support Our Mission</a><a className="button ghost" href="mailto:wileen@rosewill.org">Get Involved</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
