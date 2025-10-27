import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Upload, X, Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PhotoUploadProps {
  onContinue: (photos: File[]) => void;
  onBack: () => void;
}

export function PhotoUpload({ onContinue, onBack }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [
          ...prev,
          { file, preview: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    onContinue(photos.map((p) => p.file));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="mb-2">Upload Your Hair Photos</h2>
        <p className="text-muted-foreground">
          Upload 1-3 clear photos of your hair so our advisors can recommend the perfect products
        </p>
      </div>

      <Card className="p-8 mb-6">
        <div className="space-y-6">
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary/10 p-4 rounded-full">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="mb-1">Click to upload photos</p>
                <p className="text-sm text-muted-foreground">
                  or drag and drop (JPG, PNG up to 10MB)
                </p>
              </div>
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <ImageWithFallback
                    src={photo.preview}
                    alt={`Hair photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="mb-2 text-sm">Tips for best results:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use natural lighting for clear photos</li>
              <li>• Show your hair from different angles</li>
              <li>• Ensure your hair is dry and unstyled</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-between">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={photos.length === 0}
          className="w-full sm:w-auto min-w-48"
        >
          Get Recommendations
        </Button>
      </div>
    </div>
  );
}
