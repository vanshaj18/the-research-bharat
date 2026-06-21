"use client";

import Section from "@/components/Section";
import {
  CONTACT_PURPOSES,
  DATA_CONTRIBUTION_PURPOSE,
  validateDataDownloadLink,
  type ContactPurpose,
} from "@/lib/contact";
import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [purpose, setPurpose] = useState<ContactPurpose | "">("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const selectedPurpose = String(data.get("purpose") ?? "");
    const dataDownloadLink = String(data.get("dataDownloadLink") ?? "");

    if (selectedPurpose === DATA_CONTRIBUTION_PURPOSE) {
      const linkError = validateDataDownloadLink(dataDownloadLink);
      if (linkError) {
        setStatus("error");
        setErrorMessage(linkError);
        return;
      }
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          purpose: selectedPurpose,
          message: data.get("message"),
          ...(selectedPurpose === DATA_CONTRIBUTION_PURPOSE
            ? { dataDownloadLink }
            : {}),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
      setPurpose("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  function handleSubmitAnother() {
    setStatus("idle");
    setErrorMessage("");
    setPurpose("");
  }

  return (
    <Section
      id="contact"
      labCode="INBOUND"
      title="Contact"
      subtitle="Research partnerships, media inquiries, and dataset collaborations."
    >
      <div className="glass-card lab-card max-w-3xl p-[clamp(1.25rem,3vw,2rem)]">
      {status === "sent" ? (
        <div>
          <p className="font-display text-2xl text-foreground md:text-3xl">
            Thank you. Your inquiry has been received. We will respond shortly.
          </p>
          <button
            type="button"
            onClick={handleSubmitAnother}
            className="lab-btn lab-btn-secondary mt-6"
          >
            Submit another query
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid w-full gap-6 lg:grid-cols-2 lg:gap-x-[clamp(2rem,5vw,4rem)]"
        >
          <label className="block">
            <span className="font-label text-accent">Name</span>
            <input
              required
              name="name"
              disabled={status === "submitting"}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none disabled:opacity-60"
            />
          </label>
          <label className="block">
            <span className="font-label text-accent">Email</span>
            <input
              required
              type="email"
              name="email"
              disabled={status === "submitting"}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none disabled:opacity-60"
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="font-label text-accent">Purpose of contact</span>
            <select
              required
              name="purpose"
              value={purpose}
              onChange={(e) =>
                setPurpose(e.target.value as ContactPurpose | "")
              }
              disabled={status === "submitting"}
              className="glass-input mt-2 w-full px-4 py-3 text-base outline-none disabled:opacity-60"
            >
              <option value="" disabled>
                Select a purpose…
              </option>
              {CONTACT_PURPOSES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {purpose === DATA_CONTRIBUTION_PURPOSE && (
            <label className="block lg:col-span-2">
              <span className="font-label text-accent">Data download link</span>
              <p className="mt-1 text-sm text-muted">
                Share a link where we can download your dataset (Google Drive,
                Dropbox, GitHub, etc.).
              </p>
              <input
                required
                type="url"
                name="dataDownloadLink"
                disabled={status === "submitting"}
                placeholder="https://"
                className="glass-input mt-2 w-full px-4 py-3 text-base outline-none disabled:opacity-60"
              />
            </label>
          )}
          <label className="block lg:col-span-2">
            <span className="font-label text-accent">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              disabled={status === "submitting"}
              placeholder="Describe your research interest or data request…"
              className="glass-input mt-2 w-full resize-y px-4 py-3 text-base outline-none disabled:opacity-60"
            />
          </label>
          {status === "error" && errorMessage && (
            <p
              role="alert"
              className="text-sm font-medium text-red-300 lg:col-span-2"
            >
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="lab-btn lab-btn-primary w-full lg:col-span-2 lg:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Submit inquiry"}
          </button>
        </form>
      )}
      </div>
    </Section>
  );
}
