import { RESP } from '../data/uiStrings';
import { TR } from '../data/translations';
import { KIND } from '../data/constants';
import { hor, win } from './formatters';
import type { HorizonIndex, Lang, TopicId } from '../types';

export interface PromptOptions {
  lang: Lang;
  days: number;
  horizonIdx: HorizonIndex;
  year?: number;
}

export function pEsteso(
  title: string,
  desc: string,
  days: number,
  horizonIdx: HorizonIndex,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);
  const h = hor(horizonIdx, lang);

  if (lang === 'en') {
    return `Act as a Senior AI Analyst (${year}). ${RESP.en}, authoritative and direct tone.
GOAL: in-depth report on ${title} (${desc}), news ${w}, up to today.
Search the web; rely only on real, recent sources. If nothing verifiable, say so (don't make it up). Sort newest first; each point: date (dd mmm) + news + source link. Flag empty marketing. 4-6 short points.
VERDICT (traffic light, max 2 points each): \u{1F7E2} ADOPT \u00b7 \u{1F7E1} WATCH \u00b7 \u{1F534} HYPE/SKIP.
SYNTHESIS: where we are today; where we're heading in the next ${h} (Hype Cycle lens).`;
  }

  if (lang === 'es') {
    return `Act\u00faa como Senior AI Analyst (${year}). ${RESP.es}, tono autorizado y directo.
OBJETIVO: informe en profundidad sobre ${title} (${desc}), novedades ${w}, hasta hoy.
Busca en la web; bas\u00e1ndote solo en fuentes reales y recientes. Si no hay nada verificable, dilo (no te lo inventes). Ordena de m\u00e1s reciente a menos; cada punto: fecha (dd mmm) + noticia + enlace a la fuente. Se\u00f1ala el marketing sin sustancia. 4-6 puntos breves.
VEREDICTO (sem\u00e1foro, m\u00e1x 2 puntos cada uno): \u{1F7E2} ADOPTAR \u00b7 \u{1F7E1} VIGILAR \u00b7 \u{1F534} HYPE/SALTAR.
S\u00cdNTESIS: d\u00f3nde estamos hoy; hacia d\u00f3nde vamos en los pr\u00f3ximos ${h} (lente Hype Cycle).`;
  }

  return `Agisci come Senior AI Analyst (${year}). ${RESP.it}, tono autorevole e diretto.
OBIETTIVO: rapporto approfondito su ${title} (${desc}), novit\u00e0 ${w}, fino a oggi.
Cerca sul web; solo fonti reali e recenti. Se non c'\u00e8 nulla di verificabile, dillo (non inventare). Ordina dal pi\u00f9 recente; ogni punto: data (gg mmm) + notizia + link alla fonte. Segnala il marketing senza sostanza. 4-6 punti brevi.
VERDETTO (semaforo, max 2 punti per livello): \u{1F7E2} DA ADOTTARE \u00b7 \u{1F7E1} DA OSSERVARE \u00b7 \u{1F534} HYPE/SALTA.
SINTESI: dove siamo oggi; dove andiamo nei prossimi ${h} (lente Hype Cycle).`;
}

export function pRapido(
  title: string,
  desc: string,
  days: number,
  horizonIdx: HorizonIndex,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);
  const h = hor(horizonIdx, lang);

  if (lang === 'en') {
    return `Act as a Senior AI Analyst (${year}). ${RESP.en}, concise.
GOAL: QUICK digest on ${title} (${desc}), news ${w}, up to today. Search the web; only real, recent sources; if nothing, say so. Max 3 news, newest first: date (dd mmm) + one line + source link.
FLASH SYNTHESIS (2 lines): where we are + where we're heading in the next ${h}.`;
  }

  if (lang === 'es') {
    return `Act\u00faa como Senior AI Analyst (${year}). ${RESP.es}, conciso.
OBJETIVO: digest R\u00c1PIDO sobre ${title} (${desc}), novedades ${w}, hasta hoy. Busca en la web; solo fuentes reales y recientes; si no hay nada, dilo. M\u00e1x 3 noticias, m\u00e1s reciente primero: fecha (dd mmm) + una l\u00ednea + enlace.
S\u00cdNTESIS R\u00c1PIDA (2 l\u00edneas): d\u00f3nde estamos + hacia d\u00f3nde vamos en los pr\u00f3ximos ${h}.`;
  }

  return `Agisci come Senior AI Analyst (${year}). ${RESP.it}, conciso.
OBIETTIVO: digest RAPIDO su ${title} (${desc}), novit\u00e0 ${w}, fino a oggi. Cerca sul web; solo fonti reali e recenti; se non c'\u00e8 nulla, dillo. Max 3 notizie, pi\u00f9 recente prima: data (gg mmm) + una riga + link.
SINTESI LAMPO (2 righe): dove siamo + dove andiamo nei prossimi ${h}.`;
}

export function pCop(
  days: number,
  quick: boolean,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);

  if (lang === 'en') {
    return quick
      ? `Act as a Microsoft 365 Copilot expert (${year}). ${RESP.en}, concise and practical.
GOAL: QUICK digest of M365 Copilot news ${w}, up to today. Search the web; only real sources (date+link); if nothing, say so.
- The 3 key updates (one line each). New model or agents, if any.
FINALLY, ALWAYS: **3 NEW CONCRETE TRICKS to implement now** in Outlook/Teams/Excel/Word.`
      : `Act as a Microsoft 365 Copilot expert (${year}). ${RESP.en}, practical and direct.
GOAL: what's NEW in M365 Copilot (incl. Copilot Pro) ${w}, up to today, and how to get the most out of it. Search the web; real sources only (date dd mmm + link); if nothing, say so.
COVER: new features; which LLM/model is under Copilot now; new agents (Workflows/Planner/Workforce); 2-3 things worth learning now.
FINALLY, ALWAYS: **3 NEW CONCRETE TRICKS to implement now** \u2014 step by step, usable today in Outlook, Teams, Excel and Word.`;
  }

  if (lang === 'es') {
    return quick
      ? `Act\u00faa como experto en Microsoft 365 Copilot (${year}). ${RESP.es}, conciso y pr\u00e1ctico.
OBJETIVO: digest R\u00c1PIDO de novedades de M365 Copilot ${w}, hasta hoy. Busca en la web; solo fuentes reales (fecha+enlace); si no hay nada, dilo.
- Las 3 novedades clave (una l\u00ednea). Nuevo modelo o agentes, si los hay.
AL FINAL, SIEMPRE: **3 TRUCOS NUEVOS Y CONCRETOS para implementar ya** en Outlook/Teams/Excel/Word.`
      : `Act\u00faa como experto en Microsoft 365 Copilot (${year}). ${RESP.es}, pr\u00e1ctico y directo.
OBJETIVO: qu\u00e9 hay de NUEVO en M365 Copilot (incl. Copilot Pro) ${w}, hasta hoy, y c\u00f3mo sacarle el m\u00e1ximo. Busca en la web; solo fuentes reales (fecha dd mmm + enlace); si no hay nada, dilo.
CUBRE: nuevas funciones; qu\u00e9 LLM/modelo lleva Copilot ahora; nuevos agentes (Workflows/Planner/Workforce); 2-3 cosas que vale la pena aprender ya.
AL FINAL, SIEMPRE: **3 TRUCOS NUEVOS Y CONCRETOS para implementar ya** \u2014 paso a paso, aplicables hoy en Outlook, Teams, Excel y Word.`;
  }

  return quick
    ? `Agisci come esperto di Microsoft 365 Copilot (${year}). ${RESP.it}, conciso e pratico.
OBIETTIVO: digest RAPIDO delle novit\u00e0 di M365 Copilot ${w}, fino a oggi. Cerca sul web; solo fonti reali (data+link); se non c'\u00e8 nulla, dillo.
- Le 3 novit\u00e0 chiave (una riga). Nuovo modello o agenti, se ci sono.
INFINE, SEMPRE: **3 TRUCCHI NUOVI E CONCRETI da implementare subito** in Outlook/Teams/Excel/Word.`
    : `Agisci come esperto di Microsoft 365 Copilot (${year}). ${RESP.it}, pratico e diretto.
OBIETTIVO: cosa c'\u00e8 di NUOVO in M365 Copilot (incl. Copilot Pro) ${w}, fino a oggi, e come sfruttarlo al massimo. Cerca sul web; solo fonti reali (data gg mmm + link); se non c'\u00e8 nulla, dillo.
COPRI: nuove funzioni; quale LLM/modello c'\u00e8 ora sotto Copilot; nuovi agenti (Workflows/Planner/Workforce); 2-3 cose da imparare adesso.
INFINE, SEMPRE: **3 TRUCCHI NUOVI E CONCRETI da implementare subito** \u2014 passo-passo, applicabili oggi in Outlook, Teams, Excel e Word.`;
}

export function pStud(
  days: number,
  quick: boolean,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);

  if (lang === 'en') {
    return quick
      ? `Act as a Copilot Studio expert (${year}). ${RESP.en}, concise. QUICK digest of Copilot Studio & M365 agents news ${w}, up to today. Web sources only (date+link); if nothing, say so.
- The 3 key updates on agents / Copilot Studio.
FINALLY, ALWAYS: **3 concrete agent ideas to build** now.`
      : `Act as a Copilot Studio & Microsoft agents expert (${year}). ${RESP.en}, practical and direct.
GOAL: news on COPILOT STUDIO and building AGENTS in M365 ${w}, up to today, and how to use them to extend Copilot in my work. Web; real sources only (date dd mmm + link); if nothing, say so.
COVER: Copilot Studio updates (declarative agents, connectors, actions, knowledge, triggers); new ways to build agents (autonomous, orchestrated, multi-agent); integration with my stack (SharePoint, Power Automate, Dataverse).
FINALLY, ALWAYS: **3 concrete agent or automation ideas to build** this week, with the steps.`;
  }

  if (lang === 'es') {
    return quick
      ? `Act\u00faa como experto en Copilot Studio (${year}). ${RESP.es}, conciso. Digest R\u00c1PIDO de novedades de Copilot Studio y agentes M365 ${w}, hasta hoy. Solo fuentes reales (fecha+enlace); si no hay nada, dilo.
- Las 3 novedades clave sobre agentes / Copilot Studio.
AL FINAL, SIEMPRE: **3 ideas concretas de agentes para construir** ya.`
      : `Act\u00faa como experto en Copilot Studio y agentes Microsoft (${year}). ${RESP.es}, pr\u00e1ctico y directo.
OBJETIVO: novedades sobre COPILOT STUDIO y crear AGENTES en M365 ${w}, hasta hoy, y c\u00f3mo usarlos para extender Copilot en mi trabajo. Web; solo fuentes reales (fecha dd mmm + enlace); si no hay nada, dilo.
CUBRE: novedades de Copilot Studio (agentes declarativos, conectores, acciones, knowledge, triggers); nuevas formas de construir agentes (aut\u00f3nomos, orquestados, multi-agente); integraci\u00f3n con mi stack (SharePoint, Power Automate, Dataverse).
AL FINAL, SIEMPRE: **3 ideas concretas de agentes o automatizaciones para construir** esta semana, con los pasos.`;
  }

  return quick
    ? `Agisci come esperto di Copilot Studio (${year}). ${RESP.it}, conciso. Digest RAPIDO delle novit\u00e0 di Copilot Studio e agenti M365 ${w}, fino a oggi. Solo fonti reali (data+link); se non c'\u00e8 nulla, dillo.
- Le 3 novit\u00e0 chiave su agenti / Copilot Studio.
INFINE, SEMPRE: **3 idee concrete di agenti da costruire** subito.`
    : `Agisci come esperto di Copilot Studio e agenti Microsoft (${year}). ${RESP.it}, pratico e diretto.
OBIETTIVO: novit\u00e0 su COPILOT STUDIO e la creazione di AGENTI in M365 ${w}, fino a oggi, e come usarli per estendere Copilot nel mio lavoro. Web; solo fonti reali (data gg mmm + link); se non c'\u00e8 nulla, dillo.
COPRI: novit\u00e0 di Copilot Studio (agenti dichiarativi, connettori, azioni, knowledge, trigger); nuovi modi di costruire agenti (autonomi, orchestrati, multi-agente); integrazione con il mio stack (SharePoint, Power Automate, Dataverse).
INFINE, SEMPRE: **3 idee concrete di agenti o automazioni da costruire** questa settimana, con i passi.`;
}

export function pCowork(
  days: number,
  quick: boolean,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);

  if (lang === 'en') {
    return quick
      ? `Act as a Microsoft 365 Copilot Cowork expert (${year}). ${RESP.en}, concise and practical.
CONTEXT: Copilot Cowork is the most autonomous M365 Copilot experience (GA ~June 2026): unlike chat (Q&A) or agents (a fixed repeatable task), it delegates full multi-step tasks — it plans, executes and delivers work across email, calendar, Teams and files, asking for approval before sensitive actions. Billed separately with Copilot Credits; uses Anthropic and OpenAI models depending on the task.
GOAL: QUICK digest of Copilot Cowork news ${w}, up to today. Search the web; real sources only (date + link); if nothing, say so.
- The 3 key updates. New tasks it can handle, if any.
FINALLY, ALWAYS: **3 concrete tasks to delegate to Cowork** now.`
      : `Act as a Microsoft 365 Copilot Cowork expert (${year}). ${RESP.en}, practical and direct.
CONTEXT: Copilot Cowork is the most autonomous M365 Copilot experience (GA ~June 2026): unlike chat (Q&A) or agents (a fixed repeatable task), it delegates full multi-step tasks — it plans, executes and delivers work across email, calendar, Teams and files, asking for approval before sensitive actions. Billed separately with Copilot Credits; uses Anthropic and OpenAI models depending on the task.
GOAL: news on Copilot Cowork ${w}, up to today, and how to get value from it. Web; real sources only (date dd mmm + link); if nothing verifiable, say so (don't make it up).
COVER: news & availability; which tasks are worth delegating; Copilot Credits usage & cost; governance (the approvals); how it differs from chat and agents.
FINALLY, ALWAYS: **3 concrete tasks to delegate to Cowork** this week, with the steps.`;
  }

  if (lang === 'es') {
    return quick
      ? `Actúa como experto en Microsoft 365 Copilot Cowork (${year}). ${RESP.es}, conciso y práctico.
CONTEXTO: Copilot Cowork es la experiencia más autónoma de M365 Copilot (GA ~junio 2026): a diferencia del chat (pregunta-respuesta) o los agentes (tarea fija repetible), delega tareas completas multi-paso — planifica, ejecuta y entrega trabajo cruzando correo, calendario, Teams y archivos, pidiendo aprobación antes de acciones sensibles. Se factura aparte con Copilot Credits; usa modelos de Anthropic y OpenAI según la tarea.
OBJETIVO: digest RÁPIDO de novedades de Copilot Cowork ${w}, hasta hoy. Web; solo fuentes reales (fecha + enlace); si no hay nada, dilo.
- Las 3 novedades clave. Nuevas tareas que pueda hacer, si las hay.
AL FINAL, SIEMPRE: **3 tareas concretas para delegar a Cowork** ya.`
      : `Actúa como experto en Microsoft 365 Copilot Cowork (${year}). ${RESP.es}, práctico y directo.
CONTEXTO: Copilot Cowork es la experiencia más autónoma de M365 Copilot (GA ~junio 2026): a diferencia del chat (pregunta-respuesta) o los agentes (tarea fija repetible), delega tareas completas multi-paso — planifica, ejecuta y entrega trabajo cruzando correo, calendario, Teams y archivos, pidiendo aprobación antes de acciones sensibles. Se factura aparte con Copilot Credits; usa modelos de Anthropic y OpenAI según la tarea.
OBJETIVO: novedades de Copilot Cowork ${w}, hasta hoy, y cómo sacarle partido. Web; solo fuentes reales (fecha dd mmm + enlace); si no hay nada verificable, dilo (no te lo inventes).
CUBRE: novedades y disponibilidad; qué tareas conviene delegar; consumo de Copilot Credits y coste; gobernanza (las aprobaciones); en qué se diferencia del chat y los agentes.
AL FINAL, SIEMPRE: **3 tareas concretas para delegar a Cowork** esta semana, con los pasos.`;
  }

  return quick
    ? `Agisci come esperto di Microsoft 365 Copilot Cowork (${year}). ${RESP.it}, conciso e pratico.
CONTESTO: Copilot Cowork è l'esperienza più autonoma di M365 Copilot (GA ~giugno 2026): a differenza della chat (domanda-risposta) o degli agenti (un compito fisso ripetibile), delega compiti completi multi-step — pianifica, esegue e consegna il lavoro attraverso email, calendario, Teams e file, chiedendo approvazione prima di azioni sensibili. Si fattura a parte con i Copilot Credits; usa modelli di Anthropic e OpenAI a seconda del compito.
OBIETTIVO: digest RAPIDO delle novità di Copilot Cowork ${w}, fino a oggi. Web; solo fonti reali (data + link); se non c'è nulla, dillo.
- Le 3 novità chiave. Nuovi compiti che può gestire, se ci sono.
INFINE, SEMPRE: **3 compiti concreti da delegare a Cowork** subito.`
    : `Agisci come esperto di Microsoft 365 Copilot Cowork (${year}). ${RESP.it}, pratico e diretto.
CONTESTO: Copilot Cowork è l'esperienza più autonoma di M365 Copilot (GA ~giugno 2026): a differenza della chat (domanda-risposta) o degli agenti (un compito fisso ripetibile), delega compiti completi multi-step — pianifica, esegue e consegna il lavoro attraverso email, calendario, Teams e file, chiedendo approvazione prima di azioni sensibili. Si fattura a parte con i Copilot Credits; usa modelli di Anthropic e OpenAI a seconda del compito.
OBIETTIVO: novità su Copilot Cowork ${w}, fino a oggi, e come sfruttarlo. Web; solo fonti reali (data gg mmm + link); se non c'è nulla di verificabile, dillo (non inventare).
COPRI: novità e disponibilità; quali compiti conviene delegare; consumo di Copilot Credits e costo; governance (le approvazioni); come si differenzia da chat e agenti.
INFINE, SEMPRE: **3 compiti concreti da delegare a Cowork** questa settimana, con i passi.`;
}

export function pComb(
  items: readonly (readonly [string, string])[],
  days: number,
  horizonIdx: HorizonIndex,
  lang: Lang,
  year: number = new Date().getFullYear()
): string {
  const w = win(days, lang);
  const h = hor(horizonIdx, lang);
  const lista = items.map((it) => '- ' + it[0] + ': ' + it[1]).join('\n');

  if (lang === 'en') {
    return `Act as a Senior AI Analyst (${year}). ${RESP.en}, concise and sharp.
Prepare a BRIEFING on these topics, news ${w}, up to today. For EACH topic: max 3 news (date dd mmm + line + source link), newest first. Search the web; real sources only; if a topic has nothing, say so.
TOPICS:
${lista}
FINALLY, a GLOBAL SYNTHESIS: overall traffic-light verdict (\u{1F7E2} adopt / \u{1F7E1} watch / \u{1F534} hype-skip); where we are and where we're heading in the next ${h} (Hype Cycle lens); THE MOVE OF THE WEEK: one concrete action.`;
  }

  if (lang === 'es') {
    return `Act\u00faa como Senior AI Analyst (${year}). ${RESP.es}, conciso y certero.
Prepara un BRIEFING sobre estos temas, novedades ${w}, hasta hoy. Para CADA tema: m\u00e1x 3 noticias (fecha dd mmm + l\u00ednea + enlace), m\u00e1s reciente primero. Busca en la web; solo fuentes reales; si un tema no tiene nada, dilo.
TEMAS:
${lista}
AL FINAL, una S\u00cdNTESIS GLOBAL: veredicto sem\u00e1foro global (\u{1F7E2} adoptar / \u{1F7E1} vigilar / \u{1F534} hype-saltar); d\u00f3nde estamos y hacia d\u00f3nde vamos en los pr\u00f3ximos ${h} (lente Hype Cycle); LA JUGADA DE LA SEMANA: una acci\u00f3n concreta.`;
  }

  return `Agisci come Senior AI Analyst (${year}). ${RESP.it}, conciso e tagliente.
Prepara un BRIEFING su questi temi, novit\u00e0 ${w}, fino a oggi. Per OGNI tema: max 3 notizie (data gg mmm + riga + link), pi\u00f9 recente prima. Cerca sul web; solo fonti reali; se un tema non ha nulla, dillo.
TEMI:
${lista}
INFINE, una SINTESI GLOBALE: verdetto semaforo complessivo (\u{1F7E2} adottare / \u{1F7E1} osservare / \u{1F534} hype-saltare); dove siamo e dove andiamo nei prossimi ${h} (lente Hype Cycle); LA MOSSA DELLA SETTIMANA: una azione concreta.`;
}

export function buildPrompt(
  id: TopicId,
  quick: boolean,
  options: PromptOptions
): string {
  const { lang, days, horizonIdx, year } = options;
  const t = TR[lang][id];
  const k = KIND[id];

  if (k === 'copilot') return pCop(days, quick, lang, year);
  if (k === 'studio') return pStud(days, quick, lang, year);
  if (k === 'cowork') return pCowork(days, quick, lang, year);

  return quick
    ? pRapido(t[0].toUpperCase(), t[1], days, horizonIdx, lang, year)
    : pEsteso(t[0].toUpperCase(), t[1], days, horizonIdx, lang, year);
}
