import { useState, useEffect } from 'react';
import { TubeVisualizer } from '@/components/tube-visualizer/TubeVisualizer';
import { TubeControls } from '@/components/controls/TubeControls';
import { ViewToolbar } from '@/components/toolbar/ViewToolbar';
import { TubeParameters } from '@/types/tube';
import { Box, Github, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { detectPotentialJoints, JointPreview } from '@/utils/jointDetection';
import { useUndoRedo } from '@/hooks/useUndoRedo';

const Index = () => {
  const {
    state: tubes,
    setState: setTubes,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<TubeParameters[]>([]);
  
  const [selectedTubeId, setSelectedTubeId] = useState<string>();
  const [wireframe, setWireframe] = useState(false);
  const [jointPreviews, setJointPreviews] = useState<JointPreview[]>([]);

  // Detect potential joints whenever tubes change
  useEffect(() => {
    if (tubes.length >= 2) {
      const previews = detectPotentialJoints(tubes);
      setJointPreviews(previews);
      
      if (previews.length > 0) {
        toast.info(`${previews.length} potential joint${previews.length > 1 ? 's' : ''} detected`);
      }
    } else {
      setJointPreviews([]);
    }
  }, [tubes]);

  const handleAddTube = (type: 'rectangular' | 'square') => {
    const newTube: TubeParameters = {
      id: `tube-${Date.now()}`,
      type,
      width: type === 'square' ? 1 : 1.5,
      height: 1,
      thickness: 0.1,
      length: 3,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    };
    setTubes([...tubes, newTube]);
    setSelectedTubeId(newTube.id);
    toast.success(`${type === 'square' ? 'Square' : 'Rectangular'} tube added`);
  };

  const handleUpdateTube = (id: string, updates: Partial<TubeParameters>) => {
    setTubes(tubes.map((tube) => (tube.id === id ? { ...tube, ...updates } : tube)));
  };

  const handleDeleteTube = (id: string) => {
    setTubes(tubes.filter((tube) => tube.id !== id));
    if (selectedTubeId === id) {
      setSelectedTubeId(undefined);
    }
    toast.success('Tube deleted');
  };

  const selectedTube = tubes.find((t) => t.id === selectedTubeId);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Box className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base md:text-xl font-bold text-foreground truncate">
                  Tube Joint Visualizer
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                  3D Rectangular & Square Tube Joint Design Tool
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile Controls Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-4 overflow-y-auto">
                  <TubeControls
                    selectedTube={selectedTube}
                    onUpdateTube={handleUpdateTube}
                    onAddTube={handleAddTube}
                    onDeleteTube={handleDeleteTube}
                  />
                </SheetContent>
              </Sheet>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open('https://github.com', '_blank')}
                className="hidden sm:flex"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="sm:hidden"
                onClick={() => window.open('https://github.com/o-jonah/tube-joint-builder', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewport */}
        <div className="flex-1 flex flex-col p-2 md:p-4 gap-2 md:gap-4">
          <ViewToolbar
            wireframe={wireframe}
            onToggleWireframe={() => setWireframe(!wireframe)}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          <div className="flex-1 min-h-0">
            <TubeVisualizer
              tubes={tubes}
              selectedTubeId={selectedTubeId}
              onSelectTube={setSelectedTubeId}
              wireframe={wireframe}
              jointPreviews={jointPreviews}
            />
          </div>
          <div className="text-xs text-muted-foreground text-center hidden sm:block">
            Left click + drag to rotate • Right click + drag to pan • Scroll to zoom
          </div>
          <div className="text-xs text-muted-foreground text-center sm:hidden">
            Touch + drag to rotate • Pinch to zoom
          </div>
        </div>

        {/* Control Panel - Desktop Only */}
        <div className="hidden lg:block w-80 border-l border-border bg-background p-4 overflow-y-auto">
          <TubeControls
            selectedTube={selectedTube}
            onUpdateTube={handleUpdateTube}
            onAddTube={handleAddTube}
            onDeleteTube={handleDeleteTube}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-2 md:py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            {tubes.length} tube{tubes.length !== 1 ? 's' : ''} in workspace
            {selectedTube && <span className="hidden sm:inline"> • Selected: {selectedTube.id}</span>}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;