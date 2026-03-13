'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import WaitlistModal from './WaitlistModal'

const WaitlistContext = createContext<() => void>(() => {})

export const useWaitlist = () => useContext(WaitlistContext)

export default function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <WaitlistContext.Provider value={() => setOpen(true)}>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </WaitlistContext.Provider>
  )
}
