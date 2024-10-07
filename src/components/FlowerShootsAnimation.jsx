import React, { useEffect, useRef } from 'react';
import { calculateBaseRadiusAndCenter } from '../utils/canvasUtils';

const FlowerShootsAnimation = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const pathDataRef = useRef([]);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let windowWidth = canvas.width = window.innerWidth;
        let windowHeight = canvas.height = window.innerHeight;

        const numberParticlesStart = 1000;
        const particleSpeed = 0.3;
        const velocity = 0.9;
        const dampingDuration = 30000; // 30 seconds

        const getRandomFloat = (min, max) => (Math.random() * (max - min) + min);

        function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.vel = {
                x: getRandomFloat(-20, 20) / 100,
                y: getRandomFloat(-20, 20) / 100,
                min: getRandomFloat(2, 10),
                max: getRandomFloat(10, 100) / 10
            };
            this.color = 'rgba(213, 163, 71, 0.05)';
            this.pathLength = 0;
            this.prevX = x;
            this.prevY = y;
        }

        Particle.prototype.render = function () {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, 1, 0, Math.PI * 2);
            context.fill();
        };

        Particle.prototype.update = function (dampingFactor) {
            const forceDirection = {
                x: getRandomFloat(-1, 1),
                y: getRandomFloat(-1, 1),
            };

            if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
                this.vel.x += forceDirection.x;
            }
            if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
                this.vel.y += forceDirection.y;
            }

            this.x += this.vel.x * particleSpeed * dampingFactor;
            this.y += this.vel.y * particleSpeed * dampingFactor;

            if (Math.abs(this.vel.x) > this.vel.min) {
                this.vel.x *= velocity;
            }
            if (Math.abs(this.vel.y) > this.vel.min) {
                this.vel.y *= velocity;
            }

            this.testBorder();

            // Calculate the distance traveled
            const dx = this.x - this.prevX;
            const dy = this.y - this.prevY;
            this.pathLength += Math.sqrt(dx * dx + dy * dy);
            this.prevX = this.x;
            this.prevY = this.y;
        };

        Particle.prototype.testBorder = function () {
            if (this.x > windowWidth) {
                this.setPosition(this.x, 'x');
            } else if (this.x < 0) {
                this.setPosition(windowWidth, 'x');
            }
            if (this.y > windowHeight) {
                this.setPosition(this.y, 'y');
            } else if (this.y < 0) {
                this.setPosition(windowHeight, 'y');
            }
        };

        Particle.prototype.setPosition = function (pos, coor) {
            if (coor === 'x') {
                this.x = pos;
            } else if (coor === 'y') {
                this.y = pos;
            }
        };

        function loop() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTimeRef.current;
            const dampingFactor = Math.max(0, 1 - elapsedTime / dampingDuration);

            let i;
            const length = particlesRef.current.length;
            for (i = 0; i < length; i++) {
                particlesRef.current[i].update(dampingFactor);
                particlesRef.current[i].render();
            }
            if (particlesRef.current.length > 0) {
                console.log(`Particle 1 path length: ${particlesRef.current[0].pathLength.toFixed(2)}`);
            }
            animationRef.current = requestAnimationFrame(loop);
        }

        function init() {
            const { baseRadius, ringCenterX, ringCenterY } = calculateBaseRadiusAndCenter(canvas);
            const adjustedBaseRadius = baseRadius - 110;
            let i;
            for (i = 0; i < numberParticlesStart; i++) {
                const angle = Math.random() * 360;
                particlesRef.current.push(new Particle(
                    ringCenterX + (Math.cos(angle) * adjustedBaseRadius),
                    ringCenterY - (Math.sin(angle) * adjustedBaseRadius),
                ));
            }
        }

        init();
        window.onresize = () => {
            windowWidth = canvas.width = window.innerWidth;
            windowHeight = canvas.height = window.innerHeight;
            particlesRef.current = [];
            context.clearRect(0, 0, windowWidth, windowHeight);
            startTimeRef.current = Date.now(); // Reset the damping effect
            init();
        };

        const updatePathData = () => {
            pathDataRef.current = particlesRef.current.map(particle => ({
                x: Math.floor(particle.x),
                y: Math.floor(particle.y)
            }));
        };

        updatePathData();

        loop();

        return () => {
            window.removeEventListener('resize', () => {});
            window.removeEventListener('click', () => {});
            cancelAnimationFrame(animationRef.current);
        };
    }, [particlesRef]);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
    );
};

export default FlowerShootsAnimation;