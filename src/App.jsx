import React from 'react';
import NavBar from './components/NavBar.jsx';
import MultiWaveRing from './components/MultiWaveRing.jsx';
import PointerParticles from './components/PointerParticle.jsx';
import FlowerShootsAnimation from './components/FlowerShootsAnimation.jsx';
import './app.css';

function App() {
    return (
        <div className="relative bg-custom-radial">
            <NavBar/>
            <div className="relative inset-0 z-20">
                <canvas id="smoky-ring" className="w-full h-full"></canvas>
                <MultiWaveRing canvasId="smoky-ring"/>
            </div>
            <div className="z-10">
                <FlowerShootsAnimation/>
            </div>
            <PointerParticles/>
        </div>
    );
}

export default App;