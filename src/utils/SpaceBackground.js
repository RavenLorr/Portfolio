import React, { useEffect } from 'react';

function SpaceBackground() {
    useEffect(() => {
        const numStars = 100;
        const container = document.getElementById('root');

        function createStar(isInitial = false) {
            const star = document.createElement('div');
            star.className = 'star';

            if (isInitial) {
                // Allow stars to spawn anywhere on the screen
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
            } else {
                // Randomly choose to spawn in the top or left part of the screen
                if (Math.random() < 0.5) {
                    // Spawn in the top 25% part
                    star.style.top = `${Math.random() * 25}vh`;
                    star.style.left = `${Math.random() * 100}vw`;
                } else {
                    // Spawn in the left 25% part
                    star.style.top = `${Math.random() * 100}vh`;
                    star.style.left = `${Math.random() * 25}vw`;
                }
            }

            star.style.animationDuration = `${Math.random() * 10 + 40}s`;
            container.appendChild(star);
        }

        // Create initial stars
        for (let i = 0; i < numStars; i++) {
            createStar(true);
        }

        // Add new stars at regular intervals
        const intervalId = setInterval(() => createStar(false), 100);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return null;
}

export default SpaceBackground;