export type SectionId =
  | 'inicio'
  | 'rut'
  | 'proc'
  | 'dec'
  | 'reu'
  | 'inc'
  | 'cor'
  | 'est';

export type AreaId = 'rrhh' | 'fin' | 'ops' | 'it';

export interface SectionMeta {
  readonly id: SectionId;
  readonly num: string;
  readonly label: string;
  readonly fullTitle: string;
}

export interface AreaMeta {
  readonly id: AreaId;
  readonly label: string;
}

export interface TemplateDefinition {
  readonly id: string;
  readonly label: string;
  readonly section: 'inc' | 'cor';
  readonly text: string;
}
