export interface TubeParameters {
  id: string;
  type: 'rectangular' | 'square';
  width: number;
  height: number;
  thickness: number;
  length: number;
  position: [number, number, number];
  rotation: [number, number, number];
  parentId?: string;
  jointAngle?: number;
}

export interface JointConnection {
  parentId: string;
  childId: string;
  angle: number;
  position: [number, number, number];
}