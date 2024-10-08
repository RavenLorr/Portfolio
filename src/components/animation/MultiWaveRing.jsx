import { useEffect, useRef } from 'react';
import { CanvasUtils } from '../../utils/canvasUtils.js';

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
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        ctxRef.current = ctx;

        offscreenCanvasRef.current = document.createElement('canvas');
        offscreenCtxRef.current = offscreenCanvasRef.current.getContext('2d');

        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            offscreenCanvasRef.current.width = canvas.width;
            offscreenCanvasRef.current.height = canvas.height;
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
            const { baseRadius, ringCenterX, ringCenterY, scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvasRef.current);

            // Adjust ring properties based on scalingFactor
            const adjustedRadius = ring.radius * scalingFactor;
            let adjustedWaveAmplitude = ring.waveAmplitude * scalingFactor;
            const adjustedLineWidth = ring.lineWidth * scalingFactor;

            if (index === 3) {
                const baseAmplitude = 15;
                const amplitudeVariation = 10;
                adjustedWaveAmplitude = Math.min((baseAmplitude + amplitudeVariation * Math.sin(timeRef.current * 0.05)) * scalingFactor, baseAmplitude * 2);
            }

            ctx.beginPath();
            const points = [];
            for (let i = 0; i <= wavePoints; i++) {
                const angle = (i / wavePoints) * Math.PI * 2;
                const radius = baseRadius + adjustedRadius + Math.sin(angle * ring.waveFrequency + timeRef.current * fixedSpeed * ring.direction) * adjustedWaveAmplitude;
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
            ctx.lineWidth = adjustedLineWidth;
            ctx.stroke();

            if (Math.random() < 0.1) {
                const point = points[Math.floor(Math.random() * points.length)];
                const size = (Math.random() * 2 + 1) * scalingFactor;
                const speed = (Math.random() * 0.5 + 0.2) * scalingFactor;
                const inward = Math.random() < 0.3;
                const direction = point.angle + (inward ? Math.PI : 0) + (Math.random() - 0.5) * Math.PI * 0.5;
                const life = (inward ? 100 : 150) * scalingFactor;
                particlesRef.current.push(new CanvasUtils.Particle(point.x, point.y, size, speed, direction, life, inward, ringCenterX, ringCenterY));
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

            ctx.drawImage(offscreenCanvasRef.current, 0, 0);

            const { baseRadius, ringCenterX, ringCenterY, scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 40 * scalingFactor;
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 15 * scalingFactor;
            ctx.beginPath();
            ctx.arc(ringCenterX, ringCenterY, baseRadius, 0, Math.PI * 2);
            ctx.stroke();

            const fontSize = 60 * scalingFactor;
            ctx.font = `bold ${fontSize}px 'Space Game'`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, ringCenterX, ringCenterY);

            timeRef.current += 1;
        }

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener('resize', handleResize);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [text]);

    return <canvas ref={canvasRef} className="w-full h-full z-10" />;
}

export default MultiWaveRing;