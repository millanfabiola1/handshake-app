import { Metadata } from 'next'
import Site2Content from './Site2Content'

export const metadata: Metadata = {
  title: "tappd — Tap. Text. Get Paid.",
  description: "No apps. No links. Just text the people you work with and get paid instantly. Zero fees.",
}

export default function Site2Page() {
  return (
    <>
      <link rel="preload" as="image" href="/site2/hero-bg.jpg" />
      <Site2Content />
    </>
  )
}
