"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export function TechIcon({ position, iconTexture, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(iconTexture)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} scale={[scale, scale, scale]}>
        {/* Icon without glowing effect, using meshBasicMaterial for brighter texture */}
        <mesh ref={meshRef}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
          // @ts-ignore
            map={texture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function TechIcons() {
  const icons = [
    { texture: "/typescript.png", position: [-2, 1, 0], scale: 0.5 },
    { texture: "/react.png", position: [2, -1, -2], scale: 0.6 },
   
    { texture: "/mongo-db.png", position: [1.5, 1.5, -2], scale: 0.3 },
    { texture: "/vscode.png", position: [3, 1, 1], scale: 0.3 },  // Added VSCode icon
    { texture: "/github.png", position: [-3, 0, -2], scale: 0.3 }, // Added GitHub icon
  ]

  return (
    <>
      {/* Lighting setup */}
    {/*   <ambientLight intensity={1} /> Brighter ambient light */}
    <directionalLight position={[5, 5, 5]} intensity={2} /> 
      
      {/* OrbitControls for better interaction */}
      <OrbitControls 
      enableZoom={false}
      />
      
      {/* Group containing all icons */}
      <group>
        {icons.map((icon, index) => (
          <TechIcon
            key={index}
            position={icon.position}
            iconTexture={icon.texture}
            scale={icon.scale}
          />
        ))}
      </group>
    </>
  )
}
