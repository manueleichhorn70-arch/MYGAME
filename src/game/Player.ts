/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dimension, Vector2D, TILE_SIZE, Skin, SKINS } from './constants';
import { World } from './World';

export class Player {
  pos: Vector2D;
  vel: Vector2D;
  width: number = 24;
  height: number = 40;
  grounded: boolean = false;
  dimension: Dimension = Dimension.LUMEN;
  health: number = 100;
  skin: Skin = SKINS[0];
  
  private speed: number = 4;
  private jumpForce: number = 10;
  private gravity: number = 0.5;

  constructor(x: number, y: number) {
    this.pos = { x, y };
    this.vel = { x: 0, y: 0 };
  }

  update(input: { left: boolean; right: boolean; jump: boolean }, world: World) {
    // Horizontal movement
    if (input.left) {
      this.vel.x = -this.speed;
    } else if (input.right) {
      this.vel.x = this.speed;
    } else {
      this.vel.x *= 0.8; // Friction
    }

    // Apply gravity
    this.vel.y += this.gravity;

    // Jump
    if (input.jump && this.grounded) {
      this.vel.y = -this.jumpForce;
      this.grounded = false;
    }

    // Physics
    this.moveX(this.vel.x, world);
    this.moveY(this.vel.y, world);
    
    // Bounds check
    if (this.pos.y > 1000) { // Fell off
       this.health -= 10;
       this.pos = { x: 100, y: 100 };
       this.vel = { x: 0, y: 0 };
    }
  }

  private moveX(dx: number, world: World) {
    this.pos.x += dx;
    if (dx > 0) {
      if (this.checkCollision(world, 'right')) {
        this.pos.x = Math.floor((this.pos.x + this.width) / TILE_SIZE) * TILE_SIZE - this.width - 1;
        this.vel.x = 0;
      }
    } else if (dx < 0) {
      if (this.checkCollision(world, 'left')) {
        this.pos.x = Math.ceil(this.pos.x / TILE_SIZE) * TILE_SIZE + 1;
        this.vel.x = 0;
      }
    }
  }

  private moveY(dy: number, world: World) {
    this.pos.y += dy;
    this.grounded = false;
    if (dy > 0) {
      if (this.checkCollision(world, 'bottom')) {
        this.pos.y = Math.floor((this.pos.y + this.height) / TILE_SIZE) * TILE_SIZE - this.height - 1;
        this.vel.y = 0;
        this.grounded = true;
      }
    } else if (dy < 0) {
      if (this.checkCollision(world, 'top')) {
        this.pos.y = Math.ceil(this.pos.y / TILE_SIZE) * TILE_SIZE + 1;
        this.vel.y = 0;
      }
    }
  }

  private checkCollision(world: World, side: 'top' | 'bottom' | 'left' | 'right'): boolean {
    const margin = 2;
    const points: Vector2D[] = [];

    if (side === 'top') {
      points.push({ x: this.pos.x + margin, y: this.pos.y });
      points.push({ x: this.pos.x + this.width - margin, y: this.pos.y });
    } else if (side === 'bottom') {
      points.push({ x: this.pos.x + margin, y: this.pos.y + this.height });
      points.push({ x: this.pos.x + this.width - margin, y: this.pos.y + this.height });
    } else if (side === 'left') {
      points.push({ x: this.pos.x, y: this.pos.y + margin });
      points.push({ x: this.pos.x, y: this.pos.y + this.height - margin });
    } else if (side === 'right') {
      points.push({ x: this.pos.x + this.width, y: this.pos.y + margin });
      points.push({ x: this.pos.x + this.width, y: this.pos.y + this.height - margin });
    }

    return points.some(p => world.isSolid(p.x, p.y, this.dimension));
  }
}
