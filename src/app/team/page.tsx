import Image from "next/image";
import Link from "next/link";
import { BioModal } from "@/components/BioModal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { additionalTeamMembers, boardMembers, founder } from "@/lib/team";
import { donationUrl } from "@/lib/events";

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main className="team-page">
        {founder && (
          <section className="founder-hero">
            <div className="shell founder-hero-grid">
              <figure className="founder-portrait">
                <Image src={founder.image!} alt={founder.imageAlt!} width={140} height={206} priority />
                <figcaption>Wileen Stokes, Founder</figcaption>
              </figure>
              <div className="founder-hero-copy">
                <p className="eyebrow">The Heart of Rosewill</p>
                <p className="founder-intro">Meet Our Founder</p>
                <h1>{founder.name}</h1>
                <p className="founder-role">{founder.role}</p>
                <p>{founder.fullBio ?? founder.shortBio}</p>
                <Link className="text-link" href="/#founder">Read Her Story →</Link>
              </div>
            </div>
          </section>
        )}

        <section className="board-section">
          <div className="shell">
            <div className="team-heading">
              <div>
                <p className="eyebrow">Our Leadership</p>
                <h2>Board of Directors</h2>
              </div>
              <p>Our Board of Directors provides leadership, guidance, and oversight as we work toward a stronger and more compassionate community.</p>
            </div>
            {boardMembers.length ? (
              <div className="board-grid">
                {boardMembers.map((member) => (
                  <article className="board-card" key={member.id}>
                    {member.image ? (
                      <Image src={member.image} alt={member.imageAlt || member.name} width={700} height={800} />
                    ) : (
                      <div className="initials" aria-label={`${member.name} portrait placeholder`}>
                        {member.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                    )}
                    <div>
                      {member.isPlaceholder ? <p className="profile-placeholder">Profile forthcoming</p> : null}
                      <h3>{member.name}</h3>
                      <p className="board-role">{member.role}</p>
                      <p>{member.shortBio}</p>
                      <BioModal profile={member} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="board-pending">
                <strong>Board profiles will be shared as they are confirmed.</strong>
                <p>Rosewill is preparing this space to introduce its leadership with their approved biographies and portraits.</p>
              </div>
            )}
          </div>
        </section>

        {additionalTeamMembers.length ? (
          <section className="additional-team"><div className="shell"><h2>The People Who Make It Possible</h2></div></section>
        ) : null}

        <section className="shell">
          <div className="team-cta">
            <div>
              <p className="eyebrow">Get involved</p>
              <h2>Be Part of Something Meaningful</h2>
              <p>Whether through volunteering, partnership, or giving, there are many ways to help Rosewill Loving Arms make a lasting difference.</p>
            </div>
            <div>
              <a className="button" href="mailto:wileen@rosewill.org">Get Involved</a>
              <a className="button ghost" href={donationUrl} target="_blank">Support Our Mission</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
