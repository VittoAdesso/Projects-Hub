import type { FilterLevel, RefactoringModule } from '../types';

export const REFACTORING_BASE_URL = 'https://refactoring.guru/';

export const STORAGE_KEY = 'refactoring-guru:progress';

export const FILTER_OPTIONS: readonly FilterLevel[] = [
  'todos',
  'Básico',
  'Intermedio',
  'Avanzado',
] as const;

const R = REFACTORING_BASE_URL;

export const REFACTORING_MODULES: readonly RefactoringModule[] = [
  {
    t: 'Qué es refactorizar y por qué',
    l: 'Básico',
    o: 'Entender el propósito de la refactorización y cuándo conviene hacerla.',
    k: [
      'Mejorar la estructura del código sin cambiar lo que hace',
      'Código limpio y deuda técnica',
      'Momentos adecuados para refactorizar',
      'Hacerlo en pasos pequeños y con pruebas',
    ],
    r: [
      ['Qué es la refactorización', R + 'refactoring/what-is-refactoring'],
      ['Deuda técnica', R + 'refactoring/technical-debt'],
      ['Cuándo refactorizar', R + 'refactoring/when'],
      ['Cómo refactorizar', R + 'refactoring/how-to'],
    ],
    p: 'Elige una función de más de 50 líneas de un proyecto tuyo. Escribe en tres frases qué hace y anota tres puntos de deuda técnica que ves.',
    q: [
      'Refactorizar consiste en…',
      [
        'mejorar la estructura del código sin cambiar su comportamiento externo',
        'agregar nuevas funciones',
        'reescribir todo desde cero',
      ],
      0,
    ],
  },
  {
    t: 'Malos olores de código',
    l: 'Básico',
    o: 'Detectar señales de que el diseño necesita atención.',
    k: [
      'Qué es un mal olor: una pista, no un error',
      'Bloaters: <a href="' +
        R +
        'smells/long-method" target="_blank" rel="noopener">Long Method</a>, <a href="' +
        R +
        'smells/large-class" target="_blank" rel="noopener">Large Class</a>, <a href="' +
        R +
        'smells/primitive-obsession" target="_blank" rel="noopener">Primitive Obsession</a>',
      'Change Preventers: <a href="' +
        R +
        'smells/shotgun-surgery" target="_blank" rel="noopener">Shotgun Surgery</a>, <a href="' +
        R +
        'smells/divergent-change" target="_blank" rel="noopener">Divergent Change</a>',
      'Dispensables: <a href="' +
        R +
        'smells/duplicate-code" target="_blank" rel="noopener">Duplicate Code</a>, <a href="' +
        R +
        'smells/dead-code" target="_blank" rel="noopener">Dead Code</a>',
      'Couplers: <a href="' +
        R +
        'smells/feature-envy" target="_blank" rel="noopener">Feature Envy</a>, <a href="' +
        R +
        'smells/message-chains" target="_blank" rel="noopener">Message Chains</a>',
    ],
    r: [
      ['Catálogo de malos olores', R + 'refactoring/smells'],
      ['Bloaters', R + 'refactoring/smells/bloaters'],
      ['Object-Orientation Abusers', R + 'refactoring/smells/oo-abusers'],
      ['Change Preventers', R + 'refactoring/smells/change-preventers'],
      ['Dispensables', R + 'refactoring/smells/dispensables'],
      ['Couplers', R + 'refactoring/smells/couplers'],
    ],
    p: 'Revisa un archivo de tu proyecto y encuentra al menos cinco olores. Clasifica cada uno por grupo y anota cuál duele más al cambiarlo.',
    q: [
      'Un mal olor de código es…',
      [
        'una señal de un posible problema de diseño, no necesariamente un error',
        'un error de compilación',
        'una alerta de seguridad',
      ],
      0,
    ],
  },
  {
    t: 'Técnicas de refactorización',
    l: 'Intermedio',
    o: 'Conocer las transformaciones concretas y cuándo usar cada una.',
    k: [
      'Componer métodos, por ejemplo <a href="' +
        R +
        'extract-method" target="_blank" rel="noopener">Extract Method</a>',
      'Mover funcionalidad entre objetos, por ejemplo <a href="' +
        R +
        'move-method" target="_blank" rel="noopener">Move Method</a> y <a href="' +
        R +
        'extract-class" target="_blank" rel="noopener">Extract Class</a>',
      'Organizar datos, por ejemplo <a href="' +
        R +
        'replace-magic-number-with-symbolic-constant" target="_blank" rel="noopener">Replace Magic Number</a>',
      'Simplificar condicionales, por ejemplo <a href="' +
        R +
        'replace-nested-conditional-with-guard-clauses" target="_blank" rel="noopener">Guard Clauses</a>',
      'Simplificar llamadas, por ejemplo <a href="' +
        R +
        'introduce-parameter-object" target="_blank" rel="noopener">Introduce Parameter Object</a>',
      'Trabajar con generalización: herencia, interfaces y delegación',
    ],
    r: [
      ['Catálogo de técnicas', R + 'refactoring/techniques'],
      ['Composing Methods', R + 'refactoring/techniques/composing-methods'],
      [
        'Moving Features between Objects',
        R + 'refactoring/techniques/moving-features-between-objects',
      ],
      ['Organizing Data', R + 'refactoring/techniques/organizing-data'],
      [
        'Simplifying Conditional Expressions',
        R + 'refactoring/techniques/simplifying-conditional-expressions',
      ],
      [
        'Simplifying Method Calls',
        R + 'refactoring/techniques/simplifying-method-calls',
      ],
      [
        'Dealing with Generalization',
        R + 'refactoring/techniques/dealing-with-generalization',
      ],
    ],
    p: 'Con pruebas que pasen antes y después, aplica Extract Method y Guard Clauses a una función tuya. Haz un commit por cada paso.',
    q: [
      'Antes de refactorizar conviene tener…',
      [
        'pruebas que confirmen que el comportamiento no cambia',
        'nuevas funciones pendientes',
        'otro lenguaje de programación',
      ],
      0,
    ],
  },
  {
    t: 'Introducción a los patrones de diseño',
    l: 'Básico',
    o: 'Entender qué son los patrones y cuándo no usarlos.',
    k: [
      'Soluciones típicas a problemas comunes de diseño',
      'Historia y razones para aprenderlos',
      'Críticas: riesgo de complicar de más',
      'Clasificación en creacionales, estructurales y de comportamiento',
    ],
    r: [
      ['Qué es un patrón', R + 'design-patterns/what-is-pattern'],
      ['Historia de los patrones', R + 'design-patterns/history'],
      ['Por qué aprender patrones', R + 'design-patterns/why-learn-patterns'],
      ['Críticas a los patrones', R + 'design-patterns/criticism'],
      ['Clasificación', R + 'design-patterns/classification'],
      ['Catálogo completo', R + 'design-patterns/catalog'],
    ],
    p: 'Explica con tus palabras qué problema resuelve un patrón que ya hayas usado sin saber su nombre, y anota una crítica que te parezca válida.',
    q: [
      'Un patrón de diseño es…',
      [
        'una solución típica y reutilizable a un problema común',
        'una librería que se instala',
        'una regla de formato',
      ],
      0,
    ],
  },
  {
    t: 'Patrones creacionales',
    l: 'Intermedio',
    o: 'Controlar cómo se crean los objetos.',
    k: [
      '<a href="' +
        R +
        'design-patterns/factory-method" target="_blank" rel="noopener">Factory Method</a> y <a href="' +
        R +
        'design-patterns/abstract-factory" target="_blank" rel="noopener">Abstract Factory</a>',
      '<a href="' +
        R +
        'design-patterns/builder" target="_blank" rel="noopener">Builder</a> para objetos con muchos pasos o parámetros',
      '<a href="' +
        R +
        'design-patterns/prototype" target="_blank" rel="noopener">Prototype</a> para clonar',
      '<a href="' +
        R +
        'design-patterns/singleton" target="_blank" rel="noopener">Singleton</a> y por qué hay que usarlo con cuidado',
    ],
    r: [
      ['Patrones creacionales', R + 'design-patterns/creational-patterns'],
      ['Factory Method', R + 'design-patterns/factory-method'],
      ['Abstract Factory', R + 'design-patterns/abstract-factory'],
      ['Builder', R + 'design-patterns/builder'],
      ['Prototype', R + 'design-patterns/prototype'],
      ['Singleton', R + 'design-patterns/singleton'],
    ],
    p: 'Implementa Factory Method para elegir entre dos generadores de reportes (por ejemplo, PDF y Excel) sin condicionales en el código que los usa.',
    q: [
      'Factory Method pertenece a los patrones…',
      ['creacionales', 'estructurales', 'de comportamiento'],
      0,
    ],
  },
  {
    t: 'Patrones estructurales',
    l: 'Intermedio',
    o: 'Combinar clases y objetos en estructuras más grandes.',
    k: [
      '<a href="' +
        R +
        'design-patterns/adapter" target="_blank" rel="noopener">Adapter</a> para unir interfaces incompatibles',
      '<a href="' +
        R +
        'design-patterns/facade" target="_blank" rel="noopener">Facade</a> para simplificar un subsistema',
      '<a href="' +
        R +
        'design-patterns/decorator" target="_blank" rel="noopener">Decorator</a> y <a href="' +
        R +
        'design-patterns/proxy" target="_blank" rel="noopener">Proxy</a>',
      '<a href="' +
        R +
        'design-patterns/composite" target="_blank" rel="noopener">Composite</a>, <a href="' +
        R +
        'design-patterns/bridge" target="_blank" rel="noopener">Bridge</a> y <a href="' +
        R +
        'design-patterns/flyweight" target="_blank" rel="noopener">Flyweight</a>',
    ],
    r: [
      ['Patrones estructurales', R + 'design-patterns/structural-patterns'],
      ['Adapter', R + 'design-patterns/adapter'],
      ['Bridge', R + 'design-patterns/bridge'],
      ['Composite', R + 'design-patterns/composite'],
      ['Decorator', R + 'design-patterns/decorator'],
      ['Facade', R + 'design-patterns/facade'],
      ['Flyweight', R + 'design-patterns/flyweight'],
      ['Proxy', R + 'design-patterns/proxy'],
    ],
    p: 'Envuelve un servicio o API antigua con un Adapter para que el resto de tu código use una interfaz limpia. Después compara con un Facade.',
    q: [
      'Adapter, Decorator y Facade son patrones…',
      ['estructurales', 'creacionales', 'de comportamiento'],
      0,
    ],
  },
  {
    t: 'Patrones de comportamiento',
    l: 'Avanzado',
    o: 'Repartir responsabilidades y comunicación entre objetos.',
    k: [
      '<a href="' +
        R +
        'design-patterns/strategy" target="_blank" rel="noopener">Strategy</a>, <a href="' +
        R +
        'design-patterns/state" target="_blank" rel="noopener">State</a> y <a href="' +
        R +
        'design-patterns/template-method" target="_blank" rel="noopener">Template Method</a>',
      '<a href="' +
        R +
        'design-patterns/observer" target="_blank" rel="noopener">Observer</a> y <a href="' +
        R +
        'design-patterns/mediator" target="_blank" rel="noopener">Mediator</a>',
      '<a href="' +
        R +
        'design-patterns/command" target="_blank" rel="noopener">Command</a> y <a href="' +
        R +
        'design-patterns/memento" target="_blank" rel="noopener">Memento</a>',
      '<a href="' +
        R +
        'design-patterns/chain-of-responsibility" target="_blank" rel="noopener">Chain of Responsibility</a>, <a href="' +
        R +
        'design-patterns/iterator" target="_blank" rel="noopener">Iterator</a> y <a href="' +
        R +
        'design-patterns/visitor" target="_blank" rel="noopener">Visitor</a>',
    ],
    r: [
      ['Patrones de comportamiento', R + 'design-patterns/behavioral-patterns'],
      ['Strategy', R + 'design-patterns/strategy'],
      ['State', R + 'design-patterns/state'],
      ['Observer', R + 'design-patterns/observer'],
      ['Command', R + 'design-patterns/command'],
      ['Template Method', R + 'design-patterns/template-method'],
      [
        'Chain of Responsibility',
        R + 'design-patterns/chain-of-responsibility',
      ],
    ],
    p: 'Implementa Strategy para dos reglas de cálculo intercambiables y Observer para avisar a varios módulos cuando cambie un dato.',
    q: [
      'Strategy, Observer y Command son patrones…',
      ['de comportamiento', 'creacionales', 'estructurales'],
      0,
    ],
  },
  {
    t: 'Del mal olor al patrón',
    l: 'Avanzado',
    o: 'Usar olores, técnicas y patrones como un solo método de trabajo.',
    k: [
      'El olor indica dónde mirar, la técnica indica cómo cambiarlo, el patrón da el destino',
      'Mapeo orientativo: condicionales repetidos con <a href="' +
        R +
        'replace-conditional-with-polymorphism" target="_blank" rel="noopener">Replace Conditional with Polymorphism</a> o <a href="' +
        R +
        'replace-type-code-with-state-strategy" target="_blank" rel="noopener">State/Strategy</a>',
      'Código duplicado con Extract Method o <a href="' +
        R +
        'form-template-method" target="_blank" rel="noopener">Form Template Method</a>',
      'Cuándo no aplicar un patrón: si no hay un problema que resolver',
    ],
    r: [
      ['Refactorización y patrones: visión general', R],
      ['Catálogo de refactorizaciones', R + 'refactoring/catalog'],
      ['Catálogo de patrones', R + 'design-patterns/catalog'],
      ['Switch Statements (mal olor)', R + 'smells/switch-statements'],
    ],
    p: 'Toma código con un <code>switch</code> repetido, refactorízalo hacia polimorfismo o Strategy en pasos pequeños y registra la decisión con un breve ADR (contexto, opciones, decisión).',
    q: [
      'Un <code>switch</code> repetido sobre el mismo tipo suele tratarse con…',
      ['Replace Conditional with Polymorphism', 'Inline Class', 'Dead Code'],
      0,
    ],
  },
] as const;
