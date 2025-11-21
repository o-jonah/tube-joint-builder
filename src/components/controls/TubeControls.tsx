import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TubeParameters } from '@/types/tube';
import { Plus, Trash2 } from 'lucide-react';

interface TubeControlsProps {
  selectedTube?: TubeParameters;
  onUpdateTube: (id: string, updates: Partial<TubeParameters>) => void;
  onAddTube: (type: 'rectangular' | 'square') => void;
  onDeleteTube: (id: string) => void;
}

export const TubeControls = ({
  selectedTube,
  onUpdateTube,
  onAddTube,
  onDeleteTube,
}: TubeControlsProps) => {
  const handleNumberChange = (field: keyof TubeParameters, value: string) => {
    if (!selectedTube) return;
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onUpdateTube(selectedTube.id, { [field]: numValue });
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-card border-border">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Add Tube</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => onAddTube('rectangular')}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Rectangular
          </Button>
          <Button
            onClick={() => onAddTube('square')}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Square
          </Button>
        </div>
      </div>

      {selectedTube ? (
        <>
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Tube Properties
              </h2>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteTube(selectedTube.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Type</Label>
              <div className="text-sm font-medium text-foreground capitalize">
                {selectedTube.type}
              </div>
            </div>
          </div>

          <Tabs defaultValue="dimensions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="position">Position</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dimensions" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm text-foreground">
                  Width (mm)
                </Label>
                <Input
                  id="width"
                  type="number"
                  step="0.1"
                  value={selectedTube.width}
                  onChange={(e) => handleNumberChange('width', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm text-foreground">
                  Height (mm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={selectedTube.height}
                  onChange={(e) => handleNumberChange('height', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thickness" className="text-sm text-foreground">
                  Thickness (mm)
                </Label>
                <Input
                  id="thickness"
                  type="number"
                  step="0.1"
                  value={selectedTube.thickness}
                  onChange={(e) => handleNumberChange('thickness', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="length" className="text-sm text-foreground">
                  Length (mm)
                </Label>
                <Input
                  id="length"
                  type="number"
                  step="0.1"
                  value={selectedTube.length}
                  onChange={(e) => handleNumberChange('length', e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </TabsContent>

            <TabsContent value="position" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="pos-x" className="text-sm text-foreground">
                  Position X
                </Label>
                <Input
                  id="pos-x"
                  type="number"
                  step="0.1"
                  value={selectedTube.position[0]}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      onUpdateTube(selectedTube.id, {
                        position: [val, selectedTube.position[1], selectedTube.position[2]],
                      });
                    }
                  }}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pos-y" className="text-sm text-foreground">
                  Position Y
                </Label>
                <Input
                  id="pos-y"
                  type="number"
                  step="0.1"
                  value={selectedTube.position[1]}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      onUpdateTube(selectedTube.id, {
                        position: [selectedTube.position[0], val, selectedTube.position[2]],
                      });
                    }
                  }}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pos-z" className="text-sm text-foreground">
                  Position Z
                </Label>
                <Input
                  id="pos-z"
                  type="number"
                  step="0.1"
                  value={selectedTube.position[2]}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      onUpdateTube(selectedTube.id, {
                        position: [selectedTube.position[0], selectedTube.position[1], val],
                      });
                    }
                  }}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rot-y" className="text-sm text-foreground">
                  Rotation (degrees)
                </Label>
                <Input
                  id="rot-y"
                  type="number"
                  step="1"
                  value={(selectedTube.rotation[1] * 180 / Math.PI).toFixed(0)}
                  onChange={(e) => {
                    const degrees = parseFloat(e.target.value);
                    if (!isNaN(degrees)) {
                      const radians = degrees * Math.PI / 180;
                      onUpdateTube(selectedTube.id, {
                        rotation: [selectedTube.rotation[0], radians, selectedTube.rotation[2]],
                      });
                    }
                  }}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const currentDeg = selectedTube.rotation[1] * 180 / Math.PI;
                    const newDeg = Math.round(currentDeg / 45) * 45;
                    onUpdateTube(selectedTube.id, {
                      rotation: [selectedTube.rotation[0], newDeg * Math.PI / 180, selectedTube.rotation[2]],
                    });
                  }}
                  className="flex-1"
                >
                  Snap 45°
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    const currentDeg = selectedTube.rotation[1] * 180 / Math.PI;
                    const newDeg = Math.round(currentDeg / 90) * 90;
                    onUpdateTube(selectedTube.id, {
                      rotation: [selectedTube.rotation[0], newDeg * Math.PI / 180, selectedTube.rotation[2]],
                    });
                  }}
                  className="flex-1"
                >
                  Snap 90°
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          Select a tube to edit its properties
        </div>
      )}
    </Card>
  );
};