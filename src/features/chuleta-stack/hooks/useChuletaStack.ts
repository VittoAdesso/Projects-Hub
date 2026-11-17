import { useMemo, useState } from 'react'
import {
  AF,
  C,
  C2,
  D,
  DV,
  F,
  G,
  K,
  L,
  R,
  R2,
  R3,
  TAG,
} from '../data/stackData'
import type {
  AnyLayerColorKey,
  DecisionOptionTuple,
  FilteredDevLayerItem,
  FilteredStackLayerItem,
} from '../types'

export function normalizeSearchQuery(rawQuery: string): string {
  return rawQuery.trim().toLowerCase()
}

export function getLayerColorHex(key: AnyLayerColorKey): string {
  if (key in C2) {
    return C2[key as keyof typeof C2]
  }
  return C[key as keyof typeof C]
}

export function filterStackLayers(
  rawQuery: string = ''
): FilteredStackLayerItem[] {
  const v = normalizeSearchQuery(rawQuery)
  return L.map(([key, title, subtitle, tools]) => {
    const filteredTools = tools.map(
      ([name, role, useFor, limit, licenseKey, licenseLabel]) => {
        const dataQ = `${name} ${role} ${useFor} ${limit}`.toLowerCase()
        const hidden = Boolean(v && !dataQ.includes(v))
        return {
          name,
          role,
          useFor,
          limit,
          licenseKey,
          licenseLabel,
          dataQ,
          hidden,
        }
      }
    )
    const hasVisibleTool = filteredTools.some((t) => !t.hidden)
    return {
      key,
      title,
      subtitle,
      colorHex: C[key],
      hidden: !hasVisibleTool,
      tools: filteredTools,
    }
  })
}

export function filterDevLayers(rawQuery: string = ''): FilteredDevLayerItem[] {
  const v = normalizeSearchQuery(rawQuery)
  return DV.map(([key, title, subtitle, tools]) => {
    const filteredTools = tools.map(([toolTitle, toolSub, badge, bullets]) => {
      const dataQ =
        `${toolTitle} ${toolSub} ${bullets.join(' ')}`.toLowerCase()
      const hidden = Boolean(v && !dataQ.includes(v))
      return {
        title: toolTitle,
        subtitle: toolSub,
        badge,
        bullets,
        dataQ,
        hidden,
      }
    })
    const hasVisibleTool = filteredTools.some((t) => !t.hidden)
    return {
      key,
      title,
      subtitle,
      colorHex: C2[key],
      hidden: !hasVisibleTool,
      tools: filteredTools,
    }
  })
}

export interface LegacyStackOutputs {
  stackHtml: string
  chipsHtml: string
  resHtml: string
  flowsHtml: string
  rulesHtml: string
  glHtml: string
  codHtml: string
  stack2Html: string
  arqflowHtml: string
  rules3Html: string
  rules2Html: string
}

const DEFAULT_DECISION: DecisionOptionTuple = [
  'Tengo API o conector',
  'Power Automate Cloud',
  'Reacciona a eventos y habla con los servicios por conector o API.',
  'El conector HTTP y otros son premium.',
]

export function computeLegacyResHtml(index: number): string {
  const d = D[index] ?? D[0] ?? DEFAULT_DECISION
  return `<strong>${d[1]}</strong><p>${d[2]}</p><p><b>Cuidado:</b> ${d[3]}</p>`
}

export function computeLegacyStackOutputsHtml(
  selectedNeedIndex: number = 0
): LegacyStackOutputs {
  const stackHtml = L.map(
    ([k, n, s, t]) =>
      `<section class="ly" style="--c:${C[k]}"><h3>${n}<small>${s}</small></h3><div class="cards">${t
        .map(
          ([a, b, u, l, c, x]) =>
            `<article class="tool" style="--c:${C[k]}" data-q="${(
              a +
              ' ' +
              b +
              ' ' +
              u +
              ' ' +
              l
            ).toLowerCase()}"><h4>${a}<span class="lic ${
              TAG[c]
            }">${x}</span></h4><p class="r">${b}</p><p><b>Úsala para:</b> ${u}</p><p><b>Límite:</b> ${l}</p></article>`
        )
        .join('')}</div></section>`
  ).join('')

  const chipsHtml = D.map(
    (d, i) =>
      `<button class="g" data-i="${i}" aria-pressed="${
        i === selectedNeedIndex ? 'true' : 'false'
      }">${d[0]}</button>`
  ).join('')

  const resHtml = computeLegacyResHtml(selectedNeedIndex)

  const flowsHtml = F.map(
    ([n, s, d]) =>
      `<div class="fl"><h4>${n}</h4><div class="st">${s
        .map(
          ([a, k], i) =>
            `${i ? '<i aria-hidden="true">→</i>' : ''}<span style="--c:${getLayerColorHex(
              k
            )}">${a}</span>`
        )
        .join('')}</div><p>${d}</p></div>`
  ).join('')

  const rulesHtml = R.map((r) => `<li><b>${r[0]}</b> ${r[1]}</li>`).join('')
  const glHtml = G.map(
    (g) => `<div><dt>${g[0]}</dt><dd>${g[1]}</dd></div>`
  ).join('')
  const codHtml = K.map((k) => `<span><b>${k[0]}</b> ${k[1]}</span>`).join('')

  const stack2Html = DV.map(
    ([k, n, s, t]) =>
      `<section class="ly" style="--c:${C2[k]}"><h3>${n}<small>${s}</small></h3><div class="cards">${t
        .map(
          ([a, b, x, it]) =>
            `<article class="tool" style="--c:${C2[k]}" data-q="${(
              a +
              ' ' +
              b +
              ' ' +
              it.join(' ')
            ).toLowerCase()}"><h4>${a}<span class="lic ow">${x}</span></h4><p class="r">${b}</p><ul>${it
              .map((i) => `<li>${i}</li>`)
              .join('')}</ul></article>`
        )
        .join('')}</div></section>`
  ).join('')

  const arqflowHtml = AF.map(
    ([a, k], i) =>
      `${i ? '<i aria-hidden="true">→</i>' : ''}<span style="--c:${getLayerColorHex(
        k
      )}">${a}</span>`
  ).join('')

  const rules3Html = R3.map((r) => `<li><b>${r[0]}</b> ${r[1]}</li>`).join('')
  const rules2Html = R2.map((r) => `<li><b>${r[0]}</b> ${r[1]}</li>`).join('')

  return {
    stackHtml,
    chipsHtml,
    resHtml,
    flowsHtml,
    rulesHtml,
    glHtml,
    codHtml,
    stack2Html,
    arqflowHtml,
    rules3Html,
    rules2Html,
  }
}

export function useChuletaStack() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedNeedIndex, setSelectedNeedIndex] = useState<number>(0)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const filteredStackLayers = useMemo(
    () => filterStackLayers(searchQuery),
    [searchQuery]
  )

  const filteredDevLayers = useMemo(
    () => filterDevLayers(searchQuery),
    [searchQuery]
  )

  const selectedNeed: DecisionOptionTuple =
    D[selectedNeedIndex] ?? D[0] ?? DEFAULT_DECISION

  return {
    searchQuery,
    setSearchQuery,
    selectedNeedIndex,
    setSelectedNeedIndex,
    selectedNeed,
    statusMessage,
    setStatusMessage,
    filteredStackLayers,
    filteredDevLayers,
  }
}
