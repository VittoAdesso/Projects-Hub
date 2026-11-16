import type { SectionMeta } from '../types';

export const SECTIONS: readonly SectionMeta[] = [
  {
    id: 'inicio',
    num: '00',
    label: 'Inicio',
    fullTitle: 'Primero integra, luego evoluciona.',
  },
  {
    id: 'rut',
    num: '01',
    label: 'Mi rutina',
    fullTitle: 'Mi rutina',
  },
  {
    id: 'proc',
    num: '02',
    label: 'Procedimiento',
    fullTitle: 'Procedimiento operativo',
  },
  {
    id: 'dec',
    num: '03',
    label: 'Decisión',
    fullTitle: 'Toma de decisión',
  },
  {
    id: 'reu',
    num: '04',
    label: 'Reuniones',
    fullTitle: 'Reuniones, paso a paso',
  },
  {
    id: 'inc',
    num: '05',
    label: 'Incidencias',
    fullTitle: 'Incidencias y presión',
  },
  {
    id: 'cor',
    num: '06',
    label: 'Correos',
    fullTitle: 'Correos y reportes',
  },
  {
    id: 'est',
    num: '07',
    label: 'Estabilización',
    fullTitle: 'Plan de estabilización',
  },
] as const;
