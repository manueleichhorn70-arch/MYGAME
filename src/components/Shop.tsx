/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKINS, Skin } from '../game/constants';
import { ShoppingBag, X, Star, Coins, Check } from 'lucide-react';

interface ShopProps {
  shards: number;
  unlockedSkins: string[];
  activeSkinId: string;
  onClose: () => void;
  onPurchase: (skin: Skin) => void;
  onSelect: (skin: Skin) => void;
}

export const Shop: React.FC<ShopProps> = ({ shards, unlockedSkins, activeSkinId, onClose, onPurchase, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[110] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-8 pointer-events-auto"
    >
      <div className="w-full max-w-4xl bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-lumen/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-lumen" />
            </div>
            <div>
              <h2 className="text-xl font-black italic tracking-tighter">DIMENSIONAL_VAULT</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Customize your Rift entity</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Coins className="w-4 h-4 text-lumen" />
              <span className="text-sm font-black mono">{shards} SHARDS</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKINS.map((skin) => {
            const isUnlocked = unlockedSkins.includes(skin.id);
            const isActive = activeSkinId === skin.id;

            return (
              <motion.div
                key={skin.id}
                whileHover={{ y: -5 }}
                className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${
                  isActive ? 'bg-white/10 border-white/40' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
                onClick={() => isUnlocked ? onSelect(skin) : null}
              >
                {/* Skin Preview */}
                <div className="h-32 mb-6 rounded-xl bg-black/40 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />
                  <div 
                    className="w-10 h-16 rounded shadow-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: skin.color, boxShadow: `0 0 30px ${skin.glow}44` }}
                  >
                    <div className="w-2 h-2 bg-black/40 rounded-full absolute top-4 left-2" />
                    <div className="w-2 h-2 bg-black/40 rounded-full absolute top-4 right-2" />
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black italic tracking-tighter text-lg">{skin.name}</h3>
                  {skin.currency === 'premium' && <Star className="w-4 h-4 text-lumen fill-lumen" />}
                </div>
                
                <p className="text-white/40 text-xs font-medium mb-6 leading-relaxed">
                  {skin.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  {isUnlocked ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <Check className="w-4 h-4" />
                      {isActive ? 'Active' : 'Unlocked'}
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onPurchase(skin); }}
                      className="w-full py-2 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-lg hover:bg-lumen transition-all"
                    >
                      {skin.currency === 'shards' ? `Buy: ${skin.price} Shards` : `Buy: $${skin.price}.00`}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/40 border-t border-white/5 text-center">
           <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">
             New relics appearing every Eclipse cycle
           </p>
        </div>
      </div>
    </motion.div>
  );
};
