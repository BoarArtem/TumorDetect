import { MarketingHeader } from "@/components/site/marketing-header"
import { MarketingFooter } from "@/components/site/marketing-footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Features } from "@/components/landing/features"
import { Security } from "@/components/landing/security"
import { Faq } from "@/components/landing/faq"
import { Cta } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Security />
        <Faq />
        <Cta />
      </main>
      <MarketingFooter />
    </div>
  )
}
