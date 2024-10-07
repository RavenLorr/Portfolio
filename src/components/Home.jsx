import React, { useEffect } from 'react';
import SmokyRing from './MultiWaveRing.jsx';

function Home() {
    useEffect(() => {
        SmokyRing('smokyCanvas');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <canvas id="smokyCanvas" className="absolute"></canvas>
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
            <p className="text-lg text-gray-700 mt-4">This is the home page.</p>
        </div>
    );
}

export default Home;