import React from 'react';
import { TemplateBlock } from '../components/TemplateBlock';
import { Slot } from '../components/Slot';
import { getTemplateById } from '../data/templates';

export const CorreosView: React.FC = () => {
  const tplC3 = getTemplateById('c3')!;
  const tplC4 = getTemplateById('c4')!;
  const tplC5 = getTemplateById('c5')!;
  const tplC6 = getTemplateById('c6')!;
  const tplC7 = getTemplateById('c7')!;
  const tplC8 = getTemplateById('c8')!;
  const tplC9 = getTemplateById('c9')!;
  const tplC10 = getTemplateById('c10')!;

  return (
    <div id="cor" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          06 · Bajo presión
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Correos y reportes
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Ocho plantillas editables. Lo que va en <Slot>[color]</Slot> es lo que rellenas tú — copias, sustituyes y envías. Sin redactar de cero bajo presión.
        </p>
      </div>

      {/* El giro que cambia la narrativa */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          El giro que cambia la narrativa
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          No es un fallo técnico puntual. Es que parte del proceso nunca fue automatizable al 100%: dependía de validación funcional humana que no estaba representada. Este es el texto exacto para explicarlo sin que parezca una excusa.
        </p>

        <div className="space-y-4">
          <TemplateBlock id={tplC3.id} label={tplC3.label} text={tplC3.text} />
          <TemplateBlock id={tplC4.id} label={tplC4.label} text={tplC4.text} />
        </div>
      </section>

      {/* Reporte y seguimiento */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Reporte y seguimiento
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Para enviar los viernes o al cerrar un hito. Un buen reporte quita diez reuniones de preguntas.
        </p>

        <div className="space-y-4">
          <TemplateBlock id={tplC5.id} label={tplC5.label} text={tplC5.text} />
          <TemplateBlock id={tplC6.id} label={tplC6.label} text={tplC6.text} />
          <TemplateBlock id={tplC7.id} label={tplC7.label} text={tplC7.text} />
        </div>
      </section>

      {/* Para pedir cosas (sin que se pierdan) */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Para pedir cosas (sin que se pierdan)
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Cuando necesitas que la otra parte se mueva. Tres plantillas con límites claros.
        </p>

        <div className="space-y-4">
          <TemplateBlock id={tplC8.id} label={tplC8.label} text={tplC8.text} />
          <TemplateBlock id={tplC9.id} label={tplC9.label} text={tplC9.text} />
          <TemplateBlock id={tplC10.id} label={tplC10.label} text={tplC10.text} />
        </div>
      </section>
    </div>
  );
};
