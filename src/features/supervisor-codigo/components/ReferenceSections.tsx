import React from 'react';
import {
  CLEAN_CODE_CRITERIA,
  CP,
  FS,
  MODULAR_STRUCTURE_SNIPPET,
  PAGINATION_RESPONSE_SNIPPET,
  SA,
} from '../data/supervisorData';

export const ConceptsSection: React.FC = () => {
  return (
    <div>
      <div
        id="cp"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
      >
        {CP.map(([name, definition, warningSign], idx) => (
          <div
            key={idx}
            className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
          >
            <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
              {name}
            </h3>
            <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
              {definition}
            </p>
            <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
              <b className="text-[var(--sc-ink,#16222E)] font-semibold">
                Señal de alerta:
              </b>{' '}
              {warningSign}
            </p>
          </div>
        ))}
      </div>

      <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 mt-3 print:break-inside-avoid">
        <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
          Señales de alerta rápidas
        </h3>
        <ul
          id="sa"
          className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--sc-ink,#16222E)] space-y-1"
        >
          {SA.map((sign, idx) => (
            <li key={idx}>{sign}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const QuickReferenceSection: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* 4 Fases (#fs) */}
      <div
        id="fs"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
      >
        {FS.map(([name, desc], idx) => (
          <div
            key={idx}
            className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
          >
            <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
              Fase {idx + 1} · {name}
            </h3>
            <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
              <b className="text-[var(--sc-ink,#16222E)] font-semibold">
                Qué revisar:
              </b>{' '}
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Estructura modular vs Código limpio */}
      <div className="two grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Estructura modular de un proyecto
          </h3>
          <pre className="mt-2 p-2.5 px-3 bg-[var(--sc-bg,#F4F6F8)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg font-mono text-[12.5px] leading-[1.55] whitespace-pre-wrap break-words text-[var(--sc-ink,#16222E)]">
            {MODULAR_STRUCTURE_SNIPPET}
          </pre>
        </div>

        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Código limpio: criterios orientativos
          </h3>
          <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--sc-ink,#16222E)] space-y-1">
            {CLEAN_CODE_CRITERIA.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Paginación: offset o cursor vs Ejemplo de respuesta */}
      <div className="two grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Paginación: offset o cursor
          </h3>
          <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
            <b className="text-[var(--sc-ink,#16222E)] font-semibold">
              Offset
            </b>{' '}
            (página y tamaño): sencillo y permite saltar a una página, pero se vuelve lento en tablas enormes y puede repetir o saltarse filas si los datos cambian.
          </p>
          <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
            <b className="text-[var(--sc-ink,#16222E)] font-semibold">
              Cursor
            </b>{' '}
            (desde el último elemento): estable y rápido con mucho volumen, pero no permite saltar a una página concreta.
          </p>
          <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
            <b className="text-[var(--sc-ink,#16222E)] font-semibold">
              Siempre:
            </b>{' '}
            define un tamaño máximo por página.
          </p>
        </div>

        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Ejemplo de respuesta
          </h3>
          <pre className="mt-2 p-2.5 px-3 bg-[var(--sc-bg,#F4F6F8)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg font-mono text-[12.5px] leading-[1.55] whitespace-pre-wrap break-words text-[var(--sc-ink,#16222E)]">
            {PAGINATION_RESPONSE_SNIPPET}
          </pre>
        </div>
      </div>
    </div>
  );
};
