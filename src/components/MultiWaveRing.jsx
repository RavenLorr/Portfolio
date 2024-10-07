import React, { useEffect, useRef } from 'react';
import { calculateBaseRadiusAndCenter } from '../utils/canvasUtils';

function MultiWaveRing({ canvasId, text = "RavenLorr" }) {
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const timeRef = useRef(0);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const offscreenCanvasRef = useRef(null);
    const offscreenCtxRef = useRef(null);

    useEffect(() => {
        canvasRef.current = document.getElementById(canvasId);
        if (!canvasRef.current) {
            console.error(`Canvas with id ${canvasId} not found`);
            return;
        }
        ctxRef.current = canvasRef.current.getContext("2d");

        offscreenCanvasRef.current = document.createElement('canvas');
        offscreenCtxRef.current = offscreenCanvasRef.current.getContext('2d');

        const resizeCanvas = () => {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            offscreenCanvasRef.current.width = window.innerWidth;
            offscreenCanvasRef.current.height = window.innerHeight;
        };

        const rings = [
            { radius: 0, waveAmplitude: 22, waveFrequency: 3, direction: 1, lineWidth: 20, color: ["#e3e3e3", "#FFFFFF", "#f0f0f0"] },
            { radius: 5, waveAmplitude: 20, waveFrequency: 5, direction: -1, lineWidth: 20, color: ["#FFFFFF", "#FFFFFF", "#f0f0f0"] },
            { radius: 10, waveAmplitude: 18, waveFrequency: 4, direction: 1, lineWidth: 20, color: ["#FFFFFF", "#f0f0f0", "#e3e3e3"] },
            { radius: 0, waveAmplitude: 15, waveFrequency: 4, direction: -1, lineWidth: 40, color: ["#FFFFFF", "#e3e3e3", "#FFFFFF"] },
        ];

        const wavePoints = 200;
        const fixedSpeed = 0.02;

        function drawRing(ring, index) {
            const ctx = ctxRef.current;
            const { baseRadius, ringCenterX, ringCenterY, scalingFactor } = calculateBaseRadiusAndCenter(canvasRef.current);

            // Adjust waveAmplitude adaptively based on screen size
            if (index === 3) {
                const baseAmplitude = 15; // need to be manually adjusted to avoid glitching
                const amplitudeVariation = 5;
                ring.waveAmplitude = (baseAmplitude + amplitudeVariation * Math.sin(timeRef.current * 0.05)) * scalingFactor;
            }

            ctx.beginPath();
            const points = [];
            for (let i = 0; i <= wavePoints; i++) {
                const angle = (i / wavePoints) * Math.PI * 2;
                const radius = baseRadius + ring.radius * scalingFactor + Math.sin(angle * ring.waveFrequency + timeRef.current * fixedSpeed * ring.direction) * ring.waveAmplitude * scalingFactor;
                const x = ringCenterX + radius * Math.cos(angle);
                const y = ringCenterY + radius * Math.sin(angle);
                points.push({ x, y, angle });
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            const gradient = ctx.createLinearGradient(ringCenterX - baseRadius, ringCenterY, ringCenterX + baseRadius, ringCenterY);
            gradient.addColorStop(0, ring.color[0]);
            gradient.addColorStop(0.5, ring.color[1]);
            gradient.addColorStop(1, ring.color[2]);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = ring.lineWidth * scalingFactor;
            ctx.stroke();
            if (Math.random() < 0.1) {
                const point = points[Math.floor(Math.random() * points.length)];
                const size = (Math.random() * 2 + 1) * scalingFactor;
                const speed = (Math.random() * 0.5 + 0.2) * scalingFactor;
                const inward = Math.random() < 0.3; // 30% chance for inward particles
                const direction = point.angle + (inward ? Math.PI : 0) + (Math.random() - 0.5) * Math.PI * 0.5;
                const life = (inward ? 100 : 150) * scalingFactor; // Shorter life for inward particles
                particlesRef.current.push(new Particle(point.x, point.y, size, speed, direction, life, inward, ringCenterX, ringCenterY));
            }
        }

        function drawParticles() {
            const ctx = ctxRef.current;
            const canvas = canvasRef.current;
            particlesRef.current = particlesRef.current.filter(particle => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
                return particle.life > 0;
            });
        }

        function animate() {
            animationRef.current = requestAnimationFrame(animate);
            const ctx = ctxRef.current;
            const canvas = canvasRef.current;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            offscreenCtxRef.current.clearRect(0, 0, canvas.width, canvas.height);

            rings.forEach((ring, index) => drawRing(ring, index));
            drawParticles();

            // Draw offscreen canvas onto main canvas
            ctx.drawImage(offscreenCanvasRef.current, 0, 0);

            // Draw glowing outline
            const { baseRadius, ringCenterX, ringCenterY, scalingFactor } = calculateBaseRadiusAndCenter(canvas);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 40 * scalingFactor;
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 15 * scalingFactor;
            ctx.beginPath();
            ctx.arc(ringCenterX, ringCenterY, baseRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Write text
            ctx.font = `bold ${60 * scalingFactor}px 'Space Game'`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, ringCenterX, ringCenterY);

            timeRef.current += 1;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [canvasId, text]);

    return null;
}

export default MultiWaveRing;

class Particle {
    constructor(x, y, size, speed, direction, life, inward, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.direction = direction;
        this.life = life;
        this.maxLife = life;
        this.inward = inward;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    update(width, height) {
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);
        this.life -= 1;

        if (this.inward) {
            // Fade out inward particles as they approach the center
            const distanceToCenter = Math.sqrt(Math.pow(this.x - this.centerX, 2) + Math.pow(this.y - this.centerY, 2));
            if (distanceToCenter < 50) {
                this.life = Math.min(this.life, distanceToCenter);
            }
        } else {
            // Wrap outward particles around the screen
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life / this.maxLife * 0.5})`;
        ctx.fill();
    }
}