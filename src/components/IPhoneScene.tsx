'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useVideoTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

const TILT_START = -Math.PI / 6
const TILT_END = 0
const SCROLL_RANGE = 0.6

function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      progress.current = Math.min(Math.max(window.scrollY / (vh * SCROLL_RANGE), 0), 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}

function IPhoneModel({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { scene } = useGLTF('/iphone.glb')
  const groupRef = useRef<THREE.Group>(null!)
  const currentRotation = useRef(TILT_START)

  const videoTexture = useVideoTexture('/demo.mp4', {
    muted: true,
    loop: true,
    playsInline: true,
  })

  useEffect(() => {
    videoTexture.flipY = false
    videoTexture.colorSpace = THREE.SRGBColorSpace

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      const mat = child.material as THREE.MeshStandardMaterial
      if (mat?.name === 'Display') {
        const screenMat = mat.clone()
        screenMat.map = videoTexture
        screenMat.emissive = new THREE.Color(1, 1, 1)
        screenMat.emissiveMap = videoTexture
        screenMat.emissiveIntensity = 0.6
        screenMat.needsUpdate = true
        child.material = screenMat
      }
    })
  }, [scene, videoTexture])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = THREE.MathUtils.lerp(TILT_START, TILT_END, scrollProgress.current ?? 0)
    const smoothing = 1 - Math.pow(0.001, delta)
    currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, target, smoothing)
    groupRef.current.rotation.x = currentRotation.current
  })

  return (
    <group ref={groupRef} rotation={[TILT_START, 0, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

export default function IPhoneScene() {
  const scrollProgress = useScrollProgress()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Environment preset="city" />
      <IPhoneModel scrollProgress={scrollProgress} />
    </Canvas>
  )
}

useGLTF.preload('/iphone.glb')
