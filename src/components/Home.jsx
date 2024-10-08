import React from 'react';
import MultiWaveRing from './animation/MultiWaveRing';
import FlowerShoots from './animation/FlowerShoots';

function Home() {
    return (
        <div>
            <div className="bg-custom-radial min-h-screen"></div>
            <div className="absolute inset-0 z-20">
                <canvas id="smoky-ring" className="w-full h-full"></canvas>
                <MultiWaveRing canvasId="smoky-ring"/>
            </div>
            <div className="relative z-10">
                <FlowerShoots/>
            </div>
        </div>
    );
}

export default Home;