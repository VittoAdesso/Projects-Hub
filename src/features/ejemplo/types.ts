export type TextTransformation = 'uppercase' | 'lowercase' | 'titlecase' | 'slugify';

export interface TextStats {
  characters: number;
  words: number;
  lines: number;
}
