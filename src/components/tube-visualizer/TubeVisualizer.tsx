import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { TubeParameters } from '@/types/tube';
import { TubeMesh } from './TubeMesh';
import { JointPreview } from './JointPreview';
import { JointPreview as JointPreviewType } from '@/utils/jointDetection';

interface TubeVisualizerProps {
  tubes: TubeParameters[];
  selectedTubeId?: string;
  onSelectTube: (id: string) => void;
  wireframe: boolean;
  jointPreviews: JointPreviewType[];
}

export const TubeVisualizer = ({ tubes, selectedTubeId, onSelectTube, wireframe, jointPreviews }: TubeVisualizerProps) => {
  return (
    <div className="w-full h-full bg-canvas-bg rounded-lg overflow-hidden border border-border">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#141b24']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        
        {/* Grid */}
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#1e2936"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#2a3847"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
        
        {/* Tubes */}
        {tubes.map((tube) => (
          <TubeMesh
            key={tube.id}
            tube={tube}
            selected={selectedTubeId === tube.id}
            wireframe={wireframe}
            onClick={() => onSelectTube(tube.id)}
          />
        ))}
        
        {/* Joint Previews */}
        {jointPreviews.map((preview, index) => (
          <JointPreview key={`preview-${index}`} preview={preview} />
        ))}
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};