import { TubeParameters } from '@/types/tube';
import * as THREE from 'three';

export interface JointPreview {
  tube1Id: string;
  tube2Id: string;
  intersectionPoint: [number, number, number];
  angle: number;
  distance: number;
}

const PROXIMITY_THRESHOLD = 2.0; // Distance threshold for joint detection

export function detectPotentialJoints(tubes: TubeParameters[]): JointPreview[] {
  const previews: JointPreview[] = [];

  for (let i = 0; i < tubes.length; i++) {
    for (let j = i + 1; j < tubes.length; j++) {
      const tube1 = tubes[i];
      const tube2 = tubes[j];

      const preview = checkTubeProximity(tube1, tube2);
      if (preview) {
        previews.push(preview);
      }
    }
  }

  return previews;
}

function checkTubeProximity(
  tube1: TubeParameters,
  tube2: TubeParameters
): JointPreview | null {
  // Calculate center points
  const center1 = new THREE.Vector3(...tube1.position);
  const center2 = new THREE.Vector3(...tube2.position);

  // Calculate distance between centers
  const distance = center1.distanceTo(center2);

  // Check if tubes are within proximity threshold
  if (distance > PROXIMITY_THRESHOLD) {
    return null;
  }

  // Calculate intersection point (midpoint between centers for now)
  const intersectionPoint = new THREE.Vector3()
    .addVectors(center1, center2)
    .multiplyScalar(0.5);

  // Calculate angle between tubes based on their rotations
  const rotation1 = new THREE.Euler(...tube1.rotation);
  const rotation2 = new THREE.Euler(...tube2.rotation);

  // Create direction vectors for each tube
  const dir1 = new THREE.Vector3(0, 0, 1).applyEuler(rotation1);
  const dir2 = new THREE.Vector3(0, 0, 1).applyEuler(rotation2);

  // Calculate angle between direction vectors (in degrees)
  const angle = (dir1.angleTo(dir2) * 180) / Math.PI;

  return {
    tube1Id: tube1.id,
    tube2Id: tube2.id,
    intersectionPoint: intersectionPoint.toArray() as [number, number, number],
    angle: Math.round(angle),
    distance: Math.round(distance * 100) / 100,
  };
}