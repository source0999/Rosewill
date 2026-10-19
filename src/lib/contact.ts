export const inquiryTypes = [
  "Volunteering",
  "Fundraising & Donations",
  "Community Partnerships",
  "General Inquiry",
  "Contact Leadership",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

// Recipient assignments remain intentionally unconfigured until Rosewill approves them.
export const contactRouting = {
  deliveryConfigured: false,
  recipientEnvironmentVariable: "ROSEWILL_CONTACT_RECIPIENT",
  providerEnvironmentVariable: "ROSEWILL_CONTACT_PROVIDER",
} as const;
