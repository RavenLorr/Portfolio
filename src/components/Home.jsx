import React from 'react';
import { MultiWaveRing, FlowerShoots } from '../utils/lazyComponents';

function Home() {
    return (
        <div>
            <div className="absolute inset-0 z-20">
                <canvas id="smoky-ring" className="w-full h-full"></canvas>
                <MultiWaveRing canvasId="smoky-ring"/>
            </div>
            <div className="relative z-10">
                <FlowerShoots/>n ^0   
            </div>
        </div>
    );
}

export default Home;