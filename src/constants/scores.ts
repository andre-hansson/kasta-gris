import type { Score, ScoreKey } from '@/types';

export const SCORE_TYPES: Record<ScoreKey, Score> = {
  PigOut: { name: 'Fläsklägg', points: 0, double: 0 },
  Sider: { name: 'Sidfläsk', points: 1, double: 0 },
  Trotter: { name: 'Stående Gris', points: 5, double: 20 },
  Razorback: { name: 'Svinrygg', points: 5, double: 20 },
  Snouter: { name: 'Tryne', points: 10, double: 40 },
  LeaningJowler: { name: 'Grishals', points: 15, double: 60 },
  MakinBacon: { name: 'Bara bacon', points: 0, double: 0 },
} as const;
