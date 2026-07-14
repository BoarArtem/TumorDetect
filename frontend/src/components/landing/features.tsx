import {
  ScanSearchIcon,
  BrainIcon,
  GaugeIcon,
  ImageIcon,
  DownloadIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/landing/how-it-works"

const features = [
  {
    icon: ScanSearchIcon,
    title: "Tumor segmentation",
    body: "The suspicious region is outlined directly on your MRI image, so you can see exactly where the model is looking.",
  },
  {
    icon: BrainIcon,
    title: "Tumor prediction",
    body: "Get a clear verdict — tumor or clear — and the likely tumor type for detected lesions.",
  },
  {
    icon: GaugeIcon,
    title: "Calibrated confidence",
    body: "Every prediction ships with a confidence score, so ambiguous cases are flagged for a second read.",
  },
  {
    icon: ImageIcon,
    title: "Just upload an image",
    body: "Works with ordinary JPG or PNG MRI images. No PACS, no DICOM tooling, no setup to get started.",
  },
  {
    icon: DownloadIcon,
    title: "Downloadable result",
    body: "Save the segmented image and prediction with a single click to share with your team.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private & secure",
    body: "Images are processed privately and never shared. The clinician always stays in control of the decision.",
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border/70 bg-muted/25">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything you need to read a tumor study"
          subtitle="Purpose-built for neuro-oncology imaging — not a generic viewer with AI bolted on."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
