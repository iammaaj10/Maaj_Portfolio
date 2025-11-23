import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';

function NeonCube(){
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh rotation={[0.4, 0.6, 0]}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial emissive="#7efcf6" metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  )
}

export default function Hero3D(){
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <NeonCube />
        {/* Floating labels */}
        <Html position={[1.8, -0.8, 0]}>
          <div className="px-3 py-2 rounded-md glass text-xs">MERN • Cloud • Real-time</div>
        </Html>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
