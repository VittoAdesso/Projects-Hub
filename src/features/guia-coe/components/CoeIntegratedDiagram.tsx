import React from 'react';
import {
  AREA_OWN_ITEMS,
  COMMON_CORE_ITEMS,
  HUB_CHIPS,
} from '../data/coeData';
import { ColoredBorderCard } from './ColoredBorderCard';

const AREA_NUMBERS = [1, 2, 3, 4] as const;

export const CoeIntegratedDiagram: React.FC = () => {
  return (
    <div>
      {/* Núcleo del CoE */}
      <div className="hub bg-[var(--coe-sf,#ffffff)] border-2 border-[var(--coe-ink,#16222E)] rounded-[10px] py-3.5 px-4 text-center">
        <h3 className="font-[var(--font-schibsted)] font-bold text-lg text-[var(--coe-ink,#16222E)] mb-2">
          Núcleo del CoE
        </h3>
        <div className="chips flex flex-wrap gap-1.5 justify-center">
          {HUB_CHIPS.map((chip) => (
            <span
              key={chip}
              className="border border-[var(--coe-ln,#D7DEE5)] bg-[var(--coe-bg,#F4F6F8)] text-[var(--coe-ink,#16222E)] rounded-full py-1 px-3 text-[13px]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Línea conectora vertical */}
      <div
        className="ln w-[3px] h-[22px] bg-[var(--coe-ink,#16222E)] mx-auto"
        aria-hidden="true"
      />

      {/* Las 4 áreas */}
      <div
        id="ar"
        className="areas grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
      >
        {AREA_NUMBERS.map((n) => (
          <ColoredBorderCard
            key={n}
            as="div"
            title={`Área ${n}`}
            colorToken="--bl"
            className="text-left"
          >
            <p className="m-0">Persona de enlace y responsable de área.</p>
            <p className="m-0">
              Su demanda, su prioridad y su conocimiento del negocio.
            </p>
          </ColoredBorderCard>
        ))}
      </div>

      {/* Lo común vs Lo propio */}
      <div className="two grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
        <ColoredBorderCard
          as="div"
          title="Lo común: lo define el núcleo"
          colorToken="--pu"
        >
          <ul className="t list-disc pl-[18px] mt-1.5 mb-0 space-y-1">
            {COMMON_CORE_ITEMS.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </ColoredBorderCard>

        <ColoredBorderCard
          as="div"
          title="Lo propio: lo decide cada área"
          colorToken="--or"
        >
          <ul className="t list-disc pl-[18px] mt-1.5 mb-0 space-y-1">
            {AREA_OWN_ITEMS.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </ColoredBorderCard>
      </div>
    </div>
  );
};
