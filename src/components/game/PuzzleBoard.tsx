import React from "react";
import { Card } from "@/components/ui/card";
import PiecesContainer from "./PiecesContainer";
import GameControls from "./GameControls";

interface GridCell {
  id: string;
  isOccupied: boolean;
  correctPieceId: string;
  currentPieceId?: string;
}

interface PuzzleBoardProps {
  grid?: GridCell[][];
  pieces?: {
    id: string;
    position: { x: number; y: number };
    currentPosition: number;
    isPlaced: boolean;
  }[];
  image?: string;
  onPieceDrop?: (pieceId: string, row: number, col: number) => void;
  onZoomChange?: (level: number) => void;
  onReset?: () => void;
  onExit?: () => void;
  zoomLevel?: number;
  progress?: number;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  grid = [],
  pieces = [],
  image = "",
  onPieceDrop = () => {},
  onZoomChange = () => {},
  onReset = () => {},
  onExit = () => {},
  zoomLevel = 100,
  progress = 0,
}) => {
  const [draggedPiece, setDraggedPiece] = React.useState<string | null>(null);
  const gridSize = grid.length;
  const pieceWidth = Math.floor(800 / gridSize);
  const pieceHeight = Math.floor(600 / gridSize);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (row: number, col: number) => {
    if (draggedPiece) {
      onPieceDrop(draggedPiece, row, col);
      setDraggedPiece(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <PiecesContainer
        pieces={pieces}
        image={image}
        pieceSize={{ width: pieceWidth, height: pieceHeight }}
        onDragStart={(piece) => setDraggedPiece(piece.id)}
        onDragEnd={() => setDraggedPiece(null)}
      />

      <div className="flex-1 p-4 relative">
        <Card className="w-full h-full bg-white p-8 flex items-center justify-center">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              transform: `scale(${zoomLevel / 100})`,
              transition: "transform 0.2s ease-in-out",
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={cell.id}
                  className={`border-2 ${cell.isOccupied ? "border-green-500" : "border-gray-300"} rounded-lg transition-colors overflow-hidden`}
                  style={{
                    width: pieceWidth,
                    height: pieceHeight,
                    position: "relative",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(rowIndex, colIndex)}
                >
                  {cell.currentPieceId && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${pieceWidth * gridSize}px ${pieceHeight * gridSize}px`,
                        backgroundPosition: `-${pieces.find((p) => p.id === cell.currentPieceId)?.position.x}px -${pieces.find((p) => p.id === cell.currentPieceId)?.position.y}px`,
                      }}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </Card>

        <GameControls
          onZoomIn={() => onZoomChange(zoomLevel + 10)}
          onZoomOut={() => onZoomChange(zoomLevel - 10)}
          onReset={onReset}
          onExit={onExit}
          zoomLevel={zoomLevel}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default PuzzleBoard;
