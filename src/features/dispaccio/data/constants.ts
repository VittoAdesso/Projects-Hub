import type { GroupDefinition, SpecialKind, TopicId, WindowDays } from '../types';

export const VER = 'v2.2';

export const DAYS: readonly [1, 3, 7, 14] = [1, 3, 7, 14] as const;

export const GROUPS: readonly GroupDefinition[] = [
  {
    grid: 'gridGen',
    ids: ['top', 'models', 'oss', 'agents', 'robot', 'prompt', 'devtools'] as const,
  },
  {
    grid: 'gridWork',
    ids: ['rpa', 'testing', 'coe', 'gov', 'roi'] as const,
  },
  {
    grid: 'gridCop',
    ids: ['copilot', 'studio', 'cowork'] as const,
  },
  {
    grid: 'gridReg',
    ids: ['analysts', 'usecases', 'voices', 'usa', 'china', 'japan', 'gadgets'] as const,
  },
] as const;

export const EMO: Readonly<Record<TopicId, string>> = {
  top: '\u{1F6A8}',
  models: '\u{1F9E0}',
  oss: '\u{1F513}',
  agents: '\u{1F916}',
  robot: '\u{1F9BE}',
  prompt: '\u270D\u{FE0F}',
  devtools: '\u{1F6E0}\u{FE0F}',
  rpa: '\u2699\u{FE0F}',
  testing: '\u{1F9EA}',
  coe: '\u{1F3DB}\u{FE0F}',
  gov: '\u{1F6E1}\u{FE0F}',
  roi: '\u{1F4B5}',
  copilot: '\u{1F536}',
  studio: '\u{1F9E9}',
  cowork: '\u{1F91D}',
  analysts: '\u{1F4CA}',
  usecases: '\u{1F3ED}',
  voices: '\u{1F399}\u{FE0F}',
  usa: '\u{1F1FA}\u{1F1F8}',
  china: '\u{1F1E8}\u{1F1F3}',
  japan: '\u{1F1EF}\u{1F1F5}',
  gadgets: '\u{1F381}',
} as const;

export const KIND: Readonly<Partial<Record<TopicId, SpecialKind>>> = {
  copilot: 'copilot',
  studio: 'studio',
  cowork: 'cowork',
} as const;
