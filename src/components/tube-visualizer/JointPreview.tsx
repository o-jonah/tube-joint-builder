import { Button } from '@/components/ui/button';
import { Box, Grid3x3, RotateCw, ZoomIn, ZoomOut, Undo, Redo } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ViewToolbarProps {
  wireframe: boolean;
  onToggleWireframe: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const ViewToolbar = ({ 
  wireframe, 
  onToggleWireframe, 
  onUndo, 
  onRedo, 
  canUndo = false, 
  canRedo = false 
}: ViewToolbarProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-lg flex-wrap">
        {/* Undo/Redo Controls */}
        {(onUndo || onRedo) && (
          <>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onUndo}
                    disabled={!canUndo}
                  >
                    <Undo className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Undo</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo (Ctrl+Z)</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onRedo}
                    disabled={!canRedo}
                  >
                    <Redo className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Redo</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo (Ctrl+Y)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
          </>
        )}

        {/* View Mode Controls */}
        <div className="flex items-center gap-1">
        <Button
          variant={wireframe ? "default" : "secondary"}
          size="sm"
          onClick={onToggleWireframe}
          className={wireframe ? "bg-primary hover:bg-primary/90" : ""}
        >
          <Grid3x3 className="w-4 h-4 mr-2" />
          Wireframe
        </Button>
        <Button
          variant={!wireframe ? "default" : "secondary"}
          size="sm"
          onClick={onToggleWireframe}
          className={!wireframe ? "bg-primary hover:bg-primary/90" : ""}
        >
          <Box className="w-4 h-4 mr-2" />
          Solid
        </Button>
      </div>
      
      <Separator orientation="vertical" className="h-8" />
      
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm">
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      </div>
    </TooltipProvider>
  );
};