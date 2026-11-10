export type Lang = 'it' | 'en' | 'es';

export type TopicId =
  | 'top'
  | 'models'
  | 'oss'
  | 'agents'
  | 'robot'
  | 'prompt'
  | 'devtools'
  | 'rpa'
  | 'testing'
  | 'coe'
  | 'gov'
  | 'roi'
  | 'copilot'
  | 'studio'
  | 'cowork'
  | 'analysts'
  | 'usecases'
  | 'voices'
  | 'usa'
  | 'china'
  | 'japan'
  | 'gadgets';

export type GroupId = 'gridGen' | 'gridWork' | 'gridCop' | 'gridReg';

export type SpecialKind = 'copilot' | 'studio' | 'cowork';

export type WindowDays = 1 | 3 | 7 | 14;

export type WindowIndex = 0 | 1 | 2 | 3;

export type HorizonIndex = 0 | 1 | 2;

export type PromptMode = 'esteso' | 'rapido';

export interface GroupDefinition {
  readonly grid: GroupId;
  readonly ids: readonly TopicId[];
}

export interface TopicInfo {
  readonly id: TopicId;
  readonly emoji: string;
  readonly title: string;
  readonly description: string;
  readonly kind?: SpecialKind;
}

export interface DispaccioState {
  readonly lang: Lang;
  readonly windowIdx: WindowIndex;
  readonly horizonIdx: HorizonIndex;
  readonly selectedTopics: ReadonlySet<TopicId>;
  readonly previewsOpen: ReadonlySet<TopicId>;
  readonly editorsOpen: ReadonlySet<TopicId>;
  readonly editedPrompts: ReadonlyMap<TopicId, string>;
}
