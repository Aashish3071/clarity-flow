import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your company name."),
  email: z.string().trim().email("Enter a valid business email."),
  phone: z.string().trim().min(6, "Enter a valid phone number.").regex(/^[+()\d\s\-]+$/, "Digits, spaces and + ( ) - only."),
  country: z.string().min(1, "Select a country."),
  size: z.string().min(1, "Select a business size."),
  challenge: z.string().min(1, "Select an option."),
  contact_pref: z.string().min(1, "Select a preference."),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "", company: "", email: "", phone: "",
      country: "", size: "", challenge: "", contact_pref: "", message: "",
    },
  });

  const onSubmit = (v: FormValues) => {
    setFirstName(v.name.split(" ")[0]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-ink">Thank you, {firstName}.</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Your request has been received. Please pick a time below and a specialist will confirm the meeting shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-7">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-ink">Tell us about your business</h3>
        <p className="mt-1 text-sm text-ink-soft">A short form so the call is useful from minute one.</p>
      </div>

      <div className="grid gap-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Full name" error={errors.name?.message} touched={!!touchedFields.name}>
            <input {...register("name")} autoComplete="name" className={inp(!!errors.name)} />
          </Field>
          <Field label="Company name" error={errors.company?.message} touched={!!touchedFields.company}>
            <input {...register("company")} autoComplete="organization" className={inp(!!errors.company)} />
          </Field>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Business email" error={errors.email?.message} touched={!!touchedFields.email}>
            <input {...register("email")} type="email" autoComplete="email" className={inp(!!errors.email)} />
          </Field>
          <Field label="Phone number" error={errors.phone?.message} touched={!!touchedFields.phone}>
            <input {...register("phone")} type="tel" autoComplete="tel" className={inp(!!errors.phone)} />
          </Field>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Country" error={errors.country?.message}>
            <select {...register("country")} defaultValue="" className={inp(!!errors.country)}>
              <option value="" disabled>Select</option>
              {["United Arab Emirates","Saudi Arabia","United States","United Kingdom","Canada","India","Australia","Singapore","Other"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Business size" error={errors.size?.message}>
            <select {...register("size")} defaultValue="" className={inp(!!errors.size)}>
              <option value="" disabled>Select</option>
              {["1–10 employees","11–50 employees","51–200 employees","201–500 employees","500+ employees"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Current business challenge" error={errors.challenge?.message}>
            <select {...register("challenge")} defaultValue="" className={inp(!!errors.challenge)}>
              <option value="" disabled>Select</option>
              {["Sales & customer management","Inventory & purchasing","Finance & invoicing","Operations & projects","Online store & orders","Reporting & visibility","Something else"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Preferred contact method" error={errors.contact_pref?.message}>
            <select {...register("contact_pref")} defaultValue="" className={inp(!!errors.contact_pref)}>
              <option value="" disabled>Select</option>
              {["Email","Phone","WhatsApp","Video call"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Message (optional)" error={errors.message?.message} touched={!!touchedFields.message}>
          <textarea
            {...register("message")}
            rows={3}
            className={inp(!!errors.message)}
            placeholder="A sentence or two about what you'd like to improve."
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-md bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        Continue to scheduling
      </button>
      <p className="mt-3 text-center text-[11px] text-ink-soft">Your details stay private and are only used to prepare the call.</p>
    </form>
  );
}

function inp(invalid: boolean) {
  return [
    "mt-1.5 w-full rounded-md border bg-background px-3 py-2.5 text-sm text-ink outline-none transition focus:ring-2 focus:ring-[color:var(--brand)]/20",
    invalid ? "border-destructive focus:border-destructive" : "border-border focus:border-[color:var(--brand)]",
  ].join(" ");
}

function Field({ label, error, touched, children }: { label: string; error?: string; touched?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink">{label}</span>
      {children}
      {error && touched !== false && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
