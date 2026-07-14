import { cn } from "@/lib/utils"

export type Tone = "success" | "danger" | "warning" | "info" | "muted" | "primary"

const toneStyles: Record<Tone, { wrap: string; dot: string }> = {
  success: { wrap: "bg-success/10 text-success ring-success/20", dot: "bg-success" },
  danger: {
    wrap: "bg-destructive/10 text-destructive ring-destructive/20",
    dot: "bg-destructive",
  },
  warning: {
    wrap: "bg-warning/15 text-amber-700 ring-warning/25 dark:text-amber-400",
    dot: "bg-warning",
  },
  info: { wrap: "bg-info/10 text-info ring-info/20", dot: "bg-info" },
  muted: {
    wrap: "bg-muted text-muted-foreground ring-border",
    dot: "bg-muted-foreground",
  },
  primary: { wrap: "bg-primary/10 text-primary ring-primary/20", dot: "bg-primary" },
}

export function ToneBadge({
  tone,
  children,
  dot = true,
  pulse = false,
  className,
}: {
  tone: Tone
  children: React.ReactNode
  dot?: boolean
  pulse?: boolean
  className?: string
}) {
  const s = toneStyles[tone]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        s.wrap,
        className
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                s.dot
              )}
            />
          )}
          <span className={cn("relative inline-flex size-1.5 rounded-full", s.dot)} />
        </span>
      )}
      {children}
    </span>
  )
}
