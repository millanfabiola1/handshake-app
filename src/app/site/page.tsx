import MarqueeBanner from '@/components/MarqueeBanner'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import PhonePersist from '@/components/PhonePersist'
import StickyFeatures from '@/components/StickyFeatures'
import ProductShowcase from '@/components/ProductShowcase'
import UseCases from '@/components/UseCases'
import Pricing from '@/components/Pricing'
import QuoteSection from '@/components/QuoteSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import WaitlistProvider from '@/components/WaitlistContext'

export default function Home() {
  return (
    <WaitlistProvider>
      <MarqueeBanner />
      <Nav />
      <PhonePersist />
      <main>
        <Hero />
        <StickyFeatures />
        <UseCases />
        <Pricing />
        <ProductShowcase />
        <QuoteSection />
        <CTASection />
      </main>
      <Footer />
    </WaitlistProvider>
  )
}
