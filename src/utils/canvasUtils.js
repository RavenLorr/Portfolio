import { PointerParticle } from '../components/PointerParticle.jsx';

export class CanvasUtils {
    static setCanvasDimensions(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    static createParticles(count, speed, spread, ctx, pointer, scalingFactor) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new PointerParticle(spread, speed, { ctx, pointer }, scalingFactor));
        }
        return particles;
    }

    static handleParticles(particles) {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            if (particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    static getPointerVelocity(event) {
        const a = event.movementX;
        const b = event.movementY;
        return Math.floor(Math.sqrt(a * a + b * b));
    }

    static calculateBaseRadiusAndCenter(canvas) {
        const referenceWidth = 1920;
        const referenceHeight = 1080;

        const widthScalingFactor = canvas.width / referenceWidth;
        const heightScalingFactor = canvas.height / referenceHeight;
        const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

        // Calculate base radius as 30% of the smaller dimension, scaled
        const smallerDimension = Math.min(canvas.width, canvas.height);
        const baseRadius = smallerDimension * 0.30;

        const ringCenterX = canvas.width / 2;
        const ringCenterY = canvas.height / 2;

        return { baseRadius, ringCenterX, ringCenterY, scalingFactor };
    }

    static resizeCanvas(canvas, offscreenCanvas) {
        this.setCanvasDimensions(canvas);
        if (offscreenCanvas) {
            this.setCanvasDimensions(offscreenCanvas);
        }
    }

    static createCircularParticles(particlesRef, ParticleClass, baseRadius, ringCenterX, ringCenterY, numberParticlesStart) {
        const adjustedBaseRadius = baseRadius * 0.7;
        for (let i = 0; i < numberParticlesStart; i++) {
            const angle = Math.random() * 360;
            particlesRef.current.push(new ParticleClass(
                ringCenterX + (Math.cos(angle) * adjustedBaseRadius),
                ringCenterY - (Math.sin(angle) * adjustedBaseRadius),
            ));
        }
    }

    static Particle = class {
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
                const distanceToCenter = Math.sqrt(Math.pow(this.x - this.centerX, 2) + Math.pow(this.y - this.centerY, 2));
                if (distanceToCenter < 50) {
                    this.life = Math.min(this.life, distanceToCenter);
                }
            } else {
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
    };
}