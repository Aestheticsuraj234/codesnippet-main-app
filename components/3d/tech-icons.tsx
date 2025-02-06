"use client";

import { Canvas, useFrame  ,} from "@react-three/fiber";
import { Float, useTexture, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

export function TechIcon({ position, iconTexture, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const texture = useTexture(iconTexture);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;``
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
     
    </Float>
  );
}

export function TechIcons() {
  const icons = [
    { texture: "/typescript.png", position: [-2, 1, 0], scale: 0.5 },
    { texture: "/react.png", position: [2, -1, -2], scale: 0.6 },
    { texture: "/mongo-db.png", position: [1.5, 1.5, -2], scale: 0.3 },
    { texture: "/vscode.png", position: [3, 1, 1], scale: 0.3 },
    { texture: "/github.png", position: [-3, 0, -2], scale: 0.3 },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Lighting setup */}
      

      {/* Orbit Controls for interaction */}
      <OrbitControls enableZoom={false} />

      {/* Suspense for texture loading */}
      <Suspense fallback={null}>
        {icons.map((icon, index) => (
          <TechIcon key={index} position={icon.position} iconTexture={icon.texture} scale={icon.scale} />
        ))}
      </Suspense>
    </Canvas>
  );
}
