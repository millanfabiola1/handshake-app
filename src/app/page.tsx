import MarqueeBanner from '@/components/MarqueeBanner'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import LogoStrip from '@/components/LogoStrip'
import StickyFeatures from '@/components/StickyFeatures'
import ProductShowcase from '@/components/ProductShowcase'
import UseCases from '@/components/UseCases'
import Pricing from '@/components/Pricing'
import PaymentMethods from '@/components/PaymentMethods'
import QuoteSection from '@/components/QuoteSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import WaitlistProvider from '@/components/WaitlistContext'

export default function Home() {
  return (
    <WaitlistProvider>
      <MarqueeBanner />
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <StickyFeatures />
        <ProductShowcase />
        <UseCases />
        <Pricing />
        <PaymentMethods />
        <QuoteSection />
        <CTASection />
      </main>
      <Footer />
    </WaitlistProvider>
  )
}
