"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import type { WishPayload } from "@/types/wedding";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { Lotus } from "./ornaments/Lotus";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

type Errors = Partial<Record<keyof WishPayload, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: WishPayload = { name: "", email: "", phone: "", message: "" };

function validate(v: WishPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  else if (v.name.trim().length > 80) e.name = "Please keep your name under 80 characters.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, or leave it blank.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,19}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number, or leave it blank.";
  if (v.message.trim().length < 3) e.message = "Please write a few words for the couple.";
  else if (v.message.trim().length > 1500) e.message = "Please keep your wishes under 1500 characters.";
  return e;
}

export function WishesForm() {
  const [values, setValues] = useState<WishPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const update = (key: keyof WishPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`wish-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/api/wishes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; errors?: Errors };
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "Your wishes could not be sent.");
      }
      setStatus("sent");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof TypeError
          ? "We couldn't reach the server. Check your connection and send again."
          : (err as Error).message,
      );
    }
  };

  const fieldError = (key: keyof WishPayload) =>
    errors[key] ? (
      <p id={`wish-${key}-error`} className="mt-2 text-sm text-temple">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: keyof WishPayload) => (errors[key] ? `wish-${key}-error` : undefined);

  return (
    <section id="wishes" aria-labelledby="wishes-title" className="section-pad bg-sandal/50">
      <div className="container-wedding">
        <SectionTitle
          id="wishes-title"
          title="Bless the Couple"
          kicker="Leave your wishes"
          intro="Your words will reach Abinesh and Deepika directly."
        />

        <Reveal className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="thanks"
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-14 text-center"
              >
                <Lotus className="h-8 w-14 text-gold" />
                <p className="mt-6 font-display text-4xl font-light italic text-maroon">Thank you for your beautiful wishes ❤️</p>
                <button type="button" onClick={() => setStatus("idle")} className="btn btn-line mt-10">
                  Send Another Wish
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8"
              >
                <div>
                  <label htmlFor="wish-name" className="font-display text-lg italic text-gold-deep">
                    Your name <span aria-hidden>*</span>
                  </label>
                  <input
                    id="wish-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={80}
                    value={values.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy("name")}
                    className="field"
                  />
                  {fieldError("name")}
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="wish-email" className="font-display text-lg italic text-gold-deep">
                      Email
                    </label>
                    <input
                      id="wish-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      maxLength={120}
                      value={values.email}
                      onChange={update("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={describedBy("email")}
                      className="field"
                    />
                    {fieldError("email")}
                  </div>
                  <div>
                    <label htmlFor="wish-phone" className="font-display text-lg italic text-gold-deep">
                      Phone
                    </label>
                    <input
                      id="wish-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                      value={values.phone}
                      onChange={update("phone")}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={describedBy("phone")}
                      className="field"
                    />
                    {fieldError("phone")}
                  </div>
                </div>

                <div>
                  <label htmlFor="wish-message" className="font-display text-lg italic text-gold-deep">
                    Your wishes <span aria-hidden>*</span>
                  </label>
                  <textarea
                    id="wish-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={1500}
                    placeholder="Share your blessings and beautiful wishes..."
                    value={values.message}
                    onChange={update("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy("message")}
                    className="field resize-y"
                  />
                  {fieldError("message")}
                </div>

                {/* Honeypot: hidden from people, tempting to bots */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="wish-website">Website</label>
                  <input id="wish-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>

                <div className="flex flex-col items-center gap-4 pt-2">
                  <button type="submit" className="btn btn-solid min-w-[14rem]" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                    )}
                    {status === "sending" ? "Sending Wishes" : "Send Wishes"}
                  </button>
                  <p role="alert" className="min-h-[1.5rem] text-center text-sm text-temple">
                    {status === "error" ? serverError : ""}
                  </p>
                  <p className="text-xs text-ink-soft">* Required</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
