import React from 'react';
import NavBar from './components/NavBar.jsx';
import About from './components/About.jsx';
import SpaceBackground from './utils/SpaceBackground';
import SmokyRing from './utils/SmokyRing';

function App() {
    return (
        <div>
            <NavBar />
            <SpaceBackground />
            <About />
            <canvas id="smoky-ring"></canvas>
            <SmokyRing canvasId="smoky-ring" />
        </div>
    );
}

export default App;