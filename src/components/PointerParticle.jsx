import React, { useEffect, useRef } from 'react';

class PointerParticle {
    constructor(spread, speed, component) {
        const { ctx, pointer } = component;

        this.ctx = ctx;
        this.x = pointer.x;
        this.y = pointer.y;
        this.mx = pointer.mx * 0.1;
        this.my = pointer.my * 0.1;
        this.size = Math.random() + 1;
        this.decay = 0.01;
        this.speed = speed * 0.08;
        this.spread = spread * this.speed;
        this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
        this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    collapse() {
        this.size -= this.decay;
    }

    trail() {
        this.x += this.spreadX * this.size;
        this.y += this.spreadY * this.size;
    }

    update() {
        this.draw();
        this.trail();
        this.collapse();
    }
}

const PointerParticles = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const pointerRef = useRef({ x: 0, y: 0, mx: 0, my: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = (event, { count, speed, spread }) => {
            setPointerValues(event);

            for (let i = 0; i < count; i++) {
                particlesRef.current.push(new PointerParticle(spread, speed, { ctx, pointer: pointerRef.current }));
            }
        };

        const setPointerValues = (event) => {
            pointerRef.current.x = event.clientX;
            pointerRef.current.y = event.clientY;
            pointerRef.current.mx = event.movementX;
            pointerRef.current.my = event.movementY;
        };

        const handleParticles = () => {
            for (let i = 0; i < particlesRef.current.length; i++) {
                particlesRef.current[i].update();

                if (particlesRef.current[i].size <= 0.1) {
                    particlesRef.current.splice(i, 1);
                    i--;
                }
            }
        };

        const animateParticles = () => {
            animationRef.current = requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
        };

        const handlePointerMove = (event) => {
            createParticles(event, { count: 2.5, speed: getPointerVelocity(event), spread: 1 });
        };

        const handleClick = (event) => {
            createParticles(event, { count: 10, speed: Math.random() + 1, spread: Math.random() + 50 });
        };

        const getPointerVelocity = (event) => {
            const a = event.movementX;
            const b = event.movementY;
            return Math.floor(Math.sqrt(a * a + b * b));
        };

        window.addEventListener('resize', setCanvasDimensions);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('click', handleClick);

        setCanvasDimensions();
        animateParticles();

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

export default PointerParticles;