import { useState, type FormEvent } from "react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

// Endpoint público de Formspree (no es una clave secreta: el formulario lo expone igual en el navegador).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdkwze";

export interface ContactFormLabels {
  name: string;
  email: string;
  subject: string;
  message: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderSubject: string;
  placeholderMessage: string;
  submit: string;
  sending: string;
  successButton: string;
  success: string;
  error: string;
}

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground";

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          {labels.name}
        </label>
        <input type="text" id="name" name="name" required className={inputClass} placeholder={labels.placeholderName} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          {labels.email}
        </label>
        <input type="email" id="email" name="email" required className={inputClass} placeholder={labels.placeholderEmail} />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          {labels.subject}
        </label>
        <input type="text" id="subject" name="subject" required className={inputClass} placeholder={labels.placeholderSubject} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputClass, "resize-none")}
          placeholder={labels.placeholderMessage}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          buttonVariants(),
          "w-full h-12 text-base font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-all shadow-lg hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {status === "sending" ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {labels.sending}
          </>
        ) : status === "success" ? (
          <>{labels.successButton}</>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {labels.submit}
          </>
        )}
      </button>

      {/* Mensajes de estado. role="alert" hace que los lectores de pantalla los anuncien al aparecer
          (sin envoltorio extra, para no alterar el espaciado space-y-5 del formulario). */}
      {status === "success" && (
        <div role="alert" className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary">
          ✓ {labels.success}
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
          ✗ {labels.error}
        </div>
      )}
    </form>
  );
}
