"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import type * as THREE from "three"

function Particle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position[0] * 100) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.1, 16, 16]} position={position}>
      <meshStandardMaterial color="#08BD80" emissive="#08BD80" emissiveIntensity={0.5} />
    </Sphere>
  )
}

export function VideoBackground() {
  const particlesCount = 50
  const particles = useRef<[number, number, number][]>([])

  if (particles.current.length === 0) {
    for (let i = 0; i < particlesCount; i++) {
      particles.current.push([Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5])
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {particles.current.map((position, index) => (
        <Particle key={index} position={position} />
      ))}
    </>
  )
}

