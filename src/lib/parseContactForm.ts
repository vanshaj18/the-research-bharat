import {
  DATA_CONTRIBUTION_PURPOSE,
  isContactPurpose,
  validateDataDownloadLink,
  type ContactPurpose,
} from "@/lib/contact";
import type { ContactPayload } from "@/lib/googleChat";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

export function parseContactBody(body: unknown): ContactPayload | string {
  if (!body || typeof body !== "object") {
    return "Invalid name, email, purpose, or message.";
  }

  const { name, email, purpose, message, dataDownloadLink } = body as Record<
    string,
    unknown
  >;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof purpose !== "string" ||
    typeof message !== "string"
  ) {
    return "Invalid name, email, purpose, or message.";
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPurpose = purpose.trim();
  const trimmedMessage = message.trim();

  if (
    !trimmedName ||
    !trimmedEmail ||
    !trimmedPurpose ||
    !trimmedMessage
  ) {
    return "Invalid name, email, purpose, or message.";
  }

  if (!isContactPurpose(trimmedPurpose)) {
    return "Invalid name, email, purpose, or message.";
  }

  if (
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedMessage.length > MAX_MESSAGE
  ) {
    return "Invalid name, email, purpose, or message.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Invalid name, email, purpose, or message.";
  }

  const payload: ContactPayload = {
    name: trimmedName,
    email: trimmedEmail,
    purpose: trimmedPurpose as ContactPurpose,
    message: trimmedMessage,
  };

  if (trimmedPurpose === DATA_CONTRIBUTION_PURPOSE) {
    if (typeof dataDownloadLink !== "string") {
      return "Add a download link for your data.";
    }

    const linkError = validateDataDownloadLink(dataDownloadLink);
    if (linkError) return linkError;

    payload.dataDownloadLink = dataDownloadLink.trim();
  }

  return payload;
}
