import WaitlistForm from '@/components/WaitlistForm'
import Image from 'next/image'

export const metadata = {
  title: 'Handshake — Join the Waitlist',
  description: 'Be the first to experience the messaging platform that turns every conversation into a transaction.',
}

export default function Waitlist() {
  return (
    <div className="min-h-screen bg-[#A5F41F] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <Image
          src="/handshake-logo.svg"
          alt="Handshake"
          width={260}
          height={38}
          priority
        />
        <h1 className="text-[28px] md:text-[36px] font-light text-black tracking-[-0.03em] leading-[1.1] text-center">
          Join the waitlist for early access
        </h1>
        <WaitlistForm />
      </div>
    </div>
  )
}
