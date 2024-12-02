import { useEffect, useRef, useCallback } from 'react';

import { CanvasUtils } from '@/utils/canvasUtils.js';
import { Particle } from '@/utils/ParticleClass.js';

function MultiWaveRing({ canvasId, text = 'RavenLorr' }) {
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const offscreenCtxRef = useRef(null);
  const performanceRef = useRef({
    lastFrameTime: 0,
    frameCount: 0,
    fps: 0
  });

  const rings = useRef([
    {
      radius: 0,
      waveAmplitude: 22,
      waveFrequency: 3,
      direction: 1,
      lineWidth: 20,
      color: ['#e3e3e3', '#FFFFFF', '#f0f0f0'],
    },
    {
      radius: 5,
      waveAmplitude: 20,
      waveFrequency: 5,
      direction: -1,
      lineWidth: 20,
      color: ['#FFFFFF', '#FFFFFF', '#f0f0f0'],
    },
    {
      radius: 10,
      waveAmplitude: 18,
      waveFrequency: 4,
      direction: 1,
      lineWidth: 20,
      color: ['#FFFFFF', '#f0f0f0', '#e3e3e3'],
    },
    {
      radius: 0,
      waveAmplitude: 15,
      waveFrequency: 4,
      direction: -1,
      lineWidth: 40,
      color: ['#FFFFFF', '#e3e3e3', '#FFFFFF'],
    },
  ]);

  const wavePoints = 100;
  const fixedSpeed = 0.02;
  const particleGenerationProbability = 0.05;

  const drawRing = useCallback((ring, index, ctx, canvas) => {
    const { baseRadius, ringCenterX, ringCenterY, scalingFactor } =
      CanvasUtils.calculateBaseRadiusAndCenter(canvas);

    const adjustedRadius = ring.radius * scalingFactor;
    let adjustedWaveAmplitude = ring.waveAmplitude * scalingFactor;
    const adjustedLineWidth = ring.lineWidth * scalingFactor;

    if (index === 3) {
      const baseAmplitude = 15;
      const amplitudeVariation = 10;
      adjustedWaveAmplitude = Math.min(
        (baseAmplitude + amplitudeVariation * Math.sin(timeRef.current * 0.05)) * scalingFactor,
        baseAmplitude * 2
      );
    }

    ctx.beginPath();
    const points = [];
    for (let i = 0; i <= wavePoints; i++) {
      const angle = (i / wavePoints) * Math.PI * 2;
      const radius =
        baseRadius +
        adjustedRadius +
        Math.sin(angle * ring.waveFrequency + timeRef.current * fixedSpeed * ring.direction) *
        adjustedWaveAmplitude;
      const x = ringCenterX + radius * Math.cos(angle);
      const y = ringCenterY + radius * Math.sin(angle);
      points.push({ x, y, angle });
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    const gradient = ctx.createLinearGradient(
      ringCenterX - baseRadius,
      ringCenterY,
      ringCenterX + baseRadius,
      ringCenterY
    );
    gradient.addColorStop(0, ring.color[0]);
    gradient.addColorStop(0.5, ring.color[1]);
    gradient.addColorStop(1, ring.color[2]);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = adjustedLineWidth;
    ctx.stroke();

    if (Math.random() < particleGenerationProbability) {
      const point = points[Math.floor(Math.random() * points.length)];
      const size = (Math.random() * 20 + 1) * scalingFactor;
      const speed = (Math.random() * 0.5 + 0.2) * scalingFactor;
      const inward = Math.random() < 0.3;
      const direction =
        point.angle + (inward ? Math.PI : 0) + (Math.random() - 0.5) * Math.PI * 0.5;
      const life = (inward ? 1300 : 1450) * scalingFactor;
      particlesRef.current.push(
        Particle.createRingParticle(
          point.x,
          point.y,
          size,
          speed,
          direction,
          life,
          inward,
          ringCenterX,
          ringCenterY
        )
      );
    }
  }, []);

  const drawParticles = useCallback((ctx, canvas) => {
    particlesRef.current = particlesRef.current.filter(particle =>
      particle.update(canvas.width, canvas.height, ctx)
    );
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const offscreenCtx = offscreenCtxRef.current;

    if (!canvas || !ctx) return;

    // eslint-disable-next-line no-undef
    const now = performance.now();
    performanceRef.current.frameCount++;
    if (now >= performanceRef.current.lastFrameTime + 1000) {
      performanceRef.current.fps = performanceRef.current.frameCount;
      performanceRef.current.frameCount = 0;
      performanceRef.current.lastFrameTime = now;

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);

    rings.current.forEach((ring, index) => drawRing(ring, index, ctx, canvas));
    drawParticles(ctx, canvas);

    ctx.drawImage(offscreenCanvasRef.current, 0, 0);

    const { baseRadius, ringCenterX, ringCenterY, scalingFactor } =
      CanvasUtils.calculateBaseRadiusAndCenter(canvas);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 40 * scalingFactor;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 15 * scalingFactor;
    ctx.beginPath();
    ctx.arc(ringCenterX, ringCenterY, baseRadius, 0, Math.PI * 2);
    ctx.stroke();

    const fontSize = Math.round(60 * (scalingFactor / 1.5));
    ctx.font = `bold ${fontSize}px 'Space Game'`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, ringCenterX, ringCenterY);

    timeRef.current += 1;

    animationRef.current = requestAnimationFrame(animate);
  }, [drawRing, drawParticles, text]);

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    canvas.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'z-[1]');

    const ctx = canvas.getContext('2d');
    canvasRef.current = canvas;
    ctxRef.current = ctx;

    CanvasUtils.setCanvasDimensions(canvas);

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvasRef.current = offscreenCanvas;
    offscreenCtxRef.current = offscreenCanvas.getContext('2d');

    const resizeCanvas = () => {
      CanvasUtils.setCanvasDimensions(canvas);
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
    };

    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasId, text, animate]);

  return null;
}

export default MultiWaveRing;