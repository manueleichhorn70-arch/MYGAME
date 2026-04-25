/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dimension, GAME_WIDTH, GAME_HEIGHT, DIMENSIONS, TILE_SIZE, Skin } from './constants';
import { Player } from './Player';
import { World, LevelData } from './World';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private world: World;
  private dimension: Dimension = Dimension.LUMEN;
  private lastTime: number = 0;
  private keys: Record<string, boolean> = {};
  private onGameOver: (win: boolean) => void;
  private onDimensionChange: (dim: Dimension) => void;
  private isGameOver: boolean = false;

  private particles: { x: number, y: number, vx: number, vy: number, life: number, color: string, size: number }[] = [];

  constructor(canvas: HTMLCanvasElement, initialLevel: LevelData, onGameOver: (win: boolean) => void, onDimensionChange: (dim: Dimension) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!; // Optimization
    this.player = new Player(100, 200);
    this.world = new World(initialLevel);
    this.onGameOver = onGameOver;
    this.onDimensionChange = onDimensionChange;

    window.addEventListener('keydown', (e) => this.handleInput(e, true));
    window.addEventListener('keyup', (e) => this.handleInput(e, false));
    this.requestFrame();
  }

  public setLevel(data: LevelData) {
    this.world = new World(data);
    this.player.pos = { x: 100, y: 100 };
    this.player.vel = { x: 0, y: 0 };
    this.dimension = Dimension.LUMEN;
    this.player.dimension = Dimension.LUMEN;
    this.isGameOver = false;
    this.onDimensionChange(Dimension.LUMEN);
  }

  public setSkin(skin: Skin) {
    this.player.skin = skin;
    this.createShiftBurst(); 
  }

  private handleInput(e: KeyboardEvent, isDown: boolean) {
    this.keys[e.code] = isDown;
    
    if (isDown) {
      if (e.code === 'Digit1') this.switchDimension(Dimension.LUMEN);
      if (e.code === 'Digit2') this.switchDimension(Dimension.UMBRA);
      if (e.code === 'Digit3') this.switchDimension(Dimension.FLUX);
      if (e.code === 'Digit4') this.switchDimension(Dimension.ECHO);
    }
  }

  private switchDimension(dim: Dimension) {
    if (this.dimension === dim) return;
    this.dimension = dim;
    this.player.dimension = dim;
    this.onDimensionChange(dim);
    this.createShiftBurst();
  }

  private createShiftBurst() {
    const dimAccent = DIMENSIONS[this.dimension].accent;
    for (let i = 0; i < 40; i++) {
       this.particles.push({
          x: this.player.pos.x + this.player.width / 2,
          y: this.player.pos.y + this.player.height / 2,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          life: 1.0,
          color: dimAccent,
          size: Math.random() * 3 + 1
       });
    }
  }

  private requestFrame() {
    requestAnimationFrame((t) => this.loop(t));
  }

  private loop(time: number) {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(dt);
    this.draw();

    this.requestFrame();
  }

  private update(dt: number) {
    this.player.update({
      left: this.keys['ArrowLeft'] || this.keys['KeyA'],
      right: this.keys['ArrowRight'] || this.keys['KeyD'],
      jump: this.keys['Space'] || this.keys['ArrowUp'] || this.keys['KeyW'],
    }, this.world);

    // Update particles
    for(let i = this.particles.length-1; i>=0; i--) {
       const p = this.particles[i];
       p.x += p.vx;
       p.y += p.vy;
       p.life -= 0.02;
       p.vx *= 0.98;
       p.vy *= 0.98;
       if(p.life <= 0) this.particles.splice(i, 1);
    }

    // Movement trail
    if (Math.abs(this.player.vel.x) > 0.1) {
       this.particles.push({
          x: this.player.pos.x + Math.random() * this.player.width,
          y: this.player.pos.y + Math.random() * this.player.height,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          life: 0.4,
          color: this.player.skin.glow,
          size: 1.5
       });
    }

    // Goal check
    if (!this.isGameOver) {
      const goal = this.world.getGoal();
      const dist = Math.sqrt(Math.pow(this.player.pos.x - goal.x, 2) + Math.pow(this.player.pos.y - goal.y, 2));
      if (dist < 40) {
        this.isGameOver = true;
        this.onGameOver(true);
      }
    }
  }

  private draw() {
    const dim = DIMENSIONS[this.dimension];
    
    // 1. CLEAR & BACKGROUND GRADIENT
    // Cinematic Vignette Background for depth
    const skyGrad = this.ctx.createRadialGradient(
      GAME_WIDTH / 2, GAME_HEIGHT / 2, 0,
      GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH / 0.8
    );
    skyGrad.addColorStop(0, '#0a0a0c');
    skyGrad.addColorStop(1, '#050505');
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 2. PARALLAX GRID LAYER
    this.ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
    this.ctx.lineWidth = 1;
    const gridOffset = (Date.now() / 50) % 60;
    for(let i = -60; i < GAME_WIDTH + 60; i += 60) {
       this.ctx.beginPath();
       this.ctx.moveTo(i + (this.player.pos.x * 0.05 % 60), 0);
       this.ctx.lineTo(i + (this.player.pos.x * 0.05 % 60), GAME_HEIGHT);
       this.ctx.stroke();
    }

    // 3. WORLD TRANSITIONS & TILES
    const tiles = this.world.getTiles();
    tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 0) return;
        
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;
        
        let isSolid = false;
        if (tile === 1) isSolid = true;
        if (tile === 2 && this.dimension === Dimension.UMBRA) isSolid = true;
        if (tile === 3 && this.dimension === Dimension.FLUX) isSolid = true;
        if (tile === 4 && this.dimension === Dimension.ECHO) isSolid = true;

        if (isSolid) {
            // Glowing Block Concept
            const blockColor = tile === 1 ? '#1a1a2e' : dim.accent;
            
            this.ctx.save();
            this.ctx.fillStyle = blockColor;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = blockColor;
            
            this.ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
            
            // Bevel/Highlight
            this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(px+2, py+TILE_SIZE-2);
            this.ctx.lineTo(px+2, py+2);
            this.ctx.lineTo(px+TILE_SIZE-2, py+2);
            this.ctx.stroke();
            this.ctx.restore();
        } else {
            // Ghostly Wireframe for inactive dimensions
            const ghostColor = tile === 1 ? '#334155' : DIMENSIONS[Object.values(Dimension)[tile-1]].accent;
            this.ctx.strokeStyle = ghostColor;
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = 0.15;
            this.ctx.setLineDash([4, 4]);
            this.ctx.strokeRect(px + 6, py + 6, TILE_SIZE - 12, TILE_SIZE - 12);
            this.ctx.setLineDash([]);
            this.ctx.globalAlpha = 1.0;
        }
      });
    });

    // 4. PARTICLES
    this.particles.forEach(p => {
       this.ctx.fillStyle = p.color;
       this.ctx.globalAlpha = p.life;
       this.ctx.beginPath();
       this.ctx.arc(p.x, p.y, p.size || 2, 0, Math.PI * 2);
       this.ctx.fill();
    });
    this.ctx.globalAlpha = 1.0;

    // 5. THE GOAL (CINEMATIC HALO)
    const goal = this.world.getGoal();
    const t = Date.now() / 1000;
    
    // Inner Core
    this.ctx.save();
    this.ctx.shadowBlur = 30;
    this.ctx.shadowColor = '#00f2ff';
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(goal.x, goal.y, 12, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();

    // Orbital Rings
    this.ctx.strokeStyle = '#00f2ff';
    this.ctx.setLineDash([10, 20]);
    this.ctx.lineWidth = 2;
    for(let i=0; i<3; i++) {
        this.ctx.beginPath();
        this.ctx.arc(goal.x, goal.y, 25 + i*10, t * (i+1), t * (i+1) + Math.PI * 1.5);
        this.ctx.stroke();
    }
    this.ctx.setLineDash([]);

    // 6. PLAYER RENDERING (THE ENTITY)
    const pX = this.player.pos.x;
    const pY = this.player.pos.y;
    const pW = this.player.width;
    const pH = this.player.height;

    // Entity Aura
    this.ctx.save();
    this.ctx.shadowBlur = 40;
    this.ctx.shadowColor = this.player.skin.glow;
    this.ctx.fillStyle = this.player.skin.color;
    this.ctx.fillRect(pX, pY, pW, pH);
    this.ctx.restore();

    // Inner Core Detail
    this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
    this.ctx.fillRect(pX + 4, pY + 4, pW - 8, pH - 8);
    
    // Eyes (Expressive)
    const eyeBlink = Math.sin(t * 10) > 0.98 ? 0 : 1;
    this.ctx.fillStyle = this.player.skin.id === 'void' ? '#fff' : '#000';
    this.ctx.fillRect(pX + 6, pY + 12, 4, 4 * eyeBlink);
    this.ctx.fillRect(pX + pW - 10, pY + 12, 4, 4 * eyeBlink);
  }
}
