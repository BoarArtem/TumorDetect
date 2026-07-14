import { cn } from "@/lib/utils"

/**
 * Stylised axial brain-MRI slice with an AI segmentation overlay.
 * Purely decorative / illustrative — used on the landing hero, auth panel
 * and as a placeholder in the dashboard viewer.
 */
export function ScanVisual({
  className,
  overlay = true,
  scanline = false,
  reticle = true,
}: {
  className?: string
  overlay?: boolean
  scanline?: boolean
  reticle?: boolean
}) {
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-2xl", className)}>
      <svg viewBox="0 0 400 400" className="size-full" role="img" aria-label="Brain MRI slice">
        <defs>
          <radialGradient id="sv-bg" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="oklch(0.28 0.03 235)" />
            <stop offset="100%" stopColor="oklch(0.13 0.02 240)" />
          </radialGradient>
          <radialGradient id="sv-brain" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="oklch(0.72 0.01 240)" />
            <stop offset="55%" stopColor="oklch(0.55 0.01 240)" />
            <stop offset="100%" stopColor="oklch(0.34 0.015 240)" />
          </radialGradient>
          <radialGradient id="sv-tumor" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="oklch(0.75 0.16 45 / 0.95)" />
            <stop offset="100%" stopColor="oklch(0.6 0.2 30 / 0.55)" />
          </radialGradient>
          <filter id="sv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="400" fill="url(#sv-bg)" />

        {/* skull */}
        <ellipse cx="200" cy="200" rx="150" ry="172" fill="none" stroke="oklch(0.5 0.02 240)" strokeWidth="6" opacity="0.5" />
        <ellipse cx="200" cy="200" rx="140" ry="162" fill="none" stroke="oklch(0.7 0.02 240)" strokeWidth="2" opacity="0.35" />

        {/* brain matter */}
        <ellipse cx="200" cy="203" rx="128" ry="150" fill="url(#sv-brain)" />

        {/* midline + sulci */}
        <g stroke="oklch(0.24 0.02 240)" strokeWidth="2.4" fill="none" opacity="0.7" strokeLinecap="round">
          <path d="M200 58 V348" />
          <path d="M200 120 C150 130 138 168 168 188 C142 208 150 250 196 262" />
          <path d="M200 120 C250 130 262 168 232 188 C258 208 250 250 204 262" />
          <path d="M120 150 C150 168 152 196 128 210" />
          <path d="M280 150 C250 168 248 196 272 210" />
          <path d="M150 300 C176 288 224 288 250 300" />
        </g>

        {/* ventricles */}
        <g fill="oklch(0.2 0.02 240)" opacity="0.85">
          <path d="M188 196 C182 186 182 216 190 224 C196 216 196 202 188 196Z" />
          <path d="M212 196 C218 186 218 216 210 224 C204 216 204 202 212 196Z" />
        </g>

        {overlay && (
          <g filter="url(#sv-glow)">
            {/* lesion body */}
            <path
              d="M246 150 C270 146 288 164 286 186 C298 200 288 224 268 228 C256 244 228 240 222 222 C206 214 210 188 226 182 C228 164 236 152 246 150Z"
              fill="url(#sv-tumor)"
            />
            {/* segmentation contour */}
            <path
              d="M246 150 C270 146 288 164 286 186 C298 200 288 224 268 228 C256 244 228 240 222 222 C206 214 210 188 226 182 C228 164 236 152 246 150Z"
              fill="none"
              stroke="oklch(0.85 0.18 90)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          </g>
        )}

        {overlay && reticle && (
          <g stroke="var(--primary)" strokeWidth="1.75" fill="none" opacity="0.9">
            <path d="M214 138 h-16 v16 M300 138 h16 v16 M300 246 h16 v-16 M214 246 h-16 v-16" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {scanline && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-scanline absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-primary/25 to-transparent" />
        </div>
      )}
    </div>
  )
}
