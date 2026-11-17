import {
  FAILURE_PROTOCOL_STEPS,
  HUMAN_SUPERVISION_ROWS,
  PR,
} from '../data/agentsData'

export function PrinciplesGridSection() {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      id="pr"
    >
      {PR.map(([title, description], index) => (
        <div
          key={title}
          className="box rounded-lg border border-border bg-card p-3.5 break-inside-avoid"
        >
          <h3 className="mb-1 text-[15px] font-semibold">
            {index + 1}. {title}
          </h3>
          <p className="m-0">{description}</p>
        </div>
      ))}
    </div>
  )
}

export function HumanSupervisionTableSection() {
  return (
    <div className="sc overflow-x-auto">
      <table className="w-full border-collapse bg-card text-[13.5px]">
        <thead>
          <tr>
            <th className="border border-border bg-background px-2.5 py-2 text-left align-top font-semibold">
              Nivel
            </th>
            <th className="border border-border bg-background px-2.5 py-2 text-left align-top font-semibold">
              Supervisión humana
            </th>
            <th className="border border-border bg-background px-2.5 py-2 text-left align-top font-semibold">
              Registro
            </th>
            <th className="border border-border bg-background px-2.5 py-2 text-left align-top font-semibold">
              Revisión sugerida
            </th>
          </tr>
        </thead>
        <tbody>
          {HUMAN_SUPERVISION_ROWS.map(
            ([level, supervision, logging, reviewFrequency]) => (
              <tr key={level}>
                <td className="border border-border px-2.5 py-2 text-left align-top">
                  {level}
                </td>
                <td className="border border-border px-2.5 py-2 text-left align-top">
                  {supervision}
                </td>
                <td className="border border-border px-2.5 py-2 text-left align-top">
                  {logging}
                </td>
                <td className="border border-border px-2.5 py-2 text-left align-top">
                  {reviewFrequency}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export function FailureProtocolSection() {
  return (
    <div className="box rounded-lg border border-border bg-card p-3.5 break-inside-avoid">
      <ul className="t my-1.5 list-disc pl-[18px]">
        {FAILURE_PROTOCOL_STEPS.map(([label, action]) => (
          <li key={label} className="mb-[5px]">
            <b>{label}</b> {action}
          </li>
        ))}
      </ul>
    </div>
  )
}
