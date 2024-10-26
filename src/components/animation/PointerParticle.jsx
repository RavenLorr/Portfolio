import React, { useEffect, useRef } from 'react';

import { CanvasUtils } from '@/utils/canvasUtils.js';
import { PointerParticle } from '@/utils/PointerParticleClass.js';

const PointerParticles = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const pointerRef = useRef({ x: 0, y: 0, mx: 0, my: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const setPointerValues = (event) => {
            pointerRef.current.x = event.clientX;
            pointerRef.current.y = event.clientY;
            pointerRef.current.mx = event.movementX;
            pointerRef.current.my = event.movementY;
        };

        const handlePointerMove = (event) => {
            setPointerValues(event);
            const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
            const particles = CanvasUtils.createParticles(2.5, CanvasUtils.getPointerVelocity(event), 1, ctx, pointerRef.current, scalingFactor, PointerParticle);
            particlesRef.current.push(...particles);
        };

        const handleClick = (event) => {
            setPointerValues(event);
            const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
            const particles = CanvasUtils.createParticles(10, Math.random() + 1, Math.random() + 50, ctx, pointerRef.current, scalingFactor, PointerParticle);
            particlesRef.current.push(...particles);
        };

        const animateParticles = () => {
            animationRef.current = requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            CanvasUtils.handleParticles(particlesRef.current);
        };

        window.addEventListener('resize', () => CanvasUtils.setCanvasDimensions(canvas));
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('click', handleClick);

        CanvasUtils.setCanvasDimensions(canvas);
        animateParticles();

        return () => {
            window.removeEventListener('resize', () => CanvasUtils.setCanvasDimensions(canvas));
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: '60' }} />;
};

export default PointerParticles;