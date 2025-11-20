import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { TubeParameters } from '@/types/tube';
import { useFrame } from '@react-three/fiber';

interface TubeMeshProps {
  tube: TubeParameters;
  selected: boolean;
  wireframe: boolean;
  onClick: () => void;
}

export const TubeMesh = ({ tube, selected, wireframe, onClick }: TubeMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animate selection
  useFrame(() => {
    if (meshRef.current && selected) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const outerWidth = tube.width;
  const outerHeight = tube.height;
  const innerWidth = tube.width - tube.thickness * 2;
  const innerHeight = tube.height - tube.thickness * 2;

  const color = selected ? '#00d9ff' : hovered ? '#00b8d9' : '#6b7b8c';
  const emissiveColor = selected ? '#00d9ff' : hovered ? '#00b8d9' : '#000000';
  const emissiveIntensity = selected ? 0.3 : hovered ? 0.2 : 0;

  return (
    <group position={tube.position} rotation={tube.rotation}>
      {/* Outer box */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[outerWidth, outerHeight, tube.length]} />
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          transparent
          opacity={wireframe ? 1 : 0.9}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Inner hollow (subtractive geometry visualization) */}
      {!wireframe && tube.thickness > 0 && (
        <mesh>
          <boxGeometry args={[innerWidth, innerHeight, tube.length + 0.1]} />
          <meshStandardMaterial
            color="#141b24"
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Selection outline */}
      {selected && (
        <mesh>
          <boxGeometry args={[outerWidth + 0.05, outerHeight + 0.05, tube.length + 0.05]} />
          <meshBasicMaterial
            color="#00d9ff"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};