import { Metadata } from 'next'
import Site2Content from './Site2Content'

export const metadata: Metadata = {
  title: "Tapp'd — Tap. Text. Get Paid.",
  description: "No apps. No links. Just text your clients and get paid instantly. Zero fees.",
}

export default function Site2Page() {
  return <Site2Content />
}
