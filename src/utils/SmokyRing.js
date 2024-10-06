import React, { useEffect } from 'react';

function SmokyRing({ canvasId, text = "RavenLorr" }) {
    useEffect(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas with id ${canvasId} not found`);
            return;
        }
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ringRadius = Math.min(canvas.width, canvas.height) * 0.4;
        const ringCenterX = canvas.width / 2;
        const ringCenterY = canvas.height / 2;

        const PI = Math.PI;
        const PI_HALF = PI / 2;
        const cos = Math.cos;
        const sin = Math.sin;
        const random = Math.random;
        const C = ["#ABF8FF", "#E76B76", "#1D2439", "#4F3762", "#67F9FF", "#0C0F18", "#D5A347"];
        const particles = [];
        const particleCount = 80;

        class Particle {
            constructor(radius, distance, speed, color) {
                this.a = PI / 180;
                this.d = distance;
                this.x = ringCenterX + radius * cos(this.a);
                this.y = ringCenterY + radius * sin(this.a);
                this.c = color;
                this.r = (random() * 8);
                this.R = random() > 0.5 ? radius : radius - 5;
                this.s = speed;
                this.pos = random() * 360;
            }

            update() {
                this.x = ringCenterX + this.R * sin(PI_HALF + this.pos);
                this.y = ringCenterY + this.R * cos(PI_HALF + this.pos);
                this.pos += this.s;
            }

            draw() {
                ctx.beginPath();
                ctx.globalAlpha = 1.0; // Set opacity to 100%
                ctx.globalCompositeOperation = "lighter";
                ctx.fillStyle = this.c;
                ctx.arc(this.x, this.y, this.r, PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            const radius = ringRadius;
            const distance = 80;
            const speed = random() / 600;
            const color = C[Math.floor(random() * C.length)];
            particles.push(new Particle(radius, distance, speed, color));
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw smoky ring
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Draw glowing outline
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 3;
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(ringCenterX, ringCenterY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Write text
            ctx.font = "bold 60px 'Space Game'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 20);
        }

        animate();
    }, [canvasId, text]);

    return null;
}

export default SmokyRing;