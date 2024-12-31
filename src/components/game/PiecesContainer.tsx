import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface PuzzlePiece {
  id: string;
  position: { x: number; y: number };
  currentPosition: number;
  isPlaced: boolean;
}

interface PiecesContainerProps {
  pieces?: PuzzlePiece[];
  image?: string;
  pieceSize?: { width: number; height: number };
  onDragStart?: (piece: PuzzlePiece) => void;
  onDragEnd?: (piece: PuzzlePiece) => void;
}

const PiecesContainer: React.FC<PiecesContainerProps> = ({
  pieces = [],
  image = "",
  pieceSize = { width: 100, height: 100 },
  onDragStart = () => {},
  onDragEnd = () => {},
}) => {
  return (
    <Card className="w-[300px] h-full bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Puzzle Parçaları</h2>
      <ScrollArea className="h-[calc(100%-2rem)]">
        <div className="space-y-2">
          {pieces
            .filter((piece) => !piece.isPlaced)
            .sort((a, b) => a.currentPosition - b.currentPosition)
            .map((piece) => (
              <div
                key={piece.id}
                className="bg-white p-2 rounded-lg shadow-md cursor-move flex items-center gap-2"
                draggable
                onDragStart={() => onDragStart(piece)}
                onDragEnd={() => onDragEnd(piece)}
              >
                <GripVertical className="h-5 w-5 text-gray-500" />
                <div
                  className="rounded-md overflow-hidden"
                  style={{
                    width: pieceSize.width,
                    height: pieceSize.height,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backgroundImage: `url(${image})`,
                      backgroundSize: `${pieceSize.width * 3}px ${pieceSize.height * 3}px`,
                      backgroundPosition: `-${piece.position.x}px -${piece.position.y}px`,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PiecesContainer;
