export type NodeLevelIndex = 0 | 1 | 2;

export type TrackNodeTuple = readonly [text: string, levelIndex: NodeLevelIndex];

export type TrackTuple = readonly [
  name: string,
  colorHex: string,
  subtitle: string,
  nodes: readonly TrackNodeTuple[],
];

export type PillarDescriptionsTuple = readonly [
  n1: string,
  n2: string,
  n3: string,
  n4: string,
  n5: string,
];

export type PillarTuple = readonly [
  name: string,
  subtitle: string,
  descriptions: PillarDescriptionsTuple,
];

export type MaturityTuple = readonly [number, number, number, number];
