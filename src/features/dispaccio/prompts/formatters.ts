import { UI } from '../data/uiStrings';
import type { HorizonIndex, Lang } from '../types';

export function win(n: number, lang: Lang): string {
  if (n === 1) {
    if (lang === 'it') return 'nelle ultime 24 ore';
    if (lang === 'en') return 'in the last 24 hours';
    return 'en las \u00faltimas 24 horas';
  }
  if (lang === 'it') return 'negli ultimi ' + n + ' giorni';
  if (lang === 'en') return 'in the last ' + n + ' days';
  return 'en los \u00faltimos ' + n + ' d\u00edas';
}

export function hor(horizonIdx: HorizonIndex, lang: Lang): string {
  const opt = UI[lang].horOpts[horizonIdx];
  return opt
    .replace('1 anno', '12 mesi')
    .replace('1 year', '12 months')
    .replace('1 a\u00f1o', '12 meses');
}
