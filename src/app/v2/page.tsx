import MarqueeBanner from '@/components/MarqueeBanner'
import Nav from '@/components/Nav'
import V2Hero from '@/components/v2/V2Hero'
import StatsTrustBar from '@/components/v2/StatsTrustBar'
import FeaturesBentoGrid from '@/components/v2/FeaturesBentoGrid'
import HowItWorksHScroll from '@/components/v2/HowItWorksHScroll'
import V2UseCases from '@/components/v2/V2UseCases'
import TestimonialsCarousel from '@/components/v2/TestimonialsCarousel'
import ZeroFeeComparison from '@/components/v2/ZeroFeeComparison'
import V2CTA from '@/components/v2/V2CTA'
import Footer from '@/components/Footer'
import WaitlistProvider from '@/components/WaitlistContext'

export const metadata = {
  title: "Tapp'd — Tap. Text. Get Paid.",
  description: "Messages and payments in one app. 0% fees. Keep everything you earn.",
}

export default function V2Page() {
  return (
    <WaitlistProvider>
      <MarqueeBanner />
      <Nav />
      <main>
        <V2Hero />
        <StatsTrustBar />
        <FeaturesBentoGrid />
        <HowItWorksHScroll />
        <V2UseCases />
        <TestimonialsCarousel />
        <ZeroFeeComparison />
        <V2CTA />
      </main>
      <Footer />
    </WaitlistProvider>
  )
}
