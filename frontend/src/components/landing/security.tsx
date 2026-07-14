import { CheckIcon, ShieldCheckIcon } from "lucide-react"

import { SectionHeading } from "@/components/landing/how-it-works"
import { ScanVisual } from "@/components/scan-visual"

const points = [
  "Uploaded images are processed privately, never shared",
  "Encrypted in transit (TLS 1.3) and at rest (AES-256)",
  "No patient identifiers required to run a prediction",
  "Delete an image and its result at any time",
  "Model outputs are decision support — the clinician stays in control",
]

export function Security() {
  return (
    <section id="security" className="scroll-mt-20 border-t border-border/70">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Trust & safety"
            title="Built for the standards clinical data demands"
            subtitle="Patient privacy and clinician oversight are designed in, not added on."
          />
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success ring-1 ring-inset ring-success/25">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 glow-primary opacity-60" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <ShieldCheckIcon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Private by design</p>
                <p className="text-xs text-muted-foreground">
                  Private processing · Encryption · You&apos;re in control
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-[1fr_1.1fr] gap-4">
              <ScanVisual overlay={false} reticle={false} className="border border-border/60" />
              <div className="flex flex-col justify-center gap-3 text-sm">
                <Metric label="Encryption" value="AES-256" />
                <Metric label="Data sharing" value="None" />
                <Metric label="Identifiers" value="Not required" />
                <Metric label="Retention" value="You control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
