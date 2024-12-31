import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, ArrowRight } from "lucide-react";

interface CompletionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNextLevel?: () => void;
  level?: number;
  stars?: number;
  timeElapsed?: string;
}

const CompletionModal = ({
  isOpen = true,
  onClose = () => {},
  onNextLevel = () => {},
  level = 1,
  stars = 3,
  timeElapsed = "2:45",
}: CompletionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <DialogTitle className="text-2xl text-center">
            Level {level} Complete!
          </DialogTitle>
          <DialogDescription className="text-center">
            Congratulations! You've completed the puzzle.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`h-8 w-8 ${i < stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-center text-gray-600">Time: {timeElapsed}</div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Play Again
          </Button>
          <Button onClick={onNextLevel} className="w-full sm:w-auto">
            Next Level
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionModal;
