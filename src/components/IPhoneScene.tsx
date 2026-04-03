'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const TILT_START = -Math.PI / 3.5  // ~51deg tilted
const TILT_END = 0                  // upright
const SCROLL_RANGE = 0.4

const scrollProgress = { current: 0 }

if (typeof window !== 'undefined') {
  const update = () => {
    const vh = window.innerHeight
    scrollProgress.current = Math.min(Math.max(window.scrollY / (vh * SCROLL_RANGE), 0), 1)
  }
  window.addEventListener('scroll', update, { passive: true })
  update()
}

function IPhoneModel() {
  const gltf = useGLTF('/iphone.glb')
  const groupRef = useRef<THREE.Group>(null!)
  const currentRotation = useRef(TILT_START)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const scene = gltf.scene

    const video = document.createElement('video')
    video.src = '/demo.mp4'
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.play().catch(() => {})
    videoRef.current = video

    const videoTex = new THREE.VideoTexture(video)
    videoTex.flipY = false
    videoTex.colorSpace = THREE.SRGBColorSpace
    videoTex.minFilter = THREE.LinearFilter
    videoTex.magFilter = THREE.LinearFilter

    // Find screen meshes by traversing — look for Display material OR
    // meshes under the Screen_14 node
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      const mat = child.material as THREE.MeshStandardMaterial
      const matName = mat?.name || ''
      const parentName = child.parent?.name || ''

      if (matName === 'Display' || parentName.startsWith('Screen')) {
        child.material = new THREE.MeshBasicMaterial({ map: videoTex })
      }
    })

    return () => {
      video.pause()
      video.src = ''
      videoTex.dispose()
    }
  }, [gltf])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = THREE.MathUtils.lerp(TILT_START, TILT_END, scrollProgress.current)
    const smoothing = 1 - Math.pow(0.001, delta)
    currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, target, smoothing)
    groupRef.current.rotation.x = currentRotation.current
  })

  return (
    <group ref={groupRef} rotation={[TILT_START, 0, 0]}>
      <primitive object={gltf.scene} scale={30} rotation={[Math.PI, 0, 0]} />
    </group>
  )
}

const BG_COLOR = new THREE.Color(0xa5f41f)

export default function IPhoneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      scene={{ background: BG_COLOR }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 3, 5]} intensity={1.5} />
      <directionalLight position={[0, -3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <IPhoneModel />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/iphone.glb')
