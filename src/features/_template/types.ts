/**
 * Tipos específicos para esta herramienta.
 * TODO: Define aquí las interfaces de entrada, salida y estado de tu herramienta.
 */

export interface ToolState {
  // TODO: Añade el estado necesario (ej. texto de entrada, opciones seleccionadas, resultado)
  input: string;
  output: string;
  activeTab: string;
}

export interface ToolOptions {
  // TODO: Añade parámetros de configuración si aplican
  trimWhitespace?: boolean;
}
