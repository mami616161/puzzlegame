import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ZoomIn, ZoomOut, X, RotateCcw } from "lucide-react";

export interface GameControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onExit?: () => void;
  zoomLevel?: number;
  progress?: number;
}

const GameControls = ({
  onZoomIn = () => {},
  onZoomOut = () => {},
  onReset = () => {},
  onExit = () => {},
  zoomLevel = 100,
  progress = 45,
}: GameControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onZoomOut}
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Slider
          value={[zoomLevel]}
          min={50}
          max={200}
          step={10}
          className="w-[100px]"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onZoomIn}
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onReset}
                className="h-8 w-8 ml-2"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset Puzzle</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <Progress value={progress} className="h-2" />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onExit}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Exit Puzzle</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GameControls;
