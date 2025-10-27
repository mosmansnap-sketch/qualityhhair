import { useState } from 'react';
import { Camera, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroNavigation } from './HeroNavigation';

interface HairAnalysisFlowProps {
  onComplete: (results: AnalysisResults) => void;
}

interface AnalysisResults {
  hairType: string;
  volume: string;
  bottleSize: string;
  price: string;
  description: string;
  confidence: number;
  previousTreatment: string;
}

export function HairAnalysisFlow({ onComplete }: HairAnalysisFlowProps) {
  const [step, setStep] = useState(1);
  const [hairType, setHairType] = useState('');
  const [previousTreatment, setPreviousTreatment] = useState('');
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [usePresetImages, setUsePresetImages] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const hairTypes = [
    { id: 'straight', label: 'Straight Hair', desc: 'Naturally straight with minimal wave', icon: '💆‍♀️' },
    { id: 'curly', label: 'Curly Hair', desc: 'Defined curls and bounce', icon: '🌀' },
    { id: 'afro', label: 'Afro Hair', desc: 'Tightly coiled, thick texture', icon: '✨' },
    { id: 'wavy', label: 'Wavy Hair', desc: 'Natural waves between straight and curly', icon: '〰️' }
  ];

  const presetImages: Record<string, Array<{ id: string; volume: string; label: string; color: string }>> = {
    straight: [
      { id: 'straight-small', volume: 'small', label: 'Fine Straight Hair', color: '#8B7355' },
      { id: 'straight-medium', volume: 'medium', label: 'Medium Straight Hair', color: '#654321' },
      { id: 'straight-large', volume: 'large', label: 'Thick Straight Hair', color: '#3E2723' }
    ],
    wavy: [
      { id: 'wavy-small', volume: 'small', label: 'Fine Wavy Hair', color: '#A0826D' },
      { id: 'wavy-medium', volume: 'medium', label: 'Medium Wavy Hair', color: '#8B7355' },
      { id: 'wavy-large', volume: 'large', label: 'Thick Wavy Hair', color: '#654321' }
    ],
    curly: [
      { id: 'curly-small', volume: 'small', label: 'Loose Curls', color: '#8B7355' },
      { id: 'curly-medium', volume: 'medium', label: 'Defined Curls', color: '#654321' },
      { id: 'curly-large', volume: 'large', label: 'Tight Curls', color: '#3E2723' }
    ],
    afro: [
      { id: 'afro-small', volume: 'small', label: 'Short Afro', color: '#4A4A4A' },
      { id: 'afro-medium', volume: 'medium', label: 'Medium Afro', color: '#2C2C2C' },
      { id: 'afro-large', volume: 'large', label: 'Full Afro', color: '#1A1A1A' }
    ]
  };

  const handlePhotoUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos];
        newPhotos[index] = reader.result as string;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhotos = () => {
    setAnalyzing(true);
    
    setTimeout(() => {
      let volumeScore;
      
      if (usePresetImages && selectedPreset) {
        const preset = Object.values(presetImages).flat().find(p => p.id === selectedPreset);
        if (preset?.volume === 'small') {
          volumeScore = 0.25;
        } else if (preset?.volume === 'medium') {
          volumeScore = 0.50;
        } else {
          volumeScore = 0.80;
        }
      } else {
        if (hairType === 'afro') {
          volumeScore = 0.75;
        } else if (hairType === 'curly') {
          volumeScore = 0.50;
        } else if (hairType === 'wavy') {
          volumeScore = 0.35;
        } else {
          volumeScore = 0.25;
        }
      }
      
      let volume, bottleSize, price, description;
      
      if (volumeScore < 0.35) {
        volume = 'Small Volume';
        bottleSize = 'Small Bottle (100ml)';
        price = '$29.99';
        description = 'Perfect for fine or shorter hair.';
      } else if (volumeScore < 0.7) {
        volume = 'Medium Volume';
        bottleSize = 'Medium Bottle (200ml)';
        price = '$49.99';
        description = 'Ideal for average hair density.';
      } else {
        volume = 'Large Volume';
        bottleSize = 'Large Bottle (350ml)';
        price = '$79.99';
        description = 'Recommended for thick, dense hair.';
      }

      const analysisResults: AnalysisResults = {
        volume,
        bottleSize,
        price,
        description,
        hairType: hairTypes.find(h => h.id === hairType)?.label || '',
        confidence: usePresetImages ? 75 : 88,
        previousTreatment
      };

      setResults(analysisResults);
      setAnalyzing(false);
      setStep(4);
    }, 3000);
  };

  const resetAnalysis = () => {
    setStep(1);
    setHairType('');
    setPreviousTreatment('');
    setPhotos([null, null, null]);
    setResults(null);
    setUsePresetImages(false);
    setSelectedPreset(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroNavigation />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-8">
          <h1 className="mb-2">Hair Analysis System</h1>
          <p className="text-muted-foreground">Get your personalized product recommendation</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Hair Type</span>
            <span>Treatment</span>
            <span>Photos</span>
            <span>Results</span>
          </div>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur-sm">
          
          {/* Step 1: Hair Type Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="mb-6">What is your hair type?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hairTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setHairType(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      hairType === type.id ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{type.icon}</span>
                        <h3>{type.label}</h3>
                      </div>
                      {hairType === type.id && <CheckCircle className="text-primary" size={24} />}
                    </div>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!hairType}
                className="w-full mt-6"
                size="lg"
              >
                Continue <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Previous Treatment */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="mb-6">Have you used hair treatments before?</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setPreviousTreatment('yes')}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    previousTreatment === 'yes' ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">Yes, I have tried treatments</h3>
                      <p className="text-sm text-muted-foreground">And saw improvement</p>
                    </div>
                    {previousTreatment === 'yes' && <CheckCircle className="text-primary" size={24} />}
                  </div>
                </button>
                
                <button
                  onClick={() => setPreviousTreatment('no')}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    previousTreatment === 'no' ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">No, this is my first time</h3>
                      <p className="text-sm text-muted-foreground">I am new to hair treatments</p>
                    </div>
                    {previousTreatment === 'no' && <CheckCircle className="text-primary" size={24} />}
                  </div>
                </button>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft size={20} className="mr-2" /> Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!previousTreatment}
                  className="flex-1"
                  size="lg"
                >
                  Continue <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Photo Upload */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Upload your hair photos</h2>
                <p className="text-muted-foreground">Take 3 photos: front view, left side, and right side</p>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => {
                    setUsePresetImages(false);
                    setSelectedPreset(null);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    !usePresetImages ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:border-primary/50'
                  }`}
                >
                  Upload My Photos
                </button>
                <button
                  onClick={() => {
                    setUsePresetImages(true);
                    setPhotos([null, null, null]);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    usePresetImages ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:border-primary/50'
                  }`}
                >
                  Choose Similar Hair
                </button>
              </div>

              {!usePresetImages ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Front View', 'Left Side', 'Right Side'].map((label, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-sm text-muted-foreground">{label}</label>
                        <div className="relative">
                          {photos[index] ? (
                            <div className="relative group">
                              <img src={photos[index]!} alt={label} className="w-full h-48 object-cover rounded-lg" />
                              <button
                                onClick={() => {
                                  const newPhotos = [...photos];
                                  newPhotos[index] = null;
                                  setPhotos(newPhotos);
                                }}
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-accent/20 transition-all">
                              <Camera className="text-muted-foreground mb-2" size={32} />
                              <span className="text-sm text-muted-foreground">Upload Photo</span>
                              <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(index, e)} className="hidden" />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent/20 border border-accent rounded-lg p-4">
                    <h3 className="flex items-center gap-2 mb-2">
                      <Camera size={20} /> Photo Tips
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use good lighting</li>
                      <li>• Keep hair down and unstyled</li>
                      <li>• Use a plain background</li>
                      <li>• Make sure your entire head is visible</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-accent/20 border border-accent rounded-lg p-4 mb-4">
                    <h3 className="mb-2">Select the hair that best matches yours</h3>
                    <p className="text-sm text-muted-foreground">Choose the option that most closely resembles your hair</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {hairType && presetImages[hairType] && presetImages[hairType].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                          selectedPreset === preset.id ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div 
                          className="w-20 h-20 rounded-lg flex-shrink-0"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${preset.color}, ${preset.color}dd)`,
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="mb-1">{preset.label}</h4>
                          <p className="text-sm text-muted-foreground capitalize">Volume: {preset.volume}</p>
                        </div>
                        {selectedPreset === preset.id && <CheckCircle className="text-primary flex-shrink-0" size={28} />}
                      </button>
                    ))}
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
                    <h3 className="mb-2">⚠️ Important Disclaimer</h3>
                    <p className="text-sm text-amber-900">
                      By choosing a pre-selected hair image instead of uploading your own photos, you acknowledge that the bottle size recommendation may not be as accurate. If the recommended bottle amount does not suit your needs, this is based on your selection and we cannot guarantee perfect accuracy. For the most accurate recommendation, we suggest uploading your own photos.
                    </p>
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft size={20} className="mr-2" /> Back
                </Button>
                <Button
                  onClick={analyzePhotos}
                  disabled={usePresetImages ? !selectedPreset : photos.some(p => !p)}
                  className="flex-1"
                  size="lg"
                >
                  Analyze {usePresetImages ? 'Selection' : 'Photos'} <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && !analyzing && results && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="mb-2">Analysis Complete!</h2>
                <p className="text-muted-foreground">We have found the perfect match</p>
              </div>

              <div className="bg-accent/20 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hair Type</p>
                    <p>{results.hairType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hair Volume</p>
                    <p>{results.volume}</p>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-1">Analysis Confidence</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: results.confidence + '%' }}
                      />
                    </div>
                    <span>{results.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary rounded-xl p-6 bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="mb-1">Recommended Product</h3>
                    <p className="text-primary text-xl">{results.bottleSize}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl">{results.price}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{results.description}</p>

                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowInstructions(true)}
                    className="w-full"
                    size="lg"
                  >
                    Continue to Checkout
                  </Button>
                  <Button 
                    onClick={resetAnalysis}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Start New Analysis
                  </Button>
                </div>
              </div>

              {!usePresetImages && (
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    photo && <img key={index} src={photo} alt="Upload" className="w-full h-24 object-cover rounded-lg" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Analyzing State */}
          {analyzing && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-primary mb-4"></div>
              <h3 className="mb-2">Analyzing Your Hair...</h3>
              <p className="text-muted-foreground">Determining the best product for you</p>
            </div>
          )}

        </Card>
      </div>

      {/* Instructions Modal */}
      {showInstructions && results && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-card border-b p-6 flex justify-between items-center rounded-t-2xl flex-shrink-0">
              <h2 className="text-primary">How To Use Your Treatment</h2>
              <button 
                onClick={() => setShowInstructions(false)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                <h3 className="mb-2">⚠️ Read All Instructions Before Starting</h3>
                <p className="text-amber-900 text-sm">• Treatment time starts AFTER you finish applying</p>
                <p className="text-amber-900 text-sm">• Do NOT exceed recommended time</p>
                <p className="text-amber-900 text-sm">• Keep gloves on throughout</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-4">
                    <h3>PREPARATION</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Wash Hair</strong>
                      <p className="text-muted-foreground text-sm">Use ONLY shampoo</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Dry Completely</strong>
                      <p className="text-muted-foreground text-sm">Hair MUST be 100% dry</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Comb Hair</strong>
                      <p className="text-muted-foreground text-sm">Detangle completely</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-4">
                    <h3>APPLICATION</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Wear Gloves</strong>
                      <p className="text-muted-foreground text-sm">Throughout entire process</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Section Hair</strong>
                      <p className="text-muted-foreground text-sm">Divide into 10-12 sections</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Start From Bottom</strong>
                      <p className="text-muted-foreground text-sm">Work your way up</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <strong className="text-red-800">DO NOT TOUCH SCALP</strong>
                      <p className="text-red-700 text-sm">Apply to strands only. Touch scalp only in last 15 minutes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-4">
                    <h3>RINSING</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Use Only Water</strong>
                      <p className="text-muted-foreground text-sm">No shampoo or conditioner</p>
                    </div>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <strong className="text-primary">Air Dry</strong>
                      <p className="text-muted-foreground text-sm">Let hair dry naturally</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <strong className="text-red-800">NO OILS</strong>
                      <p className="text-red-700 text-sm">No products until after second wash</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-4">
                    <h3>AFTERCARE</h3>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-800 text-sm mb-2"><strong>First Wash (4-7 days):</strong> Hair mask only, no shampoo</p>
                    <p className="text-green-800 text-sm"><strong>Third Wash:</strong> Return to normal routine with sulfate-free products</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border-t p-6 rounded-b-2xl flex-shrink-0">
              <Button 
                onClick={() => {
                  if (results) {
                    onComplete(results);
                  }
                }}
                className="w-full mb-3"
                size="lg"
              >
                I Understand - Proceed to Checkout ({results.price})
              </Button>
              <Button 
                onClick={() => setShowInstructions(false)}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
