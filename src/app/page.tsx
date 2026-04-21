import WaitlistForm from '@/components/WaitlistForm'
import Image from 'next/image'

export const metadata = {
  title: 'tappd — Join the Waitlist',
  description: 'Get tappd. Messages and payments in one app. 0% fees. Keep everything you earn.',
}

export default function Waitlist() {
  return (
    <div className="min-h-screen bg-[#A5F41F] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <Image
          src="/tappd-logo.svg"
          alt="tappd"
          width={260}
          height={38}
          priority
        />
        <h1 className="text-[28px] md:text-[36px] font-light text-black tracking-[-0.03em] leading-[1.1] text-center">
          Get tappd. Keep 100%.
        </h1>
        <WaitlistForm />
      </div>
    </div>
  )
}
