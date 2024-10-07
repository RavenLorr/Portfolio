import React from 'react';
import NavBar from './components/NavBar.jsx';
import SmokyRing from './components/MultiWaveRing.jsx';
import PointerParticles from './components/PointerParticle.jsx';
import FlowerShootsAnimation from './components/FlowerShootsAnimation.jsx';

function App() {
    return (
        <div>
            <FlowerShootsAnimation />
            <canvas id="smoky-ring"></canvas>
            <SmokyRing canvasId="smoky-ring" />
            <PointerParticles />
        </div>
    );
}

export default App;