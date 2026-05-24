export const CONTACT_PURPOSES = [
  { value: "interview", label: "Interview" },
  { value: "discussion", label: "Discussion" },
  { value: "contribution", label: "Contribution" },
  { value: "question", label: "Question" },
  { value: "suggestion", label: "Suggestion" },
  { value: "data_access", label: "Data access" },
] as const;

export type ContactPurpose = (typeof CONTACT_PURPOSES)[number]["value"];

const PURPOSE_VALUES = new Set<string>(
  CONTACT_PURPOSES.map((p) => p.value),
);

export function isContactPurpose(value: string): value is ContactPurpose {
  return PURPOSE_VALUES.has(value);
}

export function contactPurposeLabel(value: ContactPurpose): string {
  return CONTACT_PURPOSES.find((p) => p.value === value)?.label ?? value;
}
