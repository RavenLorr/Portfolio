import React, { useEffect, useRef } from 'react';

import { CanvasUtils } from '@/utils/canvasUtils.js';

const FlowerShoots = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);

    const numberParticlesStart = Math.min(Math.max(Math.floor(1000 * scalingFactor), 400), 2000);
    const particleSpeed = Math.min(Math.max(0.3 * scalingFactor, 0.1), 0.6);
    const velocity = 0.9;
    const dampingDuration = Math.min(Math.max(30000 * scalingFactor, 12000), 60000);

    const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

    function Particle(x, y) {
      const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
      this.x = x;
      this.y = y;
      this.vel = {
        x: (getRandomFloat(-20, 20) / 100) * scalingFactor,
        y: (getRandomFloat(-20, 20) / 100) * scalingFactor,
        min: getRandomFloat(2, 10) * scalingFactor,

        max: (getRandomFloat(10, 100) / 10) * scalingFactor,
      };
      this.color = 'rgba(213, 163, 71, 0.05)';
    }

    Particle.prototype.render = function () {
      const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, Math.max(0.5, Math.min(scalingFactor, 2)), 0, Math.PI * 2);
      context.fill();
    };

    Particle.prototype.update = function (dampingFactor) {
      const { scalingFactor } = CanvasUtils.calculateBaseRadiusAndCenter(canvas);
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

      this.x += this.vel.x * particleSpeed * dampingFactor * scalingFactor;
      this.y += this.vel.y * particleSpeed * dampingFactor * scalingFactor;

      if (Math.abs(this.vel.x) > this.vel.min) {
        this.vel.x *= velocity;
      }
      if (Math.abs(this.vel.y) > this.vel.min) {
        this.vel.y *= velocity;
      }

      this.testBorder();
    };

    Particle.prototype.testBorder = function () {
      if (this.x > canvas.width) {
        this.setPosition(this.x, 'x');
      } else if (this.x < 0) {
        this.setPosition(0, 'x');
      }
      if (this.y > canvas.height) {
        this.setPosition(this.y, 'y');
      } else if (this.y < 0) {
        this.setPosition(0, 'y');
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
      let dampingFactor = Math.max(0, 1 - elapsedTime / dampingDuration);

      if (canvas.width > 2560 && canvas.height > 1440) {
        if (animationFrameRef.current % 2 !== 0) {
          animationRef.current = requestAnimationFrame(loop);
          animationFrameRef.current++;
          return;
        }

        const randomValue = Math.random();
        if (randomValue < 0.25) {
          dampingFactor *= 0.25;
        } else if (randomValue < 0.5) {
          dampingFactor *= 0.5;
        } else if (randomValue < 0.75) {
          dampingFactor *= 0.75;
        }
      }

      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(dampingFactor);
        particlesRef.current[i].render();
      }

      animationRef.current = requestAnimationFrame(loop);
      animationFrameRef.current++;
    }

    function init() {
      CanvasUtils.setCanvasDimensions(canvas);
      const { baseRadius, ringCenterX, ringCenterY, scalingFactor } =
        CanvasUtils.calculateBaseRadiusAndCenter(canvas);
      const numberParticlesStart = Math.max(Math.floor(1000 * scalingFactor), 400);
      CanvasUtils.createCircularParticles(
        particlesRef,
        Particle,
        baseRadius,
        ringCenterX,
        ringCenterY,
        numberParticlesStart
      );
      animationFrameRef.current = 0;
    }

    init();
    window.onresize = () => {
      CanvasUtils.resizeCanvas(canvas);
      particlesRef.current = [];
      context.clearRect(0, 0, canvas.width, canvas.height);
      startTimeRef.current = Date.now();
      const { baseRadius, ringCenterX, ringCenterY } =
        CanvasUtils.calculateBaseRadiusAndCenter(canvas);
      CanvasUtils.createCircularParticles(
        particlesRef,
        Particle,
        baseRadius,
        ringCenterX,
        ringCenterY,
        numberParticlesStart
      );
    };

    loop();

    return () => {
      window.removeEventListener('resize', () => {});
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[1]" />;
};

export default FlowerShoots;
