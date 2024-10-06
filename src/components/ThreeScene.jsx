import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlowingRing = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ height: '100vh', width: '100vw' }}
        >
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />

            <mesh position={[0, 0, 0]} castShadow>
                <ringGeometry args={[1.5, 1.55, 128]} />
            </mesh>

            <OrbitControls />
        </Canvas>
    );
};

export default GlowingRing;
