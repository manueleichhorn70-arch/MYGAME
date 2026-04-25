/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelData } from './World';
import { Dimension } from './constants';

export const LEVELS: LevelData[] = [
  {
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    enemies: [],
    goal: { x: 740, y: 300 }
  },
  {
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    enemies: [],
    goal: { x: 740, y: 250 }
  },
  { // Level 3
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,3,3,3,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
      [1,0,2,2,2,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    enemies: [],
    goal: { x: 740, y: 300 }
  },
  { // Level 4
    tiles: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,4,4,4,0,0,0,0,0,4,4,4,0,0,0,0,0,4,4,4,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,0,0,2,2,2,0,0,0,0,1,1,1,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    enemies: [],
    goal: { x: 740, y: 300 }
  },
  // Adding more levels dynamically to fulfill the 20 level request...
  // For brevity and clarity, I will generate structured patterns for levels 5-22.
  ...Array.from({ length: 18 }, (_, idx) => {
    const levelNum = idx + 5;
    const difficulty = levelNum / 22;
    
    // Create a procedural but playable level structure
    const tiles = Array(13).fill(0).map(() => Array(25).fill(0));
    
    // Bounds
    for(let i=0; i<25; i++) { tiles[0][i] = 1; tiles[11][i] = 1; tiles[12][i] = 1; }
    for(let i=0; i<13; i++) { tiles[i][0] = 1; tiles[i][24] = 1; }
    
    // Start platform
    tiles[9][1] = 1; tiles[9][2] = 1;

    // Generate platforms based on levelNum
    for(let x = 4; x < 23; x += 5) {
      // Height variance increases with level
      const amplitude = 1 + (levelNum / 5);
      const y = Math.max(2, Math.min(10, (6 + Math.sin(x * 0.8 + levelNum) * amplitude) | 0));
      
      // Platforms get narrower as level increases
      const baseWidth = Math.max(1, 4 - Math.floor(levelNum / 6));
      const width = baseWidth + (Math.random() > 0.5 ? 1 : 0);
      
      // Dimension focus rotates
      const type = ((x + levelNum) % 4) + 1; 

      for(let w=0; w<width; w++) {
        if(x+w < 24 && y < 11) {
          // Checkerboard dimensional requirements for later levels
          if (levelNum > 8 && w % 2 === 0) {
            tiles[y][x+w] = ((type % 4) + 1); 
          } else {
            tiles[y][x+w] = type;
          }
        }
      }
    }

    // Add "Void Sections" - remove floor segments
    if (levelNum > 6) {
      const gapStart = 8 + (levelNum % 10);
      const gapWidth = Math.min(6, 2 + Math.floor(levelNum / 6));
      for(let gx = gapStart; gx < gapStart + gapWidth && gx < 23; gx++) {
        tiles[11][gx] = 0;
        tiles[12][gx] = 0;
      }
    }

    // Add random floating hazards/pathways
    if (levelNum > 12) {
      for(let i=0; i < Math.floor(levelNum / 4); i++) {
        const rx = 4 + (Math.random() * 18) | 0;
        const ry = 2 + (Math.random() * 4) | 0;
        tiles[ry][rx] = (Math.random() * 3 + 2) | 0;
      }
    }

    return {
      tiles,
      enemies: [],
      goal: { x: 740, y: 150 + (Math.random() * 200) | 0 }
    };
  }),
  // 100 NEW CHALLENGE LEVELS
  ...Array.from({ length: 100 }, (_, idx) => {
    const levelNum = idx + 23;
    const tiles = Array(13).fill(0).map(() => Array(25).fill(0));
    
    // Harder boundaries: Gaps in floors are standard now
    for(let i=0; i<25; i++) { 
       if (i < 5 || i > 20 || (i + levelNum) % 7 !== 0) {
         tiles[11][i] = 1; tiles[12][i] = 1; 
       }
       tiles[0][i] = 1;
    }
    for(let i=0; i<13; i++) { tiles[i][0] = 1; tiles[i][24] = 1; }
    
    // Start platform
    tiles[9][1] = 1; tiles[9][2] = 1;

    // Advanced Matrix Generation
    for(let x = 6; x < 23; x += 4) {
      const complexY = Math.max(3, Math.min(10, (5 + Math.cos(x * 1.2 + levelNum) * 4) | 0));
      const skinType = ((x * levelNum) % 4) + 1;
      
      // Smaller, trickier platforms
      tiles[complexY][x] = skinType;
      if (levelNum < 50) tiles[complexY][x+1] = skinType;
      
      // Vertical obstacles
      if (levelNum > 40 && x % 8 === 0) {
         tiles[complexY-1][x] = (skinType % 4) + 1;
         tiles[complexY-2][x] = (skinType % 4) + 1;
      }
    }

    return {
      tiles,
      enemies: [],
      goal: { x: 740, y: 300 }
    };
  })
];
