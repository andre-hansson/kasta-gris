import { useState } from 'react';
import type { Score } from '@/types/Score';
import type { ScoreKey } from '@/types';

type Props = Score & { type: ScoreKey; onClick: (score: number) => void };
export const ScoreButton = (props: Props) => {
  const { name, points, double, onClick, type } = props;
  const [stage, setState] = useState<'score' | 'type'>('score');

  return (
    <div className="flex flex-1 justify-center rounded-sm bg-gris-blue shadow-sm">
      {stage === 'score' && (
        <button
          className="w-full h-full flex justify-center text-white px-4 py-0 rounded-sm overflow-hidden"
          onClick={() => {
            if (double) {
              setState('type');
            } else {
              onClick(points);
            }
          }}
        >
          <img src={`/${type}.png`} alt={name} className="h-[100px]" />
        </button>
      )}
      {stage === 'type' && (
        <div className="flex-1 flex justify-between items-center h-full rounded-sm">
          <button
            onClick={() => {
              onClick(points);
              setState('score');
            }}
            className="flex-1 bg-gris-green h-full text-white rounded-l-sm py-4"
          >
            Enkel
          </button>
          <button
            onClick={() => {
              onClick(double);
              setState('score');
            }}
            className="flex-1 bg-gris-red h-full text-white rounded-r-sm py-4"
          >
            Dubbel
          </button>
        </div>
      )}
    </div>
  );
};
