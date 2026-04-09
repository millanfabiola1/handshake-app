import MarqueeBanner from '@/components/MarqueeBanner'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StickyFeatures from '@/components/StickyFeatures'
import BentoGrid from '@/components/BentoGrid'
import FloatingUI from '@/components/FloatingUI'
import UseCases from '@/components/UseCases'
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
        <StickyFeatures />
        <UseCases />
        <FloatingUI />
        <BentoGrid />
        <CTASection />
      </main>
      <Footer />
    </WaitlistProvider>
  )
}
