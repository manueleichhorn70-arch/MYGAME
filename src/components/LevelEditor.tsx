/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Dimension, DIMENSIONS, TILE_SIZE, GAME_WIDTH, GAME_HEIGHT } from '../game/constants';
import { LevelData } from '../game/World';
import { Save, Trash2, MousePointer2, Flag, Box, Play } from 'lucide-react';

interface LevelEditorProps {
  currentLevel: LevelData;
  onSave: (level: LevelData) => void;
  onClose: () => void;
}

export const LevelEditor: React.FC<LevelEditorProps> = ({ currentLevel, onSave, onClose }) => {
  const [level, setLevel] = useState<LevelData>(JSON.parse(JSON.stringify(currentLevel)));
  const [selectedTool, setSelectedTool] = useState<'tile' | 'goal'>('tile');
  const [selectedTileType, setSelectedTileType] = useState<number>(1);

  const handleTileClick = (x: number, y: number) => {
    const newLevel = { ...level };
    if (selectedTool === 'tile') {
      newLevel.tiles[y][x] = newLevel.tiles[y][x] === selectedTileType ? 0 : selectedTileType;
    } else {
      newLevel.goal = { x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2 };
    }
    setLevel(newLevel);
  };

  const exportLevel = () => {
    console.log(JSON.stringify(level));
    onSave(level);
  };

  return (
    <div className="absolute inset-0 bg-[#050505] flex flex-col z-[100] pointer-events-auto">
      {/* Editor Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black">
        <div className="flex items-center gap-6">
          <div className="text-sm font-black italic tracking-widest text-[#f2b705]">ARCHITECT_PROTOCOL</div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((type) => (
              <button
                key={type}
                onClick={() => { setSelectedTool('tile'); setSelectedTileType(type); }}
                className={`w-8 h-8 rounded border transition-all ${
                  selectedTool === 'tile' && selectedTileType === type 
                  ? 'border-white scale-110 shadow-lg' 
                  : 'border-white/10 opacity-40'
                }`}
                style={{ backgroundColor: type === 1 ? '#334155' : DIMENSIONS[Object.values(Dimension)[type-1]].accent }}
              />
            ))}
            <button
               onClick={() => setSelectedTool('goal')}
               className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${
                 selectedTool === 'goal' ? 'border-white scale-110' : 'border-white/10 opacity-40'
               }`}
            >
              <Flag className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={exportLevel}
             className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-500/30 transition-all"
           >
             <Save className="w-4 h-4" /> SAVE DATA
           </button>
           <button 
             onClick={onClose}
             className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#f2b705] transition-all"
           >
             <Play className="w-4 h-4" /> TEST REALITY
           </button>
        </div>
      </div>

      {/* Editor Canvas Area */}
      <div className="flex-1 overflow-auto bg-[#0a0a0c] p-12 flex items-center justify-center relative">
        <div 
          className="relative bg-black shadow-2xl border border-white/5"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          <div className="absolute inset-0 layer-grid opacity-20 pointer-events-none" />
          
          <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${level.tiles[0].length}, 1fr)` }}>
            {level.tiles.map((row, y) => (
              row.map((tile, x) => (
                <div
                  key={`${x}-${y}`}
                  onClick={() => handleTileClick(x, y)}
                  className="w-full h-full border border-white/5 cursor-crosshair hover:bg-white/5 transition-colors flex items-center justify-center group"
                >
                  {tile !== 0 && (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        backgroundColor: tile === 1 ? '#334155' : DIMENSIONS[Object.values(Dimension)[tile-1]].accent,
                        opacity: 0.8
                      }}
                    />
                  )}
                </div>
              ))
            ))}
          </div>

          {/* Goal Marker */}
          <div 
            className="absolute w-8 h-8 pointer-events-none flex items-center justify-center"
            style={{ left: level.goal.x - 16, top: level.goal.y - 16 }}
          >
            <Flag className="w-6 h-6 text-emerald-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="h-10 bg-black border-t border-white/10 px-6 flex items-center justify-between">
        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest flex gap-4">
           <span>Cursor: {selectedTool === 'tile' ? `Tile (Type ${selectedTileType})` : 'Goal'}</span>
           <span>Dimensions: {level.tiles[0].length} × {level.tiles.length}</span>
        </div>
        <div className="flex gap-4 opacity-40">
           <MousePointer2 className="w-3 h-3 text-white" />
           <Box className="w-3 h-3 text-white" />
        </div>
      </div>
    </div>
  );
};
