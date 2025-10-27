import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

export type HairType = "curly" | "straight" | "frizzy" | "afro";

interface HairTypeSelectorProps {
  onSelect: (hairType: HairType) => void;
}

const hairTypes = [
  {
    type: "curly" as HairType,
    title: "Curly Hair",
    description: "Natural curls and waves that need moisture and definition",
    icon: "🌀",
  },
  {
    type: "straight" as HairType,
    title: "Straight Hair",
    description: "Sleek, straight strands that need volume and shine",
    icon: "✨",
  },
  {
    type: "frizzy" as HairType,
    title: "Frizzy Hair",
    description: "Hair prone to frizz that needs smoothing and control",
    icon: "⚡",
  },
  {
    type: "afro" as HairType,
    title: "Afro Hair",
    description: "Textured, coily hair that needs deep moisture and care",
    icon: "🌺",
  },
];

export function HairTypeSelector({ onSelect }: HairTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<HairType | null>(null);

  const handleSelect = (type: HairType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="mb-2">What's Your Hair Type?</h2>
        <p className="text-muted-foreground">
          Select your hair type to get personalized product recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {hairTypes.map((hairType) => (
          <Card
            key={hairType.type}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg relative ${
              selectedType === hairType.type
                ? "border-primary border-2"
                : "border-border"
            }`}
            onClick={() => handleSelect(hairType.type)}
          >
            {selectedType === hairType.type && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="text-4xl mb-3">{hairType.icon}</div>
            <h3 className="mb-2">{hairType.title}</h3>
            <p className="text-sm text-muted-foreground">
              {hairType.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full sm:w-auto min-w-48"
        >
          Continue to Photo Upload
        </Button>
      </div>
    </div>
  );
}
