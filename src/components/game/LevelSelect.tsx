import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Trophy, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Level {
  id: number;
  name: string;
  thumbnail: string;
  difficulty: string;
  isLocked: boolean;
  isCompleted: boolean;
  gridSize: number;
}

interface LevelSelectProps {
  levels?: Level[];
  onLevelSelect?: (level: Level) => void;
  onImageSelect?: (image: string) => void;
}

const defaultLevels: Level[] = [
  {
    id: 1,
    name: "Kolay Başlangıç",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    difficulty: "Kolay",
    isLocked: false,
    isCompleted: false,
    gridSize: 3,
  },
  // ... diğer seviyeler
];

const LevelSelect: React.FC<LevelSelectProps> = ({
  levels = defaultLevels,
  onLevelSelect = () => {},
  onImageSelect = () => {},
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageSelect(imageUrl);
        onLevelSelect({
          id: 999,
          name: "Özel Puzzle",
          thumbnail: imageUrl,
          difficulty: "Özel",
          isLocked: false,
          isCompleted: false,
          gridSize: 3,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Puzzle Oyunu</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Resim Yükleme Kartı */}
        <Card className="relative overflow-hidden hover:shadow-lg transition-all cursor-pointer">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <div
            className="aspect-[4/3] relative bg-gray-100 flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <Plus className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">Kendi Resminizi Yükleyin</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Özel Puzzle</h3>
              <Badge variant="secondary">Özel</Badge>
            </div>
            <div className="text-sm text-gray-500 mb-4">3x3 parça</div>
            <Button
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Resim Yükle
            </Button>
          </div>
        </Card>

        {/* Mevcut Seviyeler */}
        {levels.map((level) => (
          <Card
            key={level.id}
            className={`relative overflow-hidden ${level.isLocked ? "opacity-75" : "hover:shadow-lg"} transition-all`}
          >
            <div className="aspect-[4/3] relative">
              <img
                src={level.thumbnail}
                alt={level.name}
                className="w-full h-full object-cover"
              />
              {level.isCompleted && (
                <div className="absolute top-2 right-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
              )}
              {level.isLocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{level.name}</h3>
                <Badge variant={level.isLocked ? "secondary" : "default"}>
                  {level.difficulty}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {level.gridSize}x{level.gridSize} parça
              </div>
              <Button
                className="w-full"
                disabled={level.isLocked}
                onClick={() => {
                  onImageSelect(level.thumbnail);
                  onLevelSelect(level);
                }}
              >
                {level.isLocked ? "Kilitli" : "Oyna"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;
