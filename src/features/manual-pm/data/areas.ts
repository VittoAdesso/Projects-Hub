import type { AreaId, AreaMeta } from '../types';

export interface AreaExample {
  readonly id: AreaId;
  readonly label: string;
  readonly chip: string;
  readonly proceso: string;
  readonly juicio: string;
  readonly valida: string;
  readonly validacion: string;
}

export const AREAS: readonly AreaMeta[] = [
  { id: 'rrhh', label: 'RRHH' },
  { id: 'fin', label: 'Financiero' },
  { id: 'ops', label: 'Operaciones' },
  { id: 'it', label: 'IT / Sistemas' },
] as const;

export const AREA_EXAMPLES: readonly AreaExample[] = [
  {
    id: 'rrhh',
    label: 'RRHH',
    chip: 'RRHH · ejemplo Tipo 2-3',
    proceso:
      'consolidar altas, bajas y movimientos de empleados desde varias fuentes para un maestro o un informe.',
    juicio:
      'bajas comunicadas con retraso, altas pendientes de sincronizar, movimientos históricos que no cuadran entre sistemas.',
    valida:
      'confirmar estados reales antes de publicar, decidir qué hacer con registros inconsistentes.',
    validacion: 'antes de actualizar el maestro de personal.',
  },
  {
    id: 'fin',
    label: 'Financiero',
    chip: 'Financiero · ejemplo Tipo 2-3',
    proceso:
      'conciliar facturas, asientos o pagos entre un export de SAP y un Excel de control.',
    juicio:
      'diferencias de importe por redondeo o cambio de divisa, facturas duplicadas, apuntes fuera de periodo.',
    valida:
      'aprobar excepciones, decidir si una diferencia es error o es real antes de cerrar.',
    validacion:
      'antes de dar por cerrada la conciliación o cargar el resultado.',
  },
  {
    id: 'ops',
    label: 'Operaciones',
    chip: 'Operaciones · ejemplo Tipo 2-3',
    proceso:
      'consolidar pedidos, albaranes o incidencias de producción desde correos, Excel y un sistema de gestión.',
    juicio:
      'pedidos con datos incompletos, clasificación de una incidencia según su causa, prioridad real de una orden.',
    valida:
      'clasificar lo ambiguo, completar lo que falta con criterio operativo.',
    validacion:
      'antes de lanzar la orden o publicar el estado consolidado.',
  },
  {
    id: 'it',
    label: 'IT / Sistemas',
    chip: 'IT / Sistemas · ejemplo Tipo 2-3',
    proceso:
      'consolidar tickets, inventario de equipos o permisos de acceso desde varias herramientas.',
    juicio:
      'tickets mal categorizados, equipos duplicados en el inventario, permisos que requieren aprobación según el rol.',
    valida:
      'revisar categorización, aprobar accesos sensibles, decidir bajas de equipos.',
    validacion:
      'antes de cerrar el inventario o aplicar cambios de acceso.',
  },
] as const;
