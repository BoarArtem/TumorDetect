import { SegmentationTool } from "@/components/dashboard/segmentation-tool"

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Tumor segmentation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a brain MRI and the model finds and outlines the tumor.
        </p>
      </div>
      <SegmentationTool />
    </div>
  )
}
