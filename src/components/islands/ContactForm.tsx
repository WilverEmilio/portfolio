import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

// Endpoint público de Formspree (no es una clave secreta: el navegador lo necesita para enviar).
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
  success: string;
  error: string;
  errorPrefix: string;
  errorName: string;
  errorEmailMissing: string;
  errorEmailFormat: string;
  errorSubject: string;
  errorMessage: string;
}

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "subject" | "message";
type FieldEl = HTMLInputElement | HTMLTextAreaElement;

const FIELDS: Field[] = ["name", "email", "subject", "message"];

const controlClass =
  "w-full rounded-md border border-input bg-card px-3.5 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/75 transition-[border-color,box-shadow] duration-150 " +
  "focus-visible:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 " +
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/20";

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [announcement, setAnnouncement] = useState("");
  const dirty = useRef(new Set<Field>()); // campos modificados por el usuario
  const shown = useRef(new Set<Field>()); // campos cuyo error ya puede mostrarse
  const announceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => {
    clearTimeout(announceTimer.current);
    clearTimeout(resetTimer.current);
  }, []);

  const fieldLabel: Record<Field, string> = {
    name: labels.name,
    email: labels.email,
    subject: labels.subject,
    message: labels.message,
  };

  /** Mensaje de error a partir de la validación nativa del navegador (required, type="email"). */
  const messageFor = (el: FieldEl): string | undefined => {
    if (el.validity.valid) return undefined;
    switch (el.name as Field) {
      case "name":
        return labels.errorName;
      case "email":
        return el.validity.valueMissing ? labels.errorEmailMissing : labels.errorEmailFormat;
      case "subject":
        return labels.errorSubject;
      case "message":
        return labels.errorMessage;
    }
  };

  const updateField = (el: FieldEl) => {
    const name = el.name as Field;
    if (!shown.current.has(name)) return;
    setErrors((prev) => ({ ...prev, [name]: messageFor(el) }));
  };

  // El error aparece al salir de un campo que el usuario ya modificó (no al entrar ni mientras escribe).
  const onBlur = (e: FocusEvent<FieldEl>) => {
    const el = e.currentTarget;
    const name = el.name as Field;
    if (!dirty.current.has(name)) return;
    shown.current.add(name);
    const msg = messageFor(el);
    setErrors((prev) => ({ ...prev, [name]: msg }));
    // Una única región en vivo, con retardo para no pisar el anuncio del siguiente campo.
    clearTimeout(announceTimer.current);
    setAnnouncement("");
    if (msg) announceTimer.current = setTimeout(() => setAnnouncement(`${fieldLabel[name]}: ${msg}`), 500);
  };

  const onInput = (e: FormEvent<FieldEl>) => {
    const el = e.currentTarget;
    dirty.current.add(el.name as Field);
    updateField(el); // corrige el error en cuanto el valor es válido
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // evita envíos duplicados

    const form = e.currentTarget;
    const els = FIELDS.map((f) => form.elements.namedItem(f) as FieldEl);
    const next: Partial<Record<Field, string>> = {};
    els.forEach((el) => {
      shown.current.add(el.name as Field);
      next[el.name as Field] = messageFor(el);
    });
    setErrors(next);
    const firstInvalid = els.find((el) => !el.validity.valid);
    if (firstInvalid) {
      // El lector de pantalla lee el error al recibir foco (aria-describedby).
      firstInvalid.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
        dirty.current.clear();
        shown.current.clear();
        setErrors({});
        resetTimer.current = setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (name: Field) => {
    const error = errors[name];
    return {
      id: name,
      name,
      required: true,
      onBlur,
      onInput,
      // "false" explícito hasta que haya error: evita que se anuncie como inválido al entrar.
      "aria-invalid": error ? true : false,
      "aria-describedby": error ? `${name}-error` : undefined,
    } as const;
  };

  const ErrorText = ({ name }: { name: Field }) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-destructive">
        <AlertCircle className="mt-0.5 size-4 shrink-0" role="img" aria-label={labels.errorPrefix} />
        <span>{errors[name]}</span>
      </p>
    ) : null;

  const Label = ({ name }: { name: Field }) => (
    <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
      {fieldLabel[name]}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label name="name" />
          <input type="text" autoComplete="name" className={cn(controlClass, "h-11")} placeholder={labels.placeholderName} {...fieldProps("name")} />
          <ErrorText name="name" />
        </div>
        <div>
          <Label name="email" />
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            className={cn(controlClass, "h-11")}
            placeholder={labels.placeholderEmail}
            {...fieldProps("email")}
          />
          <ErrorText name="email" />
        </div>
      </div>

      <div className="mt-5">
        <Label name="subject" />
        <input type="text" autoComplete="off" className={cn(controlClass, "h-11")} placeholder={labels.placeholderSubject} {...fieldProps("subject")} />
        <ErrorText name="subject" />
      </div>

      <div className="mt-5">
        <Label name="message" />
        <textarea rows={6} className={cn(controlClass, "resize-y py-3 leading-relaxed")} placeholder={labels.placeholderMessage} {...fieldProps("message")} />
        <ErrorText name="message" />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Región de estado persistente: su contenido cambia, así que se anuncia de forma fiable */}
        <div role="status" aria-live="polite" className="min-h-6 text-sm sm:order-first">
          {status === "success" && (
            <p className="flex items-center gap-2 text-primary">
              <Check className="size-4 shrink-0" aria-hidden="true" />
              {labels.success}
            </p>
          )}
          {status === "error" && (
            <p className="flex items-start gap-2 text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {labels.error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          aria-disabled={status === "sending"}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              {labels.sending}
            </>
          ) : (
            <>
              {labels.submit}
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Anuncios de errores al salir de un campo (oculta visualmente) */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </form>
  );
}
