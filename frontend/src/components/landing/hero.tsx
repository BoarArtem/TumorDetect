import Link from "next/link"
import { ArrowRightIcon, PlayIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ScanVisual } from "@/components/scan-visual"
import { ToneBadge } from "@/components/status-badge"

const stats = [
  { value: "~5s", label: "Per-image analysis" },
  { value: "97.2%", label: "Segmentation accuracy" },
  { value: "3", label: "Tumor classes" },
  { value: "JPG·PNG", label: "Just upload an image" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-96 glow-primary opacity-70" />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-16 pb-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
        {/* copy */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <SparklesIcon className="size-3.5 text-primary" />
            AI-assisted neuro-imaging
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find and map <span className="text-gradient">brain tumors</span> in
            seconds.
          </h1>

          <p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Tumor Detect segments tumors on brain MRI with clinical-grade AI —
            giving neurosurgeons and radiologists the location, volume and
            confidence they need, right when they open the study.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-sm")}>
              Get started free
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5 text-sm")}
            >
              <PlayIcon className="size-4" />
              View live demo
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · HIPAA-conscious workflow · Cancel anytime
          </p>
        </div>

        {/* product preview */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 glow-primary opacity-80" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
            {/* window bar */}
            <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/60" />
                <span className="size-2.5 rounded-full bg-warning/70" />
                <span className="size-2.5 rounded-full bg-success/70" />
              </div>
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                brain_mri.png
              </span>
              <ToneBadge tone="info" pulse className="ml-auto">
                Analyzing
              </ToneBadge>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-[1.3fr_1fr]">
              <ScanVisual scanline className="border border-border/60" />

              <div className="flex flex-col gap-3">
                <ResultRow label="Prediction" value="Tumor detected" tone="danger" />
                <ResultRow label="Type" value="Glioblastoma (HGG)" />
                <ResultRow label="Segmented area" value="6.2% of image" />
                <div className="mt-1 rounded-lg border border-border/70 bg-muted/30 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-mono font-medium text-foreground">97.2%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: "97.2%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stat strip */}
      <div className="mx-auto mt-6 w-full max-w-6xl px-4 pb-12 sm:px-6 lg:mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-5 text-center sm:text-left">
              <dt className="order-2 text-xs text-muted-foreground">{s.label}</dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function ResultRow({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: "danger"
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 text-sm last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      {tone === "danger" ? (
        <ToneBadge tone="danger">{value}</ToneBadge>
      ) : (
        <span className="text-right font-medium text-foreground">{value}</span>
      )}
    </div>
  )
}
