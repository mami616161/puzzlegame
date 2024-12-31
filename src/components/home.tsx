import React, { useState } from "react";
import LevelSelect from "./game/LevelSelect";
import PuzzleBoard from "./game/PuzzleBoard";
import Tutorial from "./game/Tutorial";
import CompletionModal from "./game/CompletionModal";

interface GameState {
  currentLevel: number;
  showTutorial: boolean;
  showPuzzle: boolean;
  showCompletion: boolean;
  zoomLevel: number;
  progress: number;
  image: string;
  grid: {
    id: string;
    isOccupied: boolean;
    correctPieceId: string;
    currentPieceId?: string;
  }[][];
  pieces: {
    id: string;
    position: { x: number; y: number };
    currentPosition: number;
    isPlaced: boolean;
  }[];
  levels: {
    id: number;
    name: string;
    thumbnail: string;
    difficulty: string;
    isLocked: boolean;
    isCompleted: boolean;
    gridSize: number;
  }[];
}

const generateInitialState = (gridSize: number, image: string) => {
  const totalPieces = gridSize * gridSize;
  const pieceWidth = Math.floor(800 / gridSize);
  const pieceHeight = Math.floor(600 / gridSize);

  const grid = Array(gridSize)
    .fill(null)
    .map((_, rowIndex) =>
      Array(gridSize)
        .fill(null)
        .map((_, colIndex) => ({
          id: `${rowIndex}-${colIndex}`,
          isOccupied: false,
          correctPieceId: `piece-${rowIndex}-${colIndex}`,
          currentPieceId: undefined,
        })),
    );

  const pieces = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      pieces.push({
        id: `piece-${row}-${col}`,
        position: {
          x: col * pieceWidth,
          y: row * pieceHeight,
        },
        currentPosition: row * gridSize + col,
        isPlaced: false,
      });
    }
  }

  // Shuffle pieces
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i].currentPosition, pieces[j].currentPosition] = [
      pieces[j].currentPosition,
      pieces[i].currentPosition,
    ];
  }

  return {
    grid,
    pieces,
    image,
  };
};

const defaultLevels = [
  {
    id: 1,
    name: "Kolay Başlangıç",
    thumbnail:
      "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=800&h=600&fit=crop",
    difficulty: "Kolay",
    isLocked: false,
    isCompleted: false,
    gridSize: 3,
  },
  {
    id: 2,
    name: "Dağ Manzarası",
    thumbnail:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
    difficulty: "Kolay",
    isLocked: true,
    isCompleted: false,
    gridSize: 3,
  },
  {
    id: 3,
    name: "Şehir Işıkları",
    thumbnail:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",
    difficulty: "Orta",
    isLocked: true,
    isCompleted: false,
    gridSize: 4,
  },
  {
    id: 4,
    name: "Orman Yolu",
    thumbnail:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    difficulty: "Orta",
    isLocked: true,
    isCompleted: false,
    gridSize: 4,
  },
  {
    id: 5,
    name: "Göl Manzarası",
    thumbnail:
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=800&h=600&fit=crop",
    difficulty: "Orta",
    isLocked: true,
    isCompleted: false,
    gridSize: 5,
  },
  {
    id: 6,
    name: "Çiçek Bahçesi",
    thumbnail:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
    difficulty: "Zor",
    isLocked: true,
    isCompleted: false,
    gridSize: 6,
  },
  {
    id: 7,
    name: "Gün Batımı",
    thumbnail:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
    difficulty: "Zor",
    isLocked: true,
    isCompleted: false,
    gridSize: 7,
  },
  {
    id: 8,
    name: "Kış Manzarası",
    thumbnail:
      "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&h=600&fit=crop",
    difficulty: "Çok Zor",
    isLocked: true,
    isCompleted: false,
    gridSize: 8,
  },
  {
    id: 9,
    name: "Gökyüzü",
    thumbnail:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=600&fit=crop",
    difficulty: "Çok Zor",
    isLocked: true,
    isCompleted: false,
    gridSize: 9,
  },
  {
    id: 10,
    name: "Final",
    thumbnail:
      "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=800&h=600&fit=crop",
    difficulty: "Uzman",
    isLocked: true,
    isCompleted: false,
    gridSize: 10,
  },
];

const Home = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    return {
      currentLevel: 1,
      showTutorial: true,
      showPuzzle: false,
      showCompletion: false,
      zoomLevel: 100,
      progress: 0,
      grid: [],
      pieces: [],
      image: "",
      levels: defaultLevels,
    };
  });

  const handleImageSelect = (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scaleX = 800 / img.width;
      const scaleY = 600 / img.height;
      const scale = Math.max(scaleX, scaleY);

      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (800 - scaledWidth) / 2;
        const y = (600 - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        setGameState((prev) => ({
          ...prev,
          image: canvas.toDataURL("image/jpeg"),
        }));
      }
    };
    img.src = imageUrl;
  };

  const handleLevelSelect = (level: { id: number; gridSize: number }) => {
    const { grid, pieces, image } = generateInitialState(
      level.gridSize,
      gameState.image,
    );
    setGameState((prev) => ({
      ...prev,
      currentLevel: level.id,
      showPuzzle: true,
      grid,
      pieces,
      progress: 0,
    }));
  };

  const handlePieceDrop = (pieceId: string, row: number, col: number) => {
    setGameState((prev) => {
      const newGrid = JSON.parse(JSON.stringify(prev.grid));
      const newPieces = [...prev.pieces];

      const [_, pieceRow, pieceCol] = pieceId.split("-").map(Number);
      const isCorrect = pieceRow === row && pieceCol === col;

      if (isCorrect) {
        newGrid[row][col] = {
          ...newGrid[row][col],
          isOccupied: true,
          currentPieceId: pieceId,
        };

        const pieceIndex = newPieces.findIndex((p) => p.id === pieceId);
        if (pieceIndex !== -1) {
          newPieces[pieceIndex] = {
            ...newPieces[pieceIndex],
            isPlaced: true,
          };
        }

        const totalPieces = newPieces.length;
        const placedPieces = newPieces.filter((p) => p.isPlaced).length;
        const progress = (placedPieces / totalPieces) * 100;

        if (progress === 100) {
          // Seviyeyi tamamladığında bir sonraki seviyeyi aç
          const newLevels = [...prev.levels];
          const currentLevelIndex = newLevels.findIndex(
            (l) => l.id === prev.currentLevel,
          );

          if (currentLevelIndex !== -1) {
            newLevels[currentLevelIndex].isCompleted = true;
            if (currentLevelIndex + 1 < newLevels.length) {
              newLevels[currentLevelIndex + 1].isLocked = false;
            }
          }

          setTimeout(() => {
            setGameState((prev) => ({ ...prev, showCompletion: true }));
          }, 500);

          return {
            ...prev,
            grid: newGrid,
            pieces: newPieces,
            progress,
            levels: newLevels,
          };
        }

        return {
          ...prev,
          grid: newGrid,
          pieces: newPieces,
          progress,
        };
      }

      return prev;
    });
  };

  const handleTutorialClose = () => {
    setGameState((prev) => ({
      ...prev,
      showTutorial: false,
    }));
  };

  const handleTutorialNext = () => {
    setGameState((prev) => ({
      ...prev,
      showTutorial: false,
    }));
  };

  const handlePuzzleExit = () => {
    setGameState((prev) => ({
      ...prev,
      showPuzzle: false,
    }));
  };

  const handleNextLevel = () => {
    setGameState((prev) => {
      const nextLevelId = prev.currentLevel + 1;
      const nextLevel = prev.levels.find((l) => l.id === nextLevelId);

      if (nextLevel && !nextLevel.isLocked) {
        const { grid, pieces } = generateInitialState(
          nextLevel.gridSize,
          nextLevel.thumbnail,
        );
        return {
          ...prev,
          currentLevel: nextLevelId,
          showCompletion: false,
          showPuzzle: true,
          grid,
          pieces,
          progress: 0,
          image: nextLevel.thumbnail,
        };
      }

      return {
        ...prev,
        showCompletion: false,
        showPuzzle: false,
      };
    });
  };

  const handleZoomChange = (newZoom: number) => {
    setGameState((prev) => ({
      ...prev,
      zoomLevel: newZoom,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {!gameState.showPuzzle && (
        <LevelSelect
          levels={gameState.levels}
          onLevelSelect={handleLevelSelect}
          onImageSelect={handleImageSelect}
        />
      )}

      {gameState.showPuzzle && (
        <PuzzleBoard
          grid={gameState.grid}
          pieces={gameState.pieces}
          image={gameState.image}
          onPieceDrop={handlePieceDrop}
          onExit={handlePuzzleExit}
          zoomLevel={gameState.zoomLevel}
          onZoomChange={handleZoomChange}
          progress={gameState.progress}
          onReset={() =>
            handleLevelSelect({
              id: gameState.currentLevel,
              gridSize: gameState.grid.length,
            })
          }
        />
      )}

      <Tutorial
        isOpen={gameState.showTutorial}
        onClose={handleTutorialClose}
        onNextStep={handleTutorialNext}
      />

      <CompletionModal
        isOpen={gameState.showCompletion}
        onClose={() =>
          setGameState((prev) => ({ ...prev, showCompletion: false }))
        }
        onNextLevel={handleNextLevel}
        level={gameState.currentLevel}
      />
    </div>
  );
};

export default Home;
