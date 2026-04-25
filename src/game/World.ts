/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dimension, TILE_SIZE, Vector2D } from './constants';

export interface LevelData {
  tiles: number[][]; // 0 = empty, 1 = solid in Lumen, 2 = solid in Umbra, 3 = solid in Flux, 4 = solid in Echo
  enemies: { type: string; pos: Vector2D; dimension: Dimension }[];
  goal: Vector2D;
}

export class World {
  private data: LevelData;

  constructor(data: LevelData) {
    this.data = data;
  }

  isSolid(x: number, y: number, dimension: Dimension): boolean {
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);

    if (tileX < 0 || tileX >= this.data.tiles[0].length || tileY < 0 || tileY >= this.data.tiles.length) {
      return true;
    }

    const tile = this.data.tiles[tileY][tileX];
    
    // Logic for dimension specific solids
    if (tile === 1) return true; // Always solid (Lumen base)
    if (tile === 2 && dimension === Dimension.UMBRA) return true;
    if (tile === 3 && dimension === Dimension.FLUX) return true;
    if (tile === 4 && dimension === Dimension.ECHO) return true;

    return false;
  }

  getTiles() {
    return this.data.tiles;
  }

  getGoal() {
    return this.data.goal;
  }
}
