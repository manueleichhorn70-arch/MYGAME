import { useEffect, useRef, useState } from 'react';
import { GameEngine } from './game/Engine';
import { Dimension, GAME_WIDTH, GAME_HEIGHT, DIMENSIONS } from './game/constants';
import { GameUI } from './components/GameUI';
import { LEVELS } from './game/levels';
import { LevelEditor } from './components/LevelEditor';
import { Shop } from './components/Shop';
import { Edit3, Play, ChevronLeft, ChevronRight, ShoppingBag, Coins } from 'lucide-react';
import { SKINS, Skin } from './game/constants';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [activeDimension, setActiveDimension] = useState<Dimension>(Dimension.LUMEN);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [dynamicLevels, setDynamicLevels] = useState(LEVELS);

  // Economy & Skins persistence
  const [shards, setShards] = useState(() => Number(localStorage.getItem('shards') || '0'));
  const [unlockedSkins, setUnlockedSkins] = useState<string[]>(() => JSON.parse(localStorage.getItem('unlockedSkins') || '["default"]'));
  const [activeSkinId, setActiveSkinId] = useState(() => localStorage.getItem('activeSkinId') || 'default');

  // Reset helper for the user request
  useEffect(() => {
    if (localStorage.getItem('shards_reset_v3') !== 'true') {
      setShards(0);
      localStorage.setItem('shards', '0');
      localStorage.setItem('shards_reset_v3', 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shards', shards.toString());
    localStorage.setItem('unlockedSkins', JSON.stringify(unlockedSkins));
    localStorage.setItem('activeSkinId', activeSkinId);
    
    if (engineRef.current) {
      const skin = SKINS.find(s => s.id === activeSkinId) || SKINS[0];
      engineRef.current.setSkin(skin);
    }
  }, [shards, unlockedSkins, activeSkinId]);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new GameEngine(
        canvasRef.current,
        dynamicLevels[currentLevelIndex],
        (win) => {
          if (win && gameStatus === 'playing') {
            setShards(prev => prev + 25); // Increased Reward
          }
          setGameStatus(win ? 'won' : 'lost');
        },
        (dim) => setActiveDimension(dim)
      );
      
      // Init skin
      const skin = SKINS.find(s => s.id === activeSkinId) || SKINS[0];
      engineRef.current.setSkin(skin);
    }
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setLevel(dynamicLevels[currentLevelIndex]);
      setGameStatus('playing');
    }
  }, [currentLevelIndex, dynamicLevels]);

  const handleRestart = () => {
    setGameStatus('playing');
    if (engineRef.current) {
      engineRef.current.setLevel(dynamicLevels[currentLevelIndex]);
    }
  };

  const handleSaveLevel = (newLevel: any) => {
    const nextLevels = [...dynamicLevels];
    nextLevels[currentLevelIndex] = newLevel;
    setDynamicLevels(nextLevels);
  };

  const handlePurchase = (skin: Skin) => {
    if (skin.currency === 'shards') {
      if (shards >= skin.price) {
        setShards(prev => prev - skin.price);
        setUnlockedSkins(prev => [...prev, skin.id]);
      } else {
        alert("Not enough shards!");
      }
    } else {
      // Simulate real money purchase
      const confirmed = window.confirm(`Initiate secure transfer for ${skin.name}? ($${skin.price}.00 CAD)`);
      if (confirmed) {
        setUnlockedSkins(prev => [...prev, skin.id]);
      }
    }
  };

  const currentDim = DIMENSIONS[activeDimension];

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden font-sans selection:bg-white/20">
      {isShopOpen && (
        <Shop 
          shards={shards}
          unlockedSkins={unlockedSkins}
          activeSkinId={activeSkinId}
          onClose={() => setIsShopOpen(false)}
          onPurchase={handlePurchase}
          onSelect={(skin) => setActiveSkinId(skin.id)}
        />
      )}

      {/* Level Selector Overlay (Top) */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 shadow-2xl">
        <button 
          disabled={currentLevelIndex === 0}
          onClick={() => setCurrentLevelIndex(prev => prev - 1)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Sector</span>
          <span className="text-sm font-black italic tracking-widest">ECLIPSE_{String(currentLevelIndex + 1).padStart(3, '0')}</span>
        </div>
        <button 
          disabled={currentLevelIndex === dynamicLevels.length - 1}
          onClick={() => setCurrentLevelIndex(prev => prev + 1)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors disabled:opacity-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="w-px h-4 bg-white/10 mx-2" />
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsShopOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-lumen"
            title="Open Dimensional Vault"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
            title="Open Level Architect"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-4 bg-white/10 mx-2" />
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
          <Coins className="w-3 h-3 text-lumen" />
          <span className="text-[10px] font-black">{shards}</span>
        </div>
      </div>

      {isEditorOpen && (
        <LevelEditor 
          currentLevel={dynamicLevels[currentLevelIndex]} 
          onSave={handleSaveLevel} 
          onClose={() => setIsEditorOpen(false)} 
        />
      )}

      {/* Background Ambience Layers */}
      <div className="fixed inset-0 layer-grid opacity-10 pointer-events-none" />
      <div className="fixed inset-0 glitch-overlay pointer-events-none" />
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000 opacity-20"
        style={{
           background: `radial-gradient(circle at 70% 40%, ${currentDim.accent}33 0%, transparent 60%)`
        }}
      />

      <main className="relative flex flex-col items-center w-full max-w-[1024px] border-2 border-white/5 bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {/* Game Viewport Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-linear-to-b from-[#0a0a0c] to-[#15151a]">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="w-full h-full block transition-all duration-500"
            style={{ 
              filter: currentDim.filter,
            }}
          />
          
          <GameUI 
            activeDimension={activeDimension} 
            gameStatus={gameStatus}
            onRestart={handleRestart}
          />
        </div>

        {/* Cinematic System Status Bar */}
        <footer className="w-full h-[60px] bg-black flex items-center px-10 justify-between border-top border-white/10">
          <div className="text-[10px] letter-spacing-[0.3em] opacity-40 font-bold uppercase">
             System Status: <span className="text-emerald-500">Stable</span>
          </div>
          <div className="text-sm font-black italic tracking-[0.2em] uppercase">
             Shadow Shift <span style={{ color: currentDim.accent }}>Eclipse</span>
          </div>
          <div className="text-[10px] letter-spacing-[0.3em] opacity-40 font-bold uppercase">
             Ver: 0.8.4-Beta_Rift
          </div>
        </footer>
      </main>

      {/* Extreme Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
