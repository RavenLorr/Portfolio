import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {PageBuilderProvider} from "@/context/PageBuilderContext.jsx";

import LoadingScreen from './components/loading/LoadingScreen.jsx';
import { NavBar, Home, About, Projects, Contact, Experience } from './utils/import/lazyComponents.js';
import { PointerParticles } from './utils/import/lazyComponentsAnimations.js';
import useComponentLoader from './utils/useComponentLoader.js';


import './App.css';

/*
* npx tailwindcss -i ./src/index.css -o ./src/style.css --watch
* */

function App() {
    const { isLoading, progress } = useComponentLoader();
    const [initialLoad, setInitialLoad] = useState(true);
    const [stylesLoaded, setStylesLoaded] = useState(false);

    useEffect(() => {
        const styleSheets = document.styleSheets;
        const checkStyles = () => {
            if (styleSheets.length > 0) {
                setStylesLoaded(true);
            } else {
                requestAnimationFrame(checkStyles);
            }
        };
        checkStyles();

        if (!isLoading) {
            setInitialLoad(false);
        }
    }, [isLoading]);

    if ((isLoading && initialLoad) || !stylesLoaded) {
        return <LoadingScreen progress={progress} />;
    }

    return (
        <Router>
            <Suspense
                fallback={
                    <div className="fixed inset-0 flex items-center justify-center text-white bg-custom-radial">
                        <div className="animate-pulse">Loading...</div>
                    </div>
                }
            >
                <div className="relative min-h-screen bg-custom-radial flex flex-col">
                    <NavBar/>
                    <div className="flex-grow relative z-10">
                        <PageBuilderProvider>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/projects" element={<Projects/>}/>
                                <Route path="/contact" element={<Contact/>}/>
                                <Route path="/experience" element={<Experience/>}/>
                            </Routes>
                        </PageBuilderProvider>

                    </div>
                    <PointerParticles/>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;