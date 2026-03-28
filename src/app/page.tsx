import Image from 'next/image'

export const metadata = {
  title: 'Handshake — Join the Waitlist',
  description: 'Be the first to experience the messaging platform that turns every conversation into a transaction.',
}

export default function Waitlist() {
  return (
    <div className="min-h-screen bg-[#A5F41F] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 w-full max-w-xl">
        <Image
          src="/handshake-logo.svg"
          alt="Handshake"
          width={260}
          height={38}
          priority
        />

        <div className="w-full rounded-2xl overflow-hidden bg-white shadow-lg" style={{ height: 500 }}>
          <iframe
            src="https://YOUR_TYPEFORM_ID.typeform.com/to/FORM_ID"
            width="100%"
            height="100%"
            frameBorder={0}
            allow="camera; microphone; autoplay; encrypted-media;"
            style={{ border: 0 }}
            title="Join the waitlist"
          />
        </div>
      </div>
    </div>
  )
}
