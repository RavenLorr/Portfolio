import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/subPages/About';
import Projects from './components/subPages/Projects';
import Contact from './components/subPages/Contact';
import Experience from './components/subPages/Experience';
import PointerParticles from './components/animation/PointerParticle.jsx';
import './app.css';

function App() {
    return (
        <Router>
            <div className="relative">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/experience" element={<Experience />} />
                </Routes>
                <PointerParticles/>
            </div>
        </Router>
    );
}

export default App;