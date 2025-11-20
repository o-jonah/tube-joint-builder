import { Text } from '@react-three/drei';
import { JointPreview as JointPreviewType } from '@/utils/jointDetection';

interface JointPreviewProps {
  preview: JointPreviewType;
}

export const JointPreview = ({ preview }: JointPreviewProps) => {
  const { intersectionPoint, angle } = preview;

  return (
    <group position={intersectionPoint}>
      {/* Intersection point indicator - yellow sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.3, 32]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>

      {/* Angle indicator text */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {angle}°
      </Text>

      {/* Connection lines to visualize the joint */}
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
      </mesh>

      {/* Pulsing effect */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
};