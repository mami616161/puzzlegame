import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MousePointer, Move, ZoomIn } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TutorialProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentStep?: number;
  onNextStep?: () => void;
}

const defaultSteps: TutorialStep[] = [
  {
    title: "Drag and Drop",
    description:
      "Click and drag puzzle pieces from the side panel to the main board",
    icon: <MousePointer className="h-8 w-8 text-primary" />,
  },
  {
    title: "Move Pieces",
    description: "Pieces will snap into place when positioned correctly",
    icon: <Move className="h-8 w-8 text-primary" />,
  },
  {
    title: "Zoom Controls",
    description: "Use the zoom controls at the bottom to get a better view",
    icon: <ZoomIn className="h-8 w-8 text-primary" />,
  },
];

const Tutorial: React.FC<TutorialProps> = ({
  isOpen = true,
  onClose = () => {},
  currentStep = 0,
  onNextStep = () => {},
}) => {
  const steps = defaultSteps;
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Welcome to the Puzzle Game!</DialogTitle>
          <DialogDescription>
            Let's learn how to play with this quick tutorial.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <Card className="p-6 flex flex-col items-center space-y-4 bg-muted/50">
            {currentStepData.icon}
            <h3 className="text-lg font-semibold">{currentStepData.title}</h3>
            <p className="text-center text-muted-foreground">
              {currentStepData.description}
            </p>
          </Card>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>

            <Button
              onClick={isLastStep ? onClose : onNextStep}
              className="flex items-center gap-2"
            >
              {isLastStep ? "Start Playing" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
