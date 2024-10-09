import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/loading/LoadingScreen';
import useComponentLoader from './utils/useComponentLoader';
import { NavBar, Home, About, Projects, Contact, Experience, PointerParticles } from './utils/lazyComponents';
import './app.css';

function App() {
    const { isLoading, progress } = useComponentLoader();
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            setInitialLoad(false);
        }
    }, [isLoading]);

    if (isLoading && initialLoad) {
        return <LoadingScreen progress={progress} />;
    }

    return (
        <Router>
            <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center text-white">Loading...</div>}>
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