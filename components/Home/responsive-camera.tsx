"use client"
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function ResponsiveCamera() {
    const { viewport } = useThree();
    const isMobile = viewport.width < 768;
    return (
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, isMobile ? 3 : 5]} 
        fov={isMobile ? 80 : 70} 
      />
    );
  }

  export default ResponsiveCamera;