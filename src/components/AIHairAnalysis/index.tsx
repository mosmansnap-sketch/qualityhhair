import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { BackgroundTexture } from '../ui/background-texture';
import { CameraCapture } from './CameraCapture';
import { AnalysisAnimation } from './AnalysisAnimation';
import { ResultsReveal } from './ResultsReveal';

interface AIHairAnalysisProps {
  onComplete: (results: AnalysisResults) => void;
}

interface AnalysisResults {
  hairType: string;
  volume: string;
  bottleSize: string;
  price: string;
  description: string;
  confidence: number;
}

type Step = 'welcome' | 'capture' | 'preset' | 'analyzing' | 'results';

const hairTypes = [
  { id: 'straight', label: 'Straight', desc: 'Naturally straight with minimal wave', icon: '💆‍♀️', pattern: '1A-1C' },
  { id: 'wavy', label: 'Wavy', desc: 'Natural waves between straight and curly', icon: '〰️', pattern: '2A-2C' },
  { id: 'curly', label: 'Curly', desc: 'Defined curls and bounce', icon: '🌀', pattern: '3A-3C' },
  { id: 'coily', label: 'Coily/Afro', desc: 'Tightly coiled, thick texture', icon: '✨', pattern: '4A-4C' },
];

const presetVolumes = [
  { id: 'small', label: 'Fine / Short', desc: 'Under shoulder length, fine texture', score: 0.25 },
  { id: 'medium', label: 'Medium', desc: 'Shoulder length, medium thickness', score: 0.50 },
  { id: 'large', label: 'Thick / Long', desc: 'Below shoulder, thick texture', score: 0.75 },
  { id: 'xlarge', label: 'Very Thick / Very Long', desc: 'Below chest, very thick', score: 0.90 },
];

export function AIHairAnalysis({ onComplete }: AIHairAnalysisProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [hairType, setHairType] = useState('');
  const [selectedVolume, setSelectedVolume] = useState('');
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const calculateResults = (volumeScore: number, usePreset: boolean): AnalysisResults => {
    let volume, bottleSize, price, description;

    if (volumeScore < 0.3) {
      volume = 'Minimal';
      bottleSize = 'Minimal Kit';
      price = '€165';
      description = 'Perfect for fine, short hair under shoulder length';
    } else if (volumeScore < 0.6) {
      volume = 'Moderate';
      bottleSize = 'Moderate Kit';
      price = '€235';
      description = 'Ideal for medium thickness, shoulder-length hair';
    } else if (volumeScore < 0.85) {
      volume = 'Full';
      bottleSize = 'Full Kit';
      price = '€295';
      description = 'Great for thick, long hair below shoulder to chest';
    } else {
      volume = 'Maximum';
      bottleSize = 'Maximum Kit';
      price = '€375';
      description = 'Best for very thick hair below chest length';
    }

    return {
      volume,
      bottleSize,
      price,
      description,
      hairType: hairTypes.find(h => h.id === hairType)?.label || '',
      confidence: usePreset ? 75 : 92,
    };
  };

  const handleCameraCapture = () => {
    setStep('analyzing');
  };

  const handlePresetSelect = (volumeId: string) => {
    setSelectedVolume(volumeId);
  };

  const handlePresetContinue = () => {
    if (selectedVolume) {
      setStep('analyzing');
    }
  };

  const handleAnalysisComplete = () => {
    const preset = presetVolumes.find(p => p.id === selectedVolume);
    const volumeScore = preset?.score || 0.5;
    const analysisResults = calculateResults(volumeScore, !!selectedVolume);
    setResults(analysisResults);
    setStep('results');
  };

  const handleCheckout = () => {
    if (results) {
      onComplete(results);
    }
  };

  const resetAnalysis = () => {
    setStep('welcome');
    setHairType('');
    setSelectedVolume('');
    setResults(null);
  };

  const stepOrder: Step[] = ['welcome', 'capture', 'analyzing', 'results'];
  const currentStepIndex = stepOrder.indexOf(step === 'preset' ? 'capture' : step);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <BackgroundTexture
        dotColor="rgba(107, 93, 82, 0.15)"
        dotSize={1}
        dotSpacing={40}
        opacity={0.3}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Hair Analysis System</h1>
          <p className="text-muted-foreground">Get your personalized treatment recommendation</p>
        </motion.div>

        {/* Progress indicator */}
        {step !== 'results' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {['Hair Type', 'Capture', 'Analysis', 'Results'].map((label, i) => (
              <div key={label} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    i < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : i === currentStepIndex
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/30'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  animate={i === currentStepIndex ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {i < currentStepIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </motion.div>
                {i < 3 && (
                  <div className={`w-12 h-1 mx-1 rounded ${i < currentStepIndex ? 'bg-green-500' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <Card className="glass-card p-8 border-2 border-border/50">
          <AnimatePresence mode="wait">
            {/* Step 1: Welcome & Hair Type */}
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">What's your hair type?</h2>
                  <p className="text-muted-foreground text-sm">Select the option that best describes your natural hair</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {hairTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => setHairType(type.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        hairType === type.id
                          ? 'border-primary bg-primary/10 shadow-lg'
                          : 'border-border hover:border-primary/50 hover:bg-accent/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{type.icon}</span>
                        <div>
                          <h3 className="font-semibold">{type.label}</h3>
                          <span className="text-xs text-muted-foreground">{type.pattern}</span>
                        </div>
                        {hairType === type.id && (
                          <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </motion.button>
                  ))}
                </div>

                <Button
                  onClick={() => setStep('capture')}
                  disabled={!hairType}
                  size="lg"
                  className="w-full btn-premium"
                >
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Camera Capture */}
            {step === 'capture' && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CameraCapture
                  onCapture={handleCameraCapture}
                  onSelectPreset={() => setStep('preset')}
                />
                <Button
                  onClick={() => setStep('welcome')}
                  variant="ghost"
                  className="w-full mt-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back to Hair Type
                </Button>
              </motion.div>
            )}

            {/* Step 2b: Preset Selection */}
            {step === 'preset' && (
              <motion.div
                key="preset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2">Select Your Hair Volume</h2>
                  <p className="text-muted-foreground text-sm">Choose the option that best matches your hair</p>
                </div>

                <div className="space-y-3">
                  {presetVolumes.map((preset) => (
                    <motion.button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedVolume === preset.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{preset.label}</h3>
                          <p className="text-sm text-muted-foreground">{preset.desc}</p>
                        </div>
                        {selectedVolume === preset.id && (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> For the most accurate recommendation, we suggest using the photo capture feature.
                    Manual selection provides an estimate based on general characteristics.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep('capture')}
                    variant="outline"
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    onClick={handlePresetContinue}
                    disabled={!selectedVolume}
                    className="flex-1 btn-premium"
                  >
                    Analyze <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Analyzing */}
            {step === 'analyzing' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnalysisAnimation
                  hairType={hairTypes.find(h => h.id === hairType)?.label || ''}
                  onComplete={handleAnalysisComplete}
                />
              </motion.div>
            )}

            {/* Step 4: Results */}
            {step === 'results' && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultsReveal
                  results={results}
                  onCheckout={handleCheckout}
                  onStartOver={resetAnalysis}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
