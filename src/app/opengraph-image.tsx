import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Tapp'd — Tap. Text. Get Paid."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#A5F41F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Tappd icon */}
          <svg width="82" height="112" viewBox="0 0 91 134" fill="none">
            <path d="M90.0219 109.708V36.9541C90.0219 33.3164 86.2629 30.867 82.9405 32.3463L41.5921 50.6803C39.7733 51.4806 38.585 53.2994 38.585 55.288V128.042C38.585 131.679 42.3439 134.129 45.6663 132.65L87.0147 114.316C88.8336 113.515 90.0219 111.696 90.0219 109.708Z" fill="black"/>
            <path d="M30.6546 50.1242V96.9292C30.6546 98.9178 29.4905 100.737 27.6474 101.537L7.08234 110.655C3.75992 112.135 0.000976562 109.685 0.000976562 106.048V33.2939C0.000976562 31.3053 1.16504 29.4864 3.00813 28.6861L44.3565 10.3522C47.6789 8.87288 51.4379 11.3223 51.4379 14.9599V34.3609C51.4379 36.3495 50.2738 38.1684 48.4307 38.9687L33.6375 45.5165C31.8186 46.3168 30.6303 48.1356 30.6303 50.1242H30.6546Z" fill="black"/>
          </svg>
          <span
            style={{
              fontSize: 120,
              fontWeight: 600,
              color: 'black',
              letterSpacing: '-0.02em',
            }}
          >
            tappd
          </span>
        </div>
        <p
          style={{
            fontSize: 32,
            color: 'rgba(0,0,0,0.5)',
            marginTop: 24,
            fontWeight: 400,
          }}
        >
          Tap. Text. Get Paid.
        </p>
      </div>
    ),
    { ...size },
  )
}
