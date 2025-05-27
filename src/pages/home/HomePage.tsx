import { AddPlayers } from '@/components/AddPlayers';
import { AddScore } from '@/components/AddScore';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores';
import { useCallback, useState } from 'react';

export const HomePage = () => {
  const [addPlayersOpen, setAddPlayersOpen] = useState(false);
  const [addScoreOpen, setAddScoreOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const { players, setPlayers } = useGameStore();

  const handlePlayerClick = useCallback(
    (playerId: string) => () => {
      setCurrentPlayer(playerId);
      setAddScoreOpen(true);
    },
    []
  );

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Logo />
      <div className="flex-1 flex flex-col gap-2">
        {players.map((player) => (
          <button
            onClick={handlePlayerClick(player.id)}
            type="button"
            key={player.id}
            className={cn('flex items-center justify-between px-4 py-1.5 bg-white/40 rounded-lg shadow-xs border-2 border-transparent')}
          >
            <span className="text-black text-lg font-semibold">{player.name}</span>
            <Badge variant="default" className="text-lg bg-gris-blue">
              {player.score}
            </Badge>
          </button>
        ))}
      </div>
      {!players.length ? (
        <Button variant="default" size="lg" className="bg-gris-blue w-full" onClick={() => setAddPlayersOpen(true)}>
          Starta nytt spel
        </Button>
      ) : (
        <Button variant="default" size="lg" className="bg-gris-red w-full" onClick={() => setPlayers([])}>
          Avsluta spel
        </Button>
      )}

      <AddPlayers open={addPlayersOpen} setOpen={setAddPlayersOpen} />
      {currentPlayer && <AddScore open={addScoreOpen} setOpen={setAddScoreOpen} playerId={currentPlayer} />}
    </div>
  );
};
