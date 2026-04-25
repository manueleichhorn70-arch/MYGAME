/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Dimension {
  LUMEN = 'LUMEN',
  UMBRA = 'UMBRA',
  FLUX = 'FLUX',
  ECHO = 'ECHO',
}

export interface DimensionState {
  id: Dimension;
  name: string;
  color: string;
  accent: string;
  filter: string;
  description: string;
}

export const DIMENSIONS: Record<Dimension, DimensionState> = {
  [Dimension.LUMEN]: {
    id: Dimension.LUMEN,
    name: 'Lumen',
    color: '#050505',
    accent: '#f2b705',
    filter: 'brightness(1.1) contrast(1.1)',
    description: 'The Light World. Stable and visible.',
  },
  [Dimension.UMBRA]: {
    id: Dimension.UMBRA,
    name: 'Umbra',
    color: '#0a0a0c',
    accent: '#7d44b1',
    filter: 'brightness(0.7) contrast(1.3) saturate(0.9)',
    description: 'The Shadow World. Hidden paths and organic danger.',
  },
  [Dimension.FLUX]: {
    id: Dimension.FLUX,
    name: 'Flux',
    color: '#050505',
    accent: '#00f2ff',
    filter: 'hue-rotate(180deg) brightness(1.0) contrast(1.2)',
    description: 'The Energy World. Time-distorted and unstable.',
  },
  [Dimension.ECHO]: {
    id: Dimension.ECHO,
    name: 'Echo',
    color: '#0f0f0f',
    accent: '#e0e0e0',
    filter: 'grayscale(0.6) opacity(0.9) contrast(1.1)',
    description: 'The Memory World. Fragments and echoes of the past.',
  },
};

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 450;
export const TILE_SIZE = 32;

export interface Vector2D {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  pos: Vector2D;
  vel: Vector2D;
  width: number;
  height: number;
  dimension: Dimension | 'ALL';
  type: 'player' | 'enemy' | 'platform' | 'goal' | 'particle';
}

export interface Skin {
  id: string;
  name: string;
  price: number;
  currency: 'shards' | 'premium';
  color: string;
  glow: string;
  description: string;
}

export const SKINS: Skin[] = [
  { id: 'default', name: 'Original Light', price: 0, currency: 'shards', color: '#ffffff', glow: '#ffffff', description: 'The pure essence of a Shifter.' },
  { id: 'neon', name: 'Cyber Nexus', price: 50, currency: 'shards', color: '#00f2ff', glow: '#00f2ff', description: 'A high-frequency energy variant.' },
  { id: 'void', name: 'Void Walker', price: 150, currency: 'shards', color: '#1a1a1a', glow: '#7d44b1', description: 'Born from the gaps between pixels.' },
  { id: 'gold', name: 'Solaris Prime', price: 300, currency: 'shards', color: '#f2b705', glow: '#ffffff', description: 'Forged in the heart of the Lumen sun.' },
  { id: 'blood', name: 'Eclipse Shadow', price: 5, currency: 'premium', color: '#ff4e50', glow: '#ff0000', description: 'A forbidden form corrupted by the Eclipse.' },
  { id: 'ghost', name: 'Memory Echo', price: 10, currency: 'premium', color: '#e0e0e0', glow: '#00ff9c', description: 'A transparent fragment of a lost timeline.' },
  { id: 'plasma', name: 'Plasma Core', price: 500, currency: 'shards', color: '#ff00ff', glow: '#00f2ff', description: 'Superheated energy contained in a humanoid shell.' },
  { id: 'nebula', name: 'Nebula Weaver', price: 750, currency: 'shards', color: '#4834d4', glow: '#be2edd', description: 'Woven from the dust of dying stars.' },
  { id: 'singularity', name: 'Cosmic Singularity', price: 1000, currency: 'shards', color: '#ffffff', glow: '#000000', description: 'The absolute center of a collapsing star.' },
  { id: 'glitch', name: 'Paradox Error', price: 1500, currency: 'shards', color: '#000000', glow: '#00f2ff', description: 'A skin that should not exist. Highly unstable.' },
  { id: 'obsidian', name: 'Obsidian Pulse', price: 2500, currency: 'shards', color: '#121212', glow: '#ff4e50', description: 'The ultimate form of a master Shifter.' },
  { id: 'prism', name: 'Prismatic Fractal', price: 25, currency: 'premium', color: '#ffffff', glow: '#ff00ff', description: 'A shifting spectrum of every light frequency.' },
  { id: 'emerald', name: 'Emerald Guardian', price: 1200, currency: 'shards', color: '#2ecc71', glow: '#27ae60', description: 'Protector of the Echo World groves.' },
  { id: 'crimson', name: 'Crimson Tide', price: 1800, currency: 'shards', color: '#c0392b', glow: '#e74c3c', description: 'Fuelled by the heat of the Flux core.' },
  { id: 'zenith', name: 'Zenith Architect', price: 50, currency: 'premium', color: '#f1c40f', glow: '#f39c12', description: 'The formal attire of those who built the realms.' },
  { id: 'frozen', name: 'Absolute Zero', price: 2000, currency: 'shards', color: '#ecf0f1', glow: '#3498db', description: 'Cooled to the point where time itself slows down.' },
];
