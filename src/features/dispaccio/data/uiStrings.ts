import type { Lang } from '../types';

export interface UIDictionary {
  readonly ed: string;
  readonly motto: string;
  readonly lede: string;
  readonly tagFree: string;
  readonly tagSyn: string;
  readonly fin: string;
  readonly finNote: string;
  readonly oggi: string;
  readonly giorni: string;
  readonly ore: string;
  readonly giorniU: string;
  readonly nel: string;
  readonly hor: string;
  readonly horOpts: readonly [string, string, string];
  readonly depts: readonly [string, string, string, string];
  readonly esteso: string;
  readonly rapido: string;
  readonly edit: string;
  readonly reset: string;
  readonly copiaMod: string;
  readonly copied: string;
  readonly comboPre: string;
  readonly comboSpan: string;
  readonly comboBtn: string;
  readonly foot: string;
}

export const UI: Readonly<Record<Lang, UIDictionary>> = {
  it: {
    ed: 'Bollettino AI',
    motto: '\u00abSapere prima. Guidare il cambiamento.\u00bb',
    lede: 'Scegli un argomento, copia il prompt e incollalo dove vuoi. Il rapporto lo genera quella chat \u2014 qui non si consuma nulla.',
    tagFree: '\u25CB zero consumo',
    tagSyn: '\u25CB sintesi sempre inclusa',
    fin: 'Finestra temporale',
    finNote: 'fino a oggi',
    oggi: 'oggi',
    giorni: 'giorni',
    ore: 'ore (solo oggi)',
    giorniU: 'giorni indietro',
    nel: 'Nel prompt:',
    hor: 'Orizzonte sintesi',
    horOpts: ['3 mesi', '6 mesi', '1 anno'] as const,
    depts: ['Modelli & Tecnologia', 'Automazione & Business', 'Copilot M365', 'Mercato & Regioni'] as const,
    esteso: 'Esteso',
    rapido: 'Rapido',
    edit: 'modifica',
    reset: 'ripristina',
    copiaMod: 'Copia modificato',
    copied: 'Copiato \u2713',
    comboPre: 'temi selezionati',
    comboSpan: 'Copia un solo prompt con tutti + sintesi globale',
    comboBtn: 'Copia rapporto combinato',
    foot: 'uso personale',
  },
  en: {
    ed: 'AI Bulletin',
    motto: '\u00abKnow first. Lead the change.\u00bb',
    lede: 'Pick a topic, copy the prompt and paste it anywhere. That chat generates the report \u2014 nothing is consumed here.',
    tagFree: '\u25CB zero usage',
    tagSyn: '\u25CB synthesis always included',
    fin: 'Time window',
    finNote: 'up to today',
    oggi: 'today',
    giorni: 'days',
    ore: 'hours (today only)',
    giorniU: 'days back',
    nel: 'In the prompt:',
    hor: 'Synthesis horizon',
    horOpts: ['3 months', '6 months', '1 year'] as const,
    depts: ['Models & Technology', 'Automation & Business', 'Copilot M365', 'Market & Regions'] as const,
    esteso: 'Full',
    rapido: 'Quick',
    edit: 'edit',
    reset: 'reset',
    copiaMod: 'Copy edited',
    copied: 'Copied \u2713',
    comboPre: 'topics selected',
    comboSpan: 'Copy one prompt with all topics + global synthesis',
    comboBtn: 'Copy combined report',
    foot: 'personal use',
  },
  es: {
    ed: 'Bolet\u00edn IA',
    motto: '\u00abSaber antes. Liderar el cambio.\u00bb',
    lede: 'Elige un tema, copia el prompt y p\u00e9galo donde quieras. El informe lo genera ese chat \u2014 aqu\u00ed no se consume nada.',
    tagFree: '\u25CB consumo cero',
    tagSyn: '\u25CB s\u00edntesis siempre incluida',
    fin: 'Ventana temporal',
    finNote: 'hasta hoy',
    oggi: 'hoy',
    giorni: 'd\u00edas',
    ore: 'horas (solo hoy)',
    giorniU: 'd\u00edas atr\u00e1s',
    nel: 'En el prompt:',
    hor: 'Horizonte s\u00edntesis',
    horOpts: ['3 meses', '6 meses', '1 a\u00f1o'] as const,
    depts: ['Modelos & Tecnolog\u00eda', 'Automatizaci\u00f3n & Negocio', 'Copilot M365', 'Mercado & Regiones'] as const,
    esteso: 'Extenso',
    rapido: 'R\u00e1pido',
    edit: 'editar',
    reset: 'restaurar',
    copiaMod: 'Copiar editado',
    copied: 'Copiado \u2713',
    comboPre: 'temas seleccionados',
    comboSpan: 'Copia un solo prompt con todos + s\u00edntesis global',
    comboBtn: 'Copiar informe combinado',
    foot: 'uso personal',
  },
} as const;

export const PREV: Readonly<Record<Lang, readonly [string, string]>> = {
  it: ['anteprima', 'chiudi'] as const,
  en: ['preview', 'close'] as const,
  es: ['vista previa', 'cerrar'] as const,
} as const;

export const RESP: Readonly<Record<Lang, string>> = {
  it: 'Rispondi in italiano',
  en: 'Respond in English',
  es: 'Responde en espa\u00f1ol',
} as const;
