import { cn } from "@/lib/utils"

/**
 * Tumor Detect brand mark: a scan reticle with an activity pulse,
 * on a teal clinical badge. Sizing is controlled via `className`
 * (defaults to size-9).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Tumor Detect logo"
      className={cn("size-9", className)}
    >
      <defs>
        <linearGradient id="td-mark-grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(0.78 0.12 190)" />
          <stop offset="1" stopColor="oklch(0.55 0.12 215)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#td-mark-grad)" />
      {/* scan reticle */}
      <circle cx="20" cy="20" r="10.5" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" />
      {/* crosshair ticks */}
      <path
        d="M20 5.5 V9.5 M20 30.5 V34.5 M5.5 20 H9.5 M30.5 20 H34.5"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* activity pulse */}
      <path
        d="M11 21.5 h3.2 l2.1 -6 l3 9.4 l2.1 -4.6 h4.6"
        fill="none"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* detected node */}
      <circle cx="27.4" cy="14" r="2.3" fill="white" />
    </svg>
  )
}

export function Logo({
  className,
  markClassName,
  showWord = true,
}: {
  className?: string
  markClassName?: string
  showWord?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      {showWord && (
        <span className="text-[0.98rem] font-semibold tracking-tight">
          Tumor<span className="text-primary">Detect</span>
        </span>
      )}
    </span>
  )
}
