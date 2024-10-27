export class Particle {
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
}