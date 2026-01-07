import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RotateCcw, Upload, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface CameraCaptureProps {
  onCapture: (images: string[]) => void;
  onSelectPreset: () => void;
}

type CaptureAngle = 'front' | 'left' | 'right' | 'back';

const angleInstructions: Record<CaptureAngle, { label: string; instruction: string; icon: string }> = {
  front: { label: 'Front View', instruction: 'Face the camera directly', icon: '👤' },
  left: { label: 'Left Side', instruction: 'Turn your head to show left side', icon: '👈' },
  right: { label: 'Right Side', instruction: 'Turn your head to show right side', icon: '👉' },
  back: { label: 'Back View', instruction: 'Show the back of your head', icon: '🔙' },
};

const angles: CaptureAngle[] = ['front', 'left', 'right', 'back'];

export function CameraCapture({ onCapture, onSelectPreset }: CameraCaptureProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [captures, setCaptures] = useState<Record<CaptureAngle, string | null>>({
    front: null,
    left: null,
    right: null,
    back: null,
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const [useUpload, setUseUpload] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        // Ensure video plays on mobile
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
        setIsStreaming(true);
        setUseUpload(false);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Camera access was denied. Please use the upload option instead.');
      setUseUpload(true);
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        const angle = angles[currentAngle];
        setCaptures(prev => ({ ...prev, [angle]: imageData }));
        
        if (currentAngle < angles.length - 1) {
          setCurrentAngle(prev => prev + 1);
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const angle = angles[currentAngle];
        setCaptures(prev => ({ ...prev, [angle]: reader.result as string }));
        
        if (currentAngle < angles.length - 1) {
          setCurrentAngle(prev => prev + 1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = (angle: CaptureAngle) => {
    setCaptures(prev => ({ ...prev, [angle]: null }));
    setCurrentAngle(angles.indexOf(angle));
  };

  const allCaptured = Object.values(captures).every(c => c !== null);
  const currentAngleKey = angles[currentAngle];
  const currentInstruction = angleInstructions[currentAngleKey];

  const handleComplete = () => {
    stopCamera();
    const images = angles.map(a => captures[a]!).filter(Boolean);
    onCapture(images);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-3 p-1 bg-muted rounded-xl">
        <button
          onClick={() => { setUseUpload(true); stopCamera(); }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            useUpload 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Photos
        </button>
        <button
          onClick={startCamera}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            !useUpload 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Camera className="w-4 h-4 inline mr-2" />
          Use Camera
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-3">
        {angles.map((angle, i) => (
          <motion.div
            key={angle}
            className={`w-3 h-3 rounded-full transition-all ${
              captures[angle] 
                ? 'bg-green-500' 
                : i === currentAngle 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted'
            }`}
            animate={i === currentAngle ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Current instruction */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAngleKey}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-center"
        >
          <span className="text-4xl mb-2 block">{currentInstruction.icon}</span>
          <h3 className="text-xl font-semibold mb-1">{currentInstruction.label}</h3>
          <p className="text-muted-foreground">{currentInstruction.instruction}</p>
        </motion.div>
      </AnimatePresence>

      {/* Capture area */}
      <div className="relative aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden bg-muted border-2 border-dashed border-border">
        {isStreaming && !useUpload ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Guide overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse
                  cx="50"
                  cy="45"
                  rx="25"
                  ry="35"
                  fill="none"
                  stroke="rgba(184, 166, 143, 0.5)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </>
        ) : captures[currentAngleKey] ? (
          <img
            src={captures[currentAngleKey]!}
            alt={currentInstruction.label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {useUpload ? 'Click to upload photo' : 'Camera preview'}
            </p>
            {useUpload && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
        )}

        {/* Capture button for camera mode */}
        {isStreaming && !useUpload && !captures[currentAngleKey] && (
          <motion.button
            onClick={captureFrame}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-4 border-primary shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary mx-auto" />
          </motion.button>
        )}
      </div>

      {/* Captured thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {angles.map((angle) => (
          <div key={angle} className="relative">
            <div
              className={`aspect-square rounded-xl overflow-hidden border-2 ${
                captures[angle] ? 'border-green-500' : 'border-border'
              }`}
            >
              {captures[angle] ? (
                <img src={captures[angle]!} alt={angle} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground capitalize">{angle}</span>
                </div>
              )}
            </div>
            {captures[angle] && (
              <button
                onClick={() => retakePhoto(angle)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onSelectPreset}
          className="flex-1"
        >
          Select Similar Hair Instead
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!allCaptured}
          className="flex-1 btn-premium"
        >
          {allCaptured ? (
            <>
              Analyze My Hair <ChevronRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            `${Object.values(captures).filter(Boolean).length}/4 Photos`
          )}
        </Button>
      </div>
    </div>
  );
}
