import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/loading/LoadingScreen';
import useComponentLoader from './utils/useComponentLoader';
import { NavBar, Home, About, Projects, Contact, Experience, PointerParticles } from './utils/lazyComponents';
import './app.css';

function App() {
    const { isLoading, progress } = useComponentLoader();

    if (isLoading) {
        return <LoadingScreen progress={progress} />;
    }

    return (
        <Router>
            <Suspense fallback={<LoadingScreen progress={100} />}>
                <div className="relative">
                    <div className="bg-custom-radial min-h-screen"></div>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/experience" element={<Experience/>}/>
                    </Routes>
                    <PointerParticles/>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;