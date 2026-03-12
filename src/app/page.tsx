import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import MessagingFeature from '@/components/MessagingFeature'
import BentoGrid from '@/components/BentoGrid'
import GreenSection from '@/components/GreenSection'
import SplitPanel from '@/components/SplitPanel'
import WhoSection from '@/components/WhoSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <MessagingFeature />
        <BentoGrid />
        <GreenSection />
        <SplitPanel />
        <WhoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
