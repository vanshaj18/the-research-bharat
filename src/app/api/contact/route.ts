import { formatContactMessage, sendToGoogleChat } from "@/lib/googleChat";
import { parseContactBody } from "@/lib/parseContactForm";
import { NextResponse } from "next/server";

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
  if (typeof payload === "string") {
    return NextResponse.json({ error: payload }, { status: 400 });
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
