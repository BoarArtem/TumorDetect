"use client"

import * as React from "react"
import {
  UploadCloudIcon,
  SparklesIcon,
  ScanSearchIcon,
  Loader2Icon,
  RotateCcwIcon,
  DownloadIcon,
  ShieldCheckIcon,
  ImageIcon,
  InfoIcon,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { pct } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScanVisual } from "@/components/scan-visual"
import { ToneBadge } from "@/components/status-badge"

type Source = "none" | "upload" | "sample"
type Phase = "idle" | "preview" | "analyzing" | "done"

interface Prediction {
  finding: "tumor" | "clear"
  type?: string
  confidence: number
  areaPct: number
}

const tumorTypes = [
  "Glioblastoma (high-grade glioma)",
  "Low-grade glioma",
  "Meningioma",
]

export function SegmentationTool() {
  const [source, setSource] = React.useState<Source>("none")
  const [imageUrl, setImageUrl] = React.useState<string | null>(null)
  const [fileName, setFileName] = React.useState<string>("")
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [result, setResult] = React.useState<Prediction | null>(null)
  const [showOverlay, setShowOverlay] = React.useState(true)
  const [opacity, setOpacity] = React.useState(70)
  const [dragging, setDragging] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const urlRef = React.useRef<string | null>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  function loadFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG).")
      return
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const url = URL.createObjectURL(file)
    urlRef.current = url
    setImageUrl(url)
    setFileName(file.name)
    setSource("upload")
    setResult(null)
    setPhase("preview")
  }

  function useSample() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setImageUrl(null)
    setFileName("sample_brain_mri.png")
    setSource("sample")
    setResult(null)
    setPhase("preview")
  }

  function analyze() {
    setPhase("analyzing")
    timer.current = setTimeout(() => {
      const isTumor = source === "sample" ? true : Math.random() > 0.28
      setResult({
        finding: isTumor ? "tumor" : "clear",
        type: isTumor ? tumorTypes[Math.floor(Math.random() * tumorTypes.length)] : undefined,
        confidence: 0.9 + Math.random() * 0.09,
        areaPct: isTumor ? 3 + Math.random() * 6 : 0,
      })
      setShowOverlay(true)
      setOpacity(70)
      setPhase("done")
      toast.success(isTumor ? "Tumor detected" : "No tumor detected", {
        description: "Segmentation complete.",
      })
    }, 1700)
  }

  function reset() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    if (timer.current) clearTimeout(timer.current)
    urlRef.current = null
    setImageUrl(null)
    setFileName("")
    setSource("none")
    setResult(null)
    setPhase("idle")
  }

  const analyzing = phase === "analyzing"
  const done = phase === "done"
  const overlayVisible = done && result?.finding === "tumor" && showOverlay

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      {/* ---------- Image stage ---------- */}
      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <ImageIcon className="size-4 text-primary" />
          <span className="truncate font-mono text-xs text-muted-foreground">
            {fileName || "No image loaded"}
          </span>
          {(phase === "preview" || done) && (
            <Button
              variant="ghost"
              size="xs"
              className="ml-auto"
              onClick={reset}
            >
              <RotateCcwIcon className="size-3.5" />
              Reset
            </Button>
          )}
        </div>

        <div className="relative aspect-square bg-[oklch(0.14_0.02_240)] sm:aspect-[4/3]">
          {source === "none" ? (
            <Dropzone
              dragging={dragging}
              onBrowse={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                loadFile(e.dataTransfer.files?.[0])
              }}
              onSample={useSample}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative h-full w-full max-w-md">
                {source === "sample" ? (
                  <ScanVisual
                    overlay={overlayVisible}
                    reticle={overlayVisible}
                    scanline={analyzing}
                    className="mx-auto h-full"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl ?? ""}
                    alt="Uploaded brain MRI"
                    className="mx-auto h-full w-full rounded-2xl object-contain"
                  />
                )}

                {source === "upload" && (
                  <MaskOverlay opacity={overlayVisible ? opacity / 100 : 0} confidence={result?.confidence ?? 0} />
                )}

                {source === "upload" && analyzing && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="animate-scanline absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-primary/30 to-transparent" />
                  </div>
                )}

                {analyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/45 text-white backdrop-blur-[1px]">
                    <Loader2Icon className="size-6 animate-spin" />
                    <p className="text-sm font-medium">Segmenting…</p>
                    <p className="text-xs text-white/70">Running SegNet v2.4</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* overlay controls (only after a tumor result) */}
        {overlayVisible !== undefined && done && result?.finding === "tumor" && (
          <div className="flex flex-col gap-3 border-t border-border px-4 py-3">
            <label className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Show segmentation overlay</span>
              <Switch checked={showOverlay} onCheckedChange={setShowOverlay} size="sm" />
            </label>
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-xs text-muted-foreground">Opacity</span>
              <Slider
                value={[opacity]}
                min={20}
                max={100}
                disabled={!showOverlay}
                onValueChange={(v) => setOpacity(Array.isArray(v) ? v[0] : v)}
                className="flex-1"
              />
              <span className="w-9 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {opacity}%
              </span>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            loadFile(e.target.files?.[0])
            e.target.value = ""
          }}
        />
      </div>

      {/* ---------- Side panel ---------- */}
      <div className="flex flex-col gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
        {phase === "idle" && <IdlePanel onSample={useSample} onBrowse={() => inputRef.current?.click()} />}
        {phase === "preview" && <PreviewPanel fileName={fileName} onAnalyze={analyze} onReset={reset} />}
        {analyzing && <AnalyzingPanel />}
        {done && result && <ResultPanel result={result} onReset={reset} />}
      </div>
    </div>
  )
}

/* ---------------- Sub-views ---------------- */

function Dropzone({
  dragging,
  onBrowse,
  onSample,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  dragging: boolean
  onBrowse: () => void
  onSample: () => void
  onDragOver: React.DragEventHandler
  onDragLeave: React.DragEventHandler
  onDrop: React.DragEventHandler
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onBrowse}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onBrowse()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "absolute inset-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-center outline-none transition-colors",
        dragging ? "border-primary bg-primary/10" : "border-white/15 hover:border-primary/60 hover:bg-white/[0.03]"
      )}
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <UploadCloudIcon className="size-7" />
      </span>
      <div>
        <p className="text-sm font-medium text-white">
          Drop a brain MRI here, or <span className="text-primary">browse</span>
        </p>
        <p className="mt-1 text-xs text-white/50">JPG or PNG · up to 20 MB</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        onClick={(e) => {
          e.stopPropagation()
          onSample()
        }}
      >
        <SparklesIcon className="size-4" />
        Try a sample MRI
      </Button>
    </div>
  )
}

function IdlePanel({ onSample, onBrowse }: { onSample: () => void; onBrowse: () => void }) {
  const steps = [
    { icon: UploadCloudIcon, text: "Upload a brain MRI image" },
    { icon: ScanSearchIcon, text: "The model segments the tumor" },
    { icon: ShieldCheckIcon, text: "You get the prediction & overlay" },
  ]
  return (
    <>
      <div>
        <h2 className="text-base font-semibold">Analyze an MRI</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a brain MRI and get an AI segmentation with a tumor prediction
          in seconds.
        </p>
      </div>
      <ol className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="size-4" />
            </span>
            {s.text}
          </li>
        ))}
      </ol>
      <div className="mt-1 flex flex-col gap-2">
        <Button className="h-10" onClick={onBrowse}>
          <UploadCloudIcon className="size-4" />
          Upload image
        </Button>
        <Button variant="outline" className="h-10" onClick={onSample}>
          <SparklesIcon className="size-4" />
          Try a sample MRI
        </Button>
      </div>
      <Disclaimer />
    </>
  )
}

function PreviewPanel({
  fileName,
  onAnalyze,
  onReset,
}: {
  fileName: string
  onAnalyze: () => void
  onReset: () => void
}) {
  return (
    <>
      <div>
        <h2 className="text-base font-semibold">Ready to analyze</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Image loaded. Run the model to segment and classify the study.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm">
        <ImageIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate font-mono text-xs">{fileName}</span>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        <Button className="h-10" onClick={onAnalyze}>
          <ScanSearchIcon className="size-4" />
          Run segmentation
        </Button>
        <Button variant="ghost" className="h-10" onClick={onReset}>
          Choose another image
        </Button>
      </div>
      <Disclaimer />
    </>
  )
}

function AnalyzingPanel() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <Loader2Icon className="size-7 animate-spin text-primary" />
      <p className="text-sm font-medium">Segmenting the MRI…</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        The model is analyzing the image and outlining any suspicious region.
      </p>
    </div>
  )
}

function ResultPanel({ result, onReset }: { result: Prediction; onReset: () => void }) {
  const isTumor = result.finding === "tumor"
  return (
    <>
      <div>
        <p className="text-xs text-muted-foreground">Prediction</p>
        <div className="mt-1.5">
          <ToneBadge tone={isTumor ? "danger" : "success"} className="text-sm">
            {isTumor ? "Tumor detected" : "No tumor detected"}
          </ToneBadge>
        </div>
      </div>

      {isTumor && (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Likely type</span>
          <span className="font-medium">{result.type}</span>
        </div>
      )}

      <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Model confidence</span>
          <span className="font-mono font-medium">{pct(result.confidence)}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: pct(result.confidence) }} />
        </div>
      </div>

      {isTumor && (
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 px-3 py-2.5 text-sm">
          <span className="text-xs text-muted-foreground">Segmented area</span>
          <span className="font-mono font-medium">{result.areaPct.toFixed(1)}% of image</span>
        </div>
      )}

      <div className="mt-1 flex flex-col gap-2">
        <Button className="h-10" onClick={() => toast.success("Result downloaded", { description: "segmentation.png" })}>
          <DownloadIcon className="size-4" />
          Download result
        </Button>
        <Button variant="outline" className="h-10" onClick={onReset}>
          <RotateCcwIcon className="size-4" />
          Analyze another
        </Button>
      </div>

      <Disclaimer />
    </>
  )
}

function Disclaimer() {
  return (
    <p className="flex items-start gap-1.5 text-[0.7rem] leading-relaxed text-muted-foreground">
      <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
      AI-assisted result for decision support only — always confirm with a
      qualified clinician.
    </p>
  )
}

/** Mock segmentation mask drawn over an uploaded image. */
function MaskOverlay({ opacity, confidence }: { opacity: number; confidence: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      style={{ opacity }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="size-full">
        <defs>
          <radialGradient id="mask-blob" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="oklch(0.72 0.19 30 / 0.85)" />
            <stop offset="100%" stopColor="oklch(0.6 0.22 25 / 0.35)" />
          </radialGradient>
        </defs>
        <path
          d="M56 40 C64 38 71 45 70 53 C74 60 69 68 61 68 C56 74 46 72 45 64 C38 60 40 50 47 48 C48 42 52 41 56 40Z"
          fill="url(#mask-blob)"
        />
        <path
          d="M56 40 C64 38 71 45 70 53 C74 60 69 68 61 68 C56 74 46 72 45 64 C38 60 40 50 47 48 C48 42 52 41 56 40Z"
          fill="none"
          stroke="oklch(0.85 0.18 90)"
          strokeWidth="0.9"
          strokeDasharray="2 1.6"
        />
        <rect x="41" y="35" width="34" height="40" rx="2" fill="none" stroke="var(--primary)" strokeWidth="0.7" strokeOpacity="0.9" />
      </svg>
      <span className="absolute left-[41%] top-[30%] rounded bg-destructive px-1.5 py-0.5 text-[0.65rem] font-semibold text-white shadow-lg">
        Tumor {(confidence * 100).toFixed(0)}%
      </span>
    </div>
  )
}
