import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { buildPrompt, pComb } from '@/features/dispaccio/prompts/builders';
import { DAYS } from '@/features/dispaccio/data/constants';
import type { HorizonIndex, Lang, TopicId, WindowIndex } from '@/features/dispaccio/types';

interface LegacyEnv {
  setLang: (l: Lang) => void;
  setIdx: (i: number) => void;
  setHIdx: (h: number) => void;
  getDAYS: () => readonly number[];
  getYEAR: () => number;
  getTR: () => Record<string, Record<string, [string, string]>>;
  buildPrompt: (id: string, quick: boolean) => string;
  pComb: (items: [string, string][], n: number) => string;
}

describe('Dispaccio Prompt Builders Parity Test', () => {
  let legacyEnv: LegacyEnv;

  beforeAll(() => {
    const legacyPath = path.resolve(process.cwd(), 'legacy/dispaccio-v2.html');
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);

    if (!scriptMatch || !scriptMatch[1]) {
      throw new Error('No se pudo encontrar el bloque <script> en legacy/dispaccio-v2.html');
    }

    const scriptCode = scriptMatch[1];
    // Extraer exactamente la lógica pura de constructores y datos del archivo original
    const clipIndex = scriptCode.indexOf('async function clip');
    const pureCode = scriptCode.substring(0, clipIndex);

    // Envolver en una función autoejecutable para exponer setters a las variables lexicas (let/const)
    const wrappedCode = `(function() {
      ${pureCode}
      return {
        setLang: (l) => { lang = l; },
        setIdx: (i) => { idx = i; },
        setHIdx: (h) => { hIdx = h; },
        getDAYS: () => DAYS,
        getYEAR: () => YEAR,
        getTR: () => TR,
        buildPrompt,
        pComb
      };
    })()`;

    legacyEnv = vm.runInThisContext(wrappedCode) as LegacyEnv;
  });

  const languages: readonly Lang[] = ['it', 'en', 'es'] as const;
  const topicIds: readonly TopicId[] = [
    'top',
    'models',
    'oss',
    'agents',
    'robot',
    'prompt',
    'devtools',
    'rpa',
    'testing',
    'coe',
    'gov',
    'roi',
    'copilot',
    'studio',
    'cowork',
    'analysts',
    'usecases',
    'voices',
    'usa',
    'china',
    'japan',
    'gadgets',
  ] as const;
  const windowIndices: readonly WindowIndex[] = [0, 1, 2, 3] as const;
  const horizonIndices: readonly HorizonIndex[] = [0, 1, 2] as const;
  const modes: readonly boolean[] = [false, true] as const;

  it('valida la paridad exacta para todas las combinaciones individuales de prompts (22 temas × 3 idiomas × 4 ventanas × 3 horizontes × 2 modos = 1.584)', () => {
    let checkedCount = 0;
    const year = legacyEnv.getYEAR();

    for (const lang of languages) {
      for (const windowIdx of windowIndices) {
        for (const horizonIdx of horizonIndices) {
          for (const quick of modes) {
            for (const topicId of topicIds) {
              // 1. Configurar y ejecutar lógica legacy original
              legacyEnv.setLang(lang);
              legacyEnv.setIdx(windowIdx);
              legacyEnv.setHIdx(horizonIdx);
              const expectedLegacyPrompt = legacyEnv.buildPrompt(topicId, quick);

              // 2. Ejecutar nueva función pura de TypeScript
              const days = DAYS[windowIdx];
              const actualNewPrompt = buildPrompt(topicId, quick, {
                lang,
                days,
                horizonIdx,
                year,
              });

              expect(actualNewPrompt).toBe(expectedLegacyPrompt);
              checkedCount++;
            }
          }
        }
      }
    }

    expect(checkedCount).toBe(
      topicIds.length *
        languages.length *
        windowIndices.length *
        horizonIndices.length *
        modes.length
    );
  });

  it('valida la paridad exacta del informe combinado (pComb) con diferentes selecciones', () => {
    const testSelectionGroups: readonly (readonly TopicId[])[] = [
      ['top'],
      ['models', 'agents', 'copilot'],
      ['rpa', 'testing', 'coe', 'gov', 'roi'],
      topicIds, // Los 21 temas combinados
    ];

    let combinedCheckedCount = 0;
    const tr = legacyEnv.getTR();
    const daysList = legacyEnv.getDAYS();
    const year = legacyEnv.getYEAR();

    for (const lang of languages) {
      for (const windowIdx of windowIndices) {
        for (const horizonIdx of horizonIndices) {
          for (const selection of testSelectionGroups) {
            legacyEnv.setLang(lang);
            legacyEnv.setIdx(windowIdx);
            legacyEnv.setHIdx(horizonIdx);

            const legacyItems = selection.map((id) => tr[lang]![id]!);
            const expectedCombined = legacyEnv.pComb(legacyItems, daysList[windowIdx]!);

            const days = DAYS[windowIdx];
            const newItems = selection.map(
              (id) => tr[lang]![id] as readonly [string, string]
            );
            const actualCombined = pComb(newItems, days, horizonIdx, lang, year);

            expect(actualCombined).toBe(expectedCombined);
            combinedCheckedCount++;
          }
        }
      }
    }

    expect(combinedCheckedCount).toBe(3 * 4 * 3 * 4);
  });
});
