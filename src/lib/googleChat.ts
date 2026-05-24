import { contactPurposeLabel, type ContactPurpose } from "@/lib/contact";

export type ContactPayload = {
  name: string;
  email: string;
  purpose: ContactPurpose;
  message: string;
};

export function formatContactMessage(payload: ContactPayload): string {
  return [
    "*New ResearchIndia inquiry*",
    "",
    `*Name:* ${payload.name}`,
    `*Email:* ${payload.email}`,
    `*Purpose:* ${contactPurposeLabel(payload.purpose)}`,
    "",
    "*Message:*",
    payload.message,
  ].join("\n");
}

export async function sendToGoogleChat(
  webhookUrl: string,
  text: string,
): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Google Chat webhook failed (${response.status})${detail ? `: ${detail}` : ""}`,
    );
  }
}
