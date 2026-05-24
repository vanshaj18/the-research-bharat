import { isContactPurpose } from "@/lib/contact";
import {
  type ContactPayload,
  formatContactMessage,
  sendToGoogleChat,
} from "@/lib/googleChat";
import { NextResponse } from "next/server";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

function parseContactBody(
  body: unknown,
): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, purpose, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof purpose !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    purpose: purpose.trim(),
    message: message.trim(),
  };

  if (!payload.name || !payload.email || !payload.purpose || !payload.message) {
    return null;
  }

  if (!isContactPurpose(payload.purpose)) return null;
  if (
    payload.name.length > MAX_NAME ||
    payload.email.length > MAX_EMAIL ||
    payload.message.length > MAX_MESSAGE
  ) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;

  return {
    name: payload.name,
    email: payload.email,
    purpose: payload.purpose,
    message: payload.message,
  };
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_CHAT_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parseContactBody(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid name, email, purpose, or message." },
      { status: 400 },
    );
  }

  try {
    await sendToGoogleChat(webhookUrl, formatContactMessage(payload));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact webhook error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 502 },
    );
  }
}
