"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { InquiryType, inquiryTypes } from "@/lib/contact";
import { donationUrl } from "@/lib/events";

const connectionOptions: { type: InquiryType; description: string; mark: string }[] = [
  { type: "Volunteering", description: "Interested in giving your time, talents, or skills? We would love to explore how you can get involved.", mark: "01" },
  { type: "Fundraising & Donations", description: "Learn how to support our mission through donations, fundraising initiatives, and community giving.", mark: "02" },
  { type: "Community Partnerships", description: "Connect with us about sponsorships, collaborations, and opportunities to make a greater impact together.", mark: "03" },
  { type: "General Inquiry", description: "Have a question about Rosewill Loving Arms? Our team is here to connect with you.", mark: "04" },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  inquiry: InquiryType;
  message: string;
  consent: boolean;
  website: string;
};

const initialValues: FormValues = { name: "", email: "", phone: "", inquiry: "General Inquiry", message: "", consent: false, website: "" };

export function ContactExperience() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "delivery-unavailable">("idle");
  const nameField = useRef<HTMLInputElement>(null);
  const lastAttempt = useRef(0);

  const selectInquiry = (inquiry: InquiryType) => {
    setValues((current) => ({ ...current, inquiry }));
    setErrors((current) => ({ ...current, inquiry: undefined }));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("contact-form")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => nameField.current?.focus(), reduceMotion ? 0 : 450);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (!values.inquiry) nextErrors.inquiry = "Please choose an inquiry type.";
    if (!values.message.trim()) nextErrors.message = "Please include a message.";
    if (!values.consent) nextErrors.consent = "Please confirm that we may contact you about this inquiry.";
    return nextErrors;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (values.website) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (Date.now() - lastAttempt.current < 10_000) {
      setStatus("delivery-unavailable");
      return;
    }
    lastAttempt.current = Date.now();
    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    setStatus("delivery-unavailable");
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="shell contact-hero-grid">
          <div>
            <p className="eyebrow">Connect with Rosewill</p>
            <h1>Let&apos;s Make a <em>Difference Together.</em></h1>
            <p>Whether you&apos;re interested in volunteering, supporting our fundraising efforts, exploring a partnership, or simply learning more about Rosewill Loving Arms, we&apos;d love to hear from you.</p>
          </div>
          <figure className="contact-hero-image"><Image src="/Rosewill/media/sisterhood-embrace-poster.webp" alt="Women embracing in support" fill priority sizes="(max-width: 760px) 100vw, 42vw" /></figure>
        </div>
      </section>

      <section className="contact-ways">
        <div className="shell">
          <div className="contact-section-heading"><p className="eyebrow">Start the conversation</p><h2>How Would You Like to <em>Connect?</em></h2></div>
          <div className="contact-card-grid">
            {connectionOptions.map((option) => (
              <button className="contact-card" key={option.type} type="button" onClick={() => selectInquiry(option.type)}>
                <span className="contact-card-mark" aria-hidden="true">{option.mark}</span>
                <span className="contact-card-title">{option.type}</span>
                <span className="contact-card-copy">{option.description}</span>
                <span className="contact-card-action">Select this inquiry &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="contact-form">
        <div className="shell contact-form-layout">
          <div className="contact-form-intro">
            <p className="eyebrow">Send a message</p>
            <h2>We&apos;re here to <em>listen.</em></h2>
            <p>Tell us a little about yourself and how you&apos;d like to connect. We&apos;ll make sure your message reaches the appropriate team member.</p>
          </div>
          <form className="contact-form" noValidate onSubmit={submit}>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setValues({ ...values, website: event.target.value })} /></div>
            <div className="form-field"><label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label><input ref={nameField} id="contact-name" maxLength={120} autoComplete="name" value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name ? <p id="contact-name-error" className="form-error">{errors.name}</p> : null}</div>
            <div className="form-field"><label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label><input id="contact-email" type="email" maxLength={160} autoComplete="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email ? <p id="contact-email-error" className="form-error">{errors.email}</p> : null}</div>
            <div className="form-field"><label htmlFor="contact-phone">Phone Number <span className="optional">Optional</span></label><input id="contact-phone" type="tel" maxLength={30} autoComplete="tel" value={values.phone} onChange={(event) => setValues({ ...values, phone: event.target.value })} /></div>
            <div className="form-field"><label htmlFor="contact-inquiry">Inquiry Type <span aria-hidden="true">*</span></label><select id="contact-inquiry" value={values.inquiry} onChange={(event) => setValues({ ...values, inquiry: event.target.value as InquiryType })} aria-invalid={Boolean(errors.inquiry)}>{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select>{errors.inquiry ? <p className="form-error">{errors.inquiry}</p> : null}</div>
            <div className="form-field form-message"><label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label><textarea id="contact-message" maxLength={1200} value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : "contact-message-count"} /> <span id="contact-message-count" className="character-count">{values.message.length}/1200</span>{errors.message ? <p id="contact-message-error" className="form-error">{errors.message}</p> : null}</div>
            <div className="form-consent"><input id="contact-consent" type="checkbox" checked={values.consent} onChange={(event) => setValues({ ...values, consent: event.target.checked })} aria-invalid={Boolean(errors.consent)} /><label htmlFor="contact-consent">I agree to be contacted regarding this inquiry.</label></div>{errors.consent ? <p className="form-error">{errors.consent}</p> : null}
            <p className="privacy-notice">Please avoid sharing sensitive personal, medical, or confidential information through this form.</p>
            {status === "delivery-unavailable" ? <p className="form-status" role="alert">Online message delivery is not configured yet, so your message was not sent. Please use the Contact Wileen option below.</p> : null}
            <button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Checking message..." : "Send Message"}</button>
          </form>
        </div>
      </section>

      <section className="contact-leadership">
        <div className="shell"><div className="contact-section-heading"><p className="eyebrow">Relationships that matter</p><h2>Connect With Our <em>Leadership.</em></h2><p>Our leadership team welcomes opportunities to build relationships, answer questions, and strengthen our community.</p></div>
          <div className="leadership-card-grid">
            <article className="leadership-card wileen-contact"><Image src="/Rosewill/images/wileen-stokes.jpg" alt="Wileen Stokes" width={140} height={206} /><div><p className="eyebrow">Founder</p><h3>Wileen Stokes</h3><p>For questions about Rosewill Loving Arms, community involvement, and organizational initiatives, connect with Wileen.</p><a className="text-link" href="mailto:wileen@rosewill.org">Contact Wileen &rarr;</a></div></article>
            <article className="leadership-card board-contact"><p className="eyebrow">Board of directors</p><h3>Build something meaningful together.</h3><p>Reach out about community partnerships, volunteering, fundraising initiatives, or opportunities to support Rosewill&apos;s mission.</p><button className="text-link text-button" type="button" onClick={() => selectInquiry("Contact Leadership")}>Contact the Board &rarr;</button><Link className="text-link" href="/team/">Meet our team &rarr;</Link></article>
          </div>
        </div>
      </section>

      <section className="shell"><div className="contact-closing"><p className="eyebrow">Together, we can do more</p><h2>Every Act of <em>Kindness Matters.</em></h2><p>There are many ways to be part of the change. Whether you give, volunteer, or help spread awareness, your support matters.</p><div className="actions"><a className="button" href={donationUrl} target="_blank">Support Our Mission</a><Link className="button ghost" href="/events/">Explore Upcoming Events</Link></div></div></section>
    </main>
  );
}
