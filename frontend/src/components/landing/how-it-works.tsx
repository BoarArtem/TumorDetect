import { UploadCloudIcon, ScanSearchIcon, FileCheck2Icon } from "lucide-react"

const steps = [
  {
    icon: UploadCloudIcon,
    step: "01",
    title: "Upload the MRI image",
    body: "Drag in a brain MRI image (JPG or PNG). It's processed privately and analyzed in seconds — no setup required.",
  },
  {
    icon: ScanSearchIcon,
    step: "02",
    title: "AI segments the tumor",
    body: "A deep segmentation model outlines the suspicious region directly on the image and classifies the tumor type.",
  },
  {
    icon: FileCheck2Icon,
    step: "03",
    title: "Read the prediction",
    body: "See the segmentation overlay, the tumor prediction and a confidence score — then download or share the result.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Workflow"
          title="From scan to surgical plan in three steps"
          subtitle="Tumor Detect fits into the reading room you already use — no new hardware, no exports to juggle."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <s.icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground/70">{s.step}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>

              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute top-11 -right-3 hidden h-px w-6 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-pretty text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
