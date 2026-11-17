import { COMMUNITY_LINKS } from '../data/modulesData'

export function NotesAndCommunitySection() {
  return (
    <div className="mx-auto max-w-[860px] px-5 pt-0 pb-[60px]">
      <div className="note my-3.5 rounded-r-lg border-l-4 border-primary bg-card px-3.5 py-2.5 text-muted-foreground">
        <b className="font-semibold text-foreground">Certificación.</b> El
        examen PL-600 (Power Platform Solution Architect) se retiró el 30 de
        junio de 2026. Su{' '}
        <a
          href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-600"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          guía de estudio
        </a>{' '}
        sigue publicada y es una buena lista de las competencias de este rol;
        esta ruta se organiza a partir de ella. Microsoft anunció nuevas
        credenciales en su{' '}
        <a
          href="https://aka.ms/AIBusinessCredentialsBlog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          blog de credenciales de IA para negocio
        </a>
        ; revísalo antes de planear una certificación.
      </div>

      <div className="note my-3.5 rounded-r-lg border-l-4 border-primary bg-card px-3.5 py-2.5 text-muted-foreground">
        <b className="font-semibold text-foreground">Videos.</b> La guía oficial
        recomienda la{' '}
        <a
          href="https://www.youtube.com/playlist?list=PLi9EhCY4z99W2QOTgbwhFZEjpqc8YZDVH"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          serie de arquitectura de Power Apps y Power Automate
        </a>{' '}
        (lista de YouTube) y la serie{' '}
        <a
          href="https://learn.microsoft.com/en-us/shows/less-code-more-power/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          #LessCodeMorePower
        </a>
        . Revisa que la lista siga disponible.
      </div>

      <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
        Comunidad y ayuda
      </h3>
      <ul className="m-0 list-disc pl-5">
        {COMMUNITY_LINKS.map(([label, url]) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-4 text-[0.88rem] text-muted-foreground">
        <p>
          Revisa los enlaces cada trimestre. Última verificación: 13 de
          noviembre de 2026.
        </p>
      </footer>
    </div>
  )
}
