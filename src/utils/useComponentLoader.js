import { useState, useEffect } from 'react';

import * as LazyComponents from '../utils/lazyComponents.js';

const useComponentLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const componentsToLoad = Object.values(LazyComponents);

        const loadComponents = async () => {
            for (let i = 0; i < componentsToLoad.length; i++) {
                try {
                    // Force the lazy component to load
                    await componentsToLoad[i].__esModule;
                } catch (error) {
                    console.error(`Failed to load component: ${error}`);
                }
                setProgress(Math.round(((i + 1) / componentsToLoad.length) * 100));
            }

            // Add a small delay to ensure everything is ready
            await new Promise(resolve => setTimeout(resolve, 100));

            setIsLoading(false);
        };

        loadComponents().catch(error => {
            console.error("Failed to load components:", error);
            setIsLoading(false);
        });
    }, []);

    return { isLoading, progress };
};

export default useComponentLoader;