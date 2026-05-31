export const CONTACT_PURPOSES = [
  { value: "interview", label: "Interview" },
  { value: "discussion", label: "Discussion" },
  { value: "contribution", label: "Contribution" },
  { value: "data_contribution", label: "Data Contribution" },
  { value: "question", label: "Question" },
  { value: "suggestion", label: "Suggestion" },
  { value: "data_access", label: "Data access" },
] as const;

export type ContactPurpose = (typeof CONTACT_PURPOSES)[number]["value"];

export const DATA_CONTRIBUTION_PURPOSE = "data_contribution" as const;

export const MAX_DATA_DOWNLOAD_LINK = 2048;

const PURPOSE_VALUES = new Set<string>(
  CONTACT_PURPOSES.map((p) => p.value),
);

export function isContactPurpose(value: string): value is ContactPurpose {
  return PURPOSE_VALUES.has(value);
}

export function contactPurposeLabel(value: ContactPurpose): string {
  return CONTACT_PURPOSES.find((p) => p.value === value)?.label ?? value;
}

export function validateDataDownloadLink(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return "Add a download link for your data.";
  }
  if (trimmed.length > MAX_DATA_DOWNLOAD_LINK) {
    return "Download link is too long.";
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "Download link must start with http:// or https://.";
    }
  } catch {
    return "Enter a valid download link (http:// or https://).";
  }

  return null;
}
