import type { TemplateDefinition } from '../types';

export const TEMPLATES: readonly TemplateDefinition[] = [
  {
    id: 'c1',
    label: 'Respuesta tipo · petición informal',
    section: 'inc',
    text: 'Apuntado — lo registro y te confirmo por [canal] cómo encaja con lo que hay en marcha ahora mismo. En cuanto lo evalúe te digo plazos.',
  },
  {
    id: 'c2a',
    label: '1 · Primer aviso (en caliente)',
    section: 'inc',
    text: 'Hemos detectado una incidencia en [proceso]. Estamos conteniendo el impacto y analizando el alcance. Próxima actualización en [tiempo].',
  },
  {
    id: 'c2b',
    label: '2 · Mientras se trabaja (actualización)',
    section: 'inc',
    text: 'Actualización sobre [proceso]: hemos identificado el origen y estamos aplicando la solución. Estimamos restablecer el servicio en torno a [franja]. Os confirmo en cuanto esté resuelto.',
  },
  {
    id: 'c2c',
    label: '3 · Resuelto (cierre)',
    section: 'inc',
    text: 'Incidencia en [proceso] resuelta. El servicio está restablecido y bajo vigilancia. En los próximos días enviaré un breve resumen de la causa y de las medidas para evitar que se repita.',
  },
  {
    id: 'c3',
    label: 'Correo extendido',
    section: 'cor',
    text: 'Hola [Nombre],\n\nHe estado auditando el proceso utilizado para [proceso] y he llegado a una primera conclusión relevante.\n\nNo he identificado un fallo técnico puntual.\n\nHe identificado que una parte del proceso que inicialmente se consideró automatizable corresponde en realidad a actividades de validación funcional y gobierno del dato que requieren intervención humana antes de publicar la información.\n\nDurante el análisis hemos detectado que determinadas casuísticas, validaciones y comprobaciones dependen de conocimiento funcional y de contrastes manuales que actualmente no están representados en la automatización.\n\nEstoy elaborando un informe detallado con el análisis completo, los riesgos identificados y una propuesta de evolución para mejorar la estabilidad, escalabilidad y sostenibilidad del proceso, preservando al máximo el trabajo realizado hasta la fecha.\n\nMientras tanto, estamos trabajando en una solución temporal que nos permita disponer de información actualizada hasta el [fecha] para cubrir las necesidades inmediatas.\n\nMi objetivo es presentar en los próximos días tanto la solución de corto plazo como una propuesta de consolidación que permita reconducir el proceso de forma sostenible.\n\nTe mantendré informado de los avances.\n\nUn saludo,',
  },
  {
    id: 'c4',
    label: 'Correo corto / dirección',
    section: 'cor',
    text: 'Tras la auditoría realizada, la principal conclusión es la siguiente:\n\nNo hemos identificado un fallo técnico puntual. Hemos identificado que una parte relevante del proceso requiere validación funcional y revisión humana antes de poder publicar información fiable.\n\nEsto explica las incidencias observadas y limita el nivel de automatización real que puede alcanzarse con el diseño actual.\n\nEstamos trabajando en una solución temporal para disponer de datos actualizados hasta el [fecha] y, paralelamente, en una propuesta de mejora que permita estabilizar el proceso y asegurar su sostenibilidad.\n\nCompartiré el análisis completo y el plan de actuación en los próximos días.\n\nUn saludo,',
  },
  {
    id: 'c5',
    label: 'Plantilla de reporte',
    section: 'cor',
    text: 'Proceso: [nombre]\nFecha: [fecha]\n\nQué se hizo:\n- [acción 1]\n- [acción 2]\n\nQué queda pendiente:\n- [pendiente 1]\n\nQué es evolutivo (no urgente):\n- [mejora futura]\n\nEvaluación actual: 🟢 / 🟠 / 🔴 — [justificación breve]\n\nRetrasos, si los hay: [motivo, sin tecnicismos]',
  },
  {
    id: 'c6',
    label: 'Aviso de retraso',
    section: 'cor',
    text: 'Hola [Nombre],\n\nTe escribo para anticiparte un ajuste en la planificación de [proyecto].\n\nDurante el desarrollo ha surgido [motivo: dependencia externa / casuística no prevista / prioridad de una incidencia crítica], lo que afecta a la fecha prevista.\n\nNueva fecha estimada: [fecha].\n\nEl alcance no cambia; lo que ajustamos es el plazo para garantizar que la entrega sea estable y no genere incidencias posteriores. Te mantengo informado de cualquier novedad.\n\nUn saludo,',
  },
  {
    id: 'c7',
    label: 'Cierre de proyecto',
    section: 'cor',
    text: 'Hola [Nombre],\n\nTe confirmo que [proyecto] ya está en producción.\n\nQué se ha entregado:\n- [resultado 1]\n- [resultado 2]\n\nQué incluye el periodo de hipercare:\nDurante las próximas 4 semanas el proceso estará bajo vigilancia (diaria la primera semana, decreciente después) para detectar y corregir cualquier ajuste antes del cierre operativo.\n\nPunto de contacto para incidencias: [tú / equipo].\n\nCualquier necesidad de evolución posterior se registrará como nueva solicitud y entrará en el flujo habitual de priorización.\n\nUn saludo,',
  },
  {
    id: 'c8',
    label: 'Solicitar interlocutor único',
    section: 'cor',
    text: 'Hola [Nombre],\n\nPara avanzar con [proyecto] de forma ágil y evitar criterios contradictorios, necesitamos definir un único responsable funcional por parte de [área].\n\nEsta persona sería quien consolida los requisitos del equipo, resuelve dudas funcionales y aprueba los cambios. No significa que el resto no participe — sí que las decisiones se canalizan a través de un único interlocutor.\n\n¿Podrías confirmarme quién asumirá ese rol? Con eso agendamos la sesión de análisis y arrancamos.\n\nUn saludo,',
  },
  {
    id: 'c9',
    label: 'Solicitar material para el análisis',
    section: 'cor',
    text: 'Hola [Nombre],\n\nPara que la sesión de análisis de [proceso] sea productiva, te pido preparar de antemano el siguiente material:\n\n- Un vídeo o grabación corta haciendo el proceso como un día normal (de principio a fin).\n- Los archivos de entrada que se utilizan (de dónde salen y con qué formato).\n- Un ejemplo de salida o resultado final esperado.\n- La lista de casos especiales o excepciones que sueles encontrar.\n- Cualquier documento, plantilla o norma que aplique.\n\nCon esto sobre la mesa, en la reunión podemos centrarnos en entender y diseñar, en vez de recopilar. Quedo a la espera para agendarla.\n\nUn saludo,',
  },
  {
    id: 'c10',
    label: 'Solicitar info pendiente',
    section: 'cor',
    text: 'Hola [Nombre],\n\nPara continuar con [proyecto] me falta el siguiente dato/confirmación:\n\n- [qué necesitas exactamente]\n\nHasta disponer de esto, esta parte del desarrollo queda en pausa, por lo que cuanto antes lo tengamos, antes podemos retomar.\n\n¿Podrías facilitármelo antes de [fecha]? Si necesitas que lo veamos juntos, dime y agendamos 15 minutos.\n\nUn saludo,',
  },
] as const;

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
