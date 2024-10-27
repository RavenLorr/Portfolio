export class Particle {
  constructor(options = {}) {
    // Common properties
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.size = options.size || 1;

    // Context and styling
    this.ctx = options.ctx;
    this.color = options.color || 'rgba(255, 255, 255, 1)';

    // Type-specific initialization
    if (options.type === 'pointer') {
      this.initPointerParticle(options);
    } else if (options.type === 'ring') {
      this.initRingParticle(options);
    }
  }

  // Pointer particle initialization
  initPointerParticle({ spread, speed, pointer, scalingFactor }) {
    this.x = pointer.x;
    this.y = pointer.y;
    this.mx = pointer.mx * 0.1;
    this.my = pointer.my * 0.1;
    this.size = (Math.random() + 1) * scalingFactor;
    this.decay = 0.01;
    this.speed = speed * 0.08;
    this.spread = spread * this.speed;
    this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
    this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
  }

  // Ring particle initialization
  initRingParticle({ speed, direction, life, inward, centerX, centerY }) {
    this.speed = speed;
    this.direction = direction;
    this.life = life;
    this.maxLife = life;
    this.inward = inward;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  // Common drawing method
  draw() {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    if (this.life !== undefined) {
      // Ring particle opacity
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.life / this.maxLife * 0.5})`;
    } else {
      // Pointer particle color
      this.ctx.fillStyle = this.color;
    }

    this.ctx.fill();
  }

  // Pointer particle specific updates
  updatePointer() {
    this.x += this.spreadX * this.size;
    this.y += this.spreadY * this.size;
    this.size -= this.decay;
    this.draw();
  }

  // Ring particle specific updates
  updateRing(width, height) {
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

    this.draw();
  }

  // Main update method
  update(width, height) {
    if (this.life !== undefined) {
      // Ring particle behavior
      this.updateRing(width, height);
      return this.life > 0;
    } else {
      // Pointer particle behavior
      this.updatePointer();
      return this.size > 0.1;
    }
  }

  // Static factory methods
  static createPointerParticle(spread, speed, component, scalingFactor) {
    return new Particle({
      type: 'pointer',
      spread,
      speed,
      pointer: component.pointer,
      ctx: component.ctx,
      scalingFactor
    });
  }

  static createRingParticle(x, y, size, speed, direction, life, inward, centerX, centerY) {
    return new Particle({
      type: 'ring',
      x,
      y,
      size,
      speed,
      direction,
      life,
      inward,
      centerX,
      centerY
    });
  }
}