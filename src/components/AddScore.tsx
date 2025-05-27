import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useGameStore } from '@/stores';
import { SCORE_TYPES } from '@/constants/scores';
import { ScoreButton } from './ScoreButton';
import type { ScoreKey } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Check, Undo2, X } from 'lucide-react';

type Props = {
  playerId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const AddScore = (props: Props) => {
  const { playerId, open, setOpen } = props;
  const { updatePlayerScore, resetPlayerGameScore } = useGameStore();
  const [currentScore, setCurrentScore] = useState<number[]>([0]);

  const pushPoints = useCallback(
    (points: number) => {
      setCurrentScore([...currentScore, points]);
    },
    [currentScore]
  );

  const roundScore = useMemo(
    () =>
      currentScore.reduce((acc, score) => {
        if (score === 0) return 0;
        return acc + score;
      }, 0),
    [currentScore]
  );

  const undoScore = useCallback(() => {
    setCurrentScore([...currentScore.slice(0, -1)]);
  }, [currentScore]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentScore([0]);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="pb-10 rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Poäng: {roundScore}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-2 px-4">
            {Object.entries(SCORE_TYPES)
              .filter(([key]) => key !== 'MakinBacon')
              .map(([key, score]) => (
                <ScoreButton key={key} {...score} type={key as ScoreKey} onClick={pushPoints} />
              ))}
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="flex-1 flex justify-start">
              <Button type="button" className="rounded-full text-xs" size="sm" onClick={undoScore}>
                <Undo2 />
                Ångra
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                className="bg-gris-green"
                size="default"
                variant="default"
                onClick={() => {
                  updatePlayerScore(playerId, roundScore);
                  handleClose();
                }}
              >
                <Check />
                Stanna
              </Button>
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                type="button"
                className="rounded-full text-xs"
                size="sm"
                variant="destructive"
                onClick={() => {
                  resetPlayerGameScore(playerId);
                  handleClose();
                }}
              >
                <X />
                Bara Bacon
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
