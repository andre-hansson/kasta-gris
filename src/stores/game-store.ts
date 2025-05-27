import type { Player } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GameState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  updatePlayerScore: (id: string, score: number) => void;
  resetPlayerGameScore: (id: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      players: [] as Player[],
      setPlayers: (players) => set({ players }),
      updatePlayerScore: (id, score) =>
        set((state) => ({
          players: state.players.map((player) => (player.id === id ? { ...player, score: player.score + score } : player)),
        })),
      resetPlayerGameScore: (id) =>
        set((state) => ({
          players: state.players.map((player) => (player.id === id ? { ...player, score: 0 } : player)),
        })),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ...state }),
    }
  )
);
