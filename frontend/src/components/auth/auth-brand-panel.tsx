import Link from "next/link"
import { QuoteIcon } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ScanVisual } from "@/components/scan-visual"

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
      {/* background */}
      <div className="absolute inset-0 -z-20 bg-[oklch(0.16_0.02_240)]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-16 -bottom-32 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />

      <Link href="/" className="inline-flex w-fit items-center">
        <Logo />
      </Link>

      <div className="max-w-md">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Read the scan. Trust the plan.
        </h2>
        <p className="mt-3 text-sm text-white/70">
          Tumor Detect gives your team a fast, consistent second read on every
          brain MRI — with the tumor located, measured and scored before you
          scroll the first slice.
        </p>

        <div className="mt-8 max-w-xs">
          <ScanVisual scanline className="ring-1 ring-white/10" />
        </div>
      </div>

      <figure className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
        <QuoteIcon className="size-5 text-primary" />
        <blockquote className="mt-3 text-sm text-white/85">
          “It surfaces the lesion the moment I open the study. On busy days that
          head start genuinely changes how quickly we can plan surgery.”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            EN
          </span>
          <div className="text-xs">
            <p className="font-medium text-white">Dr. Elena Novak</p>
            <p className="text-white/60">Consultant Neurosurgeon</p>
          </div>
        </figcaption>
      </figure>
    </aside>
  )
}
