import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 glow-primary opacity-80" />

          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Read your next tumor study with a second set of eyes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Set up a workspace in minutes and run your first segmentation today.
            No hardware, no commitment.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}>
              Get started free
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-6")}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
