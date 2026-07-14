import { PlusIcon } from "lucide-react"

import { SectionHeading } from "@/components/landing/how-it-works"

const faqs = [
  {
    q: "Is Tumor Detect a diagnostic device?",
    a: "No. Tumor Detect is a decision-support tool. It highlights and measures suspected tumors to speed up review, but every result must be confirmed by a qualified clinician. It does not replace radiological or surgical judgment.",
  },
  {
    q: "Which images are supported?",
    a: "Brain MRI images as JPG or PNG — for example an axial slice exported from a viewer. You upload the image and the model highlights any tumor directly on it.",
  },
  {
    q: "How accurate is the segmentation?",
    a: "On our internal validation set the model reaches a Dice-equivalent overlap of ~0.97 against expert annotations. Each prediction also returns a confidence score so low-certainty cases are flagged for a second read.",
  },
  {
    q: "What happens to the images I upload?",
    a: "Images are processed privately to produce the prediction and are not shared or used to identify patients. The clinician always makes the final call.",
  },
  {
    q: "How long does an analysis take?",
    a: "A few seconds per image — upload a brain MRI and the segmentation and prediction come back almost immediately.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border/70 bg-muted/25">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading center eyebrow="FAQ" title="Questions, answered" />

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 [&_summary]:list-none">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-sm font-medium">
                {item.q}
                <PlusIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
