/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dimension, DIMENSIONS } from '../game/constants';
import { Sparkles, Moon, Zap, History, MoveRight } from 'lucide-react';

interface GameUIProps {
  activeDimension: Dimension;
  gameStatus: 'playing' | 'won' | 'lost';
  onRestart: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({ activeDimension, gameStatus, onRestart }) => {
  const currentDim = DIMENSIONS[activeDimension];

  return (
    <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
      {/* Top HUD: Vitals */}
      <div className="flex justify-between items-start">
        <div className="flex gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Vitality Core</div>
            <div className="w-60 h-3 bg-white/10 rounded-full border border-white/20 overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-linear-to-r from-[#ff4e50] to-[#f9d423] rounded-full"
                animate={{ width: gameStatus === 'playing' ? '85%' : '0%' }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Flux Capacity</div>
            <div className="w-60 h-3 bg-white/10 rounded-full border border-white/20 overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-linear-to-r from-flux to-[#70e1f5] rounded-full"
                animate={{ width: gameStatus === 'playing' ? '60%' : '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Narrative Box */}
        <AnimatePresence>
          {gameStatus === 'playing' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-1/3 bg-black/60 backdrop-blur-md border-l-4 p-5 shadow-2xl"
              style={{ borderColor: currentDim.accent }}
            >
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentDim.accent }} />
                Memory Fragment #042
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-medium">
                The bridge exists only in the mind of the Umbra. Shift your perspective to cross the Fractured Rift.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Layout for Side Info */}
      <div className="relative flex-1 flex items-end justify-between py-12">
        <div className="text-left">
           {/* Can add left-side elements here if needed */}
        </div>
        
        <div className="flex flex-col items-end gap-6 pr-4">
          <div className="w-48 h-28 bg-black/50 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 layer-grid opacity-20" />
            {/* Fake minimap lines */}
            <div className="absolute top-[65%] left-[20%] w-24 h-px bg-white/20" />
            <div className="absolute top-[45%] left-[60%] w-12 h-px bg-white/20" />
            <div className="absolute top-[60%] left-[45%] w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentDim.accent }} />
            <div className="absolute top-[60%] left-[45%] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentDim.accent }} />
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Fractured Forest [B4]</div>
            <div className="text-lg font-black tracking-tighter mt-1 italic">LOCATE THE VEIL</div>
          </div>
        </div>
      </div>

      {/* Bottom HUD: Dimension Selector */}
      <div className="flex justify-center items-center gap-4 py-4">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-3 flex gap-4 shadow-2xl pointer-events-auto">
          {[
            { id: Dimension.LUMEN, label: 'LMN' },
            { id: Dimension.UMBRA, label: 'UMB' },
            { id: Dimension.FLUX, label: 'FLX' },
            { id: Dimension.ECHO, label: 'ECH' }
          ].map((dim) => (
            <motion.div
              key={dim.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-[10px] font-black cursor-pointer transition-all duration-300 border-2 ${
                activeDimension === dim.id 
                ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'border-transparent opacity-50'
              }`}
              style={{ 
                backgroundColor: DIMENSIONS[dim.id].accent, 
                color: dim.id === Dimension.LUMEN || dim.id === Dimension.ECHO ? '#000' : '#fff' 
              }}
            >
              {dim.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Over Screen */}
      <AnimatePresence>
        {gameStatus !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-12 pointer-events-auto backdrop-blur-2xl z-50"
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-8xl font-black italic tracking-tighter mb-4 ${
                 gameStatus === 'won' ? 'text-lumen' : 'text-red-500'
              }`}
            >
              {gameStatus === 'won' ? 'ECLIPSE REPAIRED' : 'REALITY COLLAPSED'}
            </motion.h1>
            <p className="text-white/40 text-xl mb-12 max-w-lg text-center font-medium tracking-tight">
               {gameStatus === 'won' 
                 ? "The core has been stabilized. The dimensions are merging into a new reality." 
                 : "Dimensional feedback was catastrophic. The timeline has been severed."
               }
            </p>
            <button
               onClick={onRestart}
               className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-lumen transition-all duration-300 transform active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                REINITIALIZE SEQUENCE
                <MoveRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

