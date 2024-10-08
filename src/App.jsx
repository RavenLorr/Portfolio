import React from 'react';
import NavBar from './components/NavBar.jsx';
import MultiWaveRing from './components/MultiWaveRing.jsx';
import PointerParticles from './components/PointerParticle.jsx';
import FlowerShootsAnimation from './components/FlowerShootsAnimation.jsx';
import './app.css';

function App() {
    return (
        <div className="bg-custom-radial">
            <NavBar/>
            <div className="Fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center">
                <canvas id="smoky-ring" className="w-full h-full absolute top-0 left-0"></canvas>
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