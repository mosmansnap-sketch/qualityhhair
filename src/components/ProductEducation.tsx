import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Droplets,
  Hand,
  Timer,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { Product } from "./ProductRecommendations";

interface ProductEducationProps {
  cartItems: Product[];
  onProceedToCheckout: () => void;
  onBack: () => void;
}

export function ProductEducation({ cartItems, onProceedToCheckout, onBack }: ProductEducationProps) {
  const timeline = [
    {
      week: "Week 1-2",
      title: "Adjustment Period",
      description: "Your hair adapts to the new products. You may notice initial changes in texture.",
      icon: Calendar
    },
    {
      week: "Week 3-4",
      title: "Early Results",
      description: "Hair begins to feel healthier. You'll notice improved moisture and reduced issues.",
      icon: Droplets
    },
    {
      week: "Week 5-8",
      title: "Visible Transformation",
      description: "Significant improvements in texture, shine, and overall hair health become apparent.",
      icon: TrendingUp
    }
  ];

  const expectations = [
    {
      title: "Be Consistent",
      description: "Use products daily or as directed. Results require commitment to the routine.",
      icon: CheckCircle2,
      type: "success"
    },
    {
      title: "Give It Time",
      description: "Real hair transformation takes 4-8 weeks. Don't expect overnight miracles.",
      icon: Clock,
      type: "info"
    },
    {
      title: "Follow Instructions",
      description: "Apply products exactly as recommended for best results. More isn't always better.",
      icon: AlertCircle,
      type: "warning"
    }
  ];

  const usageSteps = [
    {
      step: 1,
      title: "Prep Your Hair",
      description: "Start with clean, damp hair. Gently towel dry to remove excess water.",
      icon: Hand
    },
    {
      step: 2,
      title: "Apply Product",
      description: "Use recommended amount. Work through hair section by section for even coverage.",
      icon: Droplets
    },
    {
      step: 3,
      title: "Style & Set",
      description: "Style as desired. Allow products to work their magic for optimal results.",
      icon: Timer
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="text-center mb-12">
        <h1 className="mb-4">Understanding Your Hair Journey</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Before you checkout, let's set clear expectations about your hair care journey. Understanding the process helps ensure you get the best results and stay committed to your routine.
        </p>
      </div>

      {/* Selected Products Summary */}
      <Card className="p-6 mb-8">
        <h2 className="mb-4">Your Selected Products</h2>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-accent flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div>{item.name}</div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Expected Timeline */}
      <div className="mb-8">
        <h2 className="mb-6">What to Expect: Your 8-Week Timeline</h2>
        <div className="space-y-4">
          {timeline.map((phase, index) => (
            <Card key={index} className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <phase.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">{phase.week}</span>
                    <Separator className="flex-1" />
                  </div>
                  <h3 className="mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-8">
        <h2 className="mb-6">How to Use Your Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {usageSteps.map((step) => (
            <Card key={step.step} className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="mb-2">Step {step.step}</div>
              <h3 className="mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Expectations */}
      <div className="mb-8">
        <h2 className="mb-6">Important: Set Realistic Expectations</h2>
        <div className="space-y-4">
          {expectations.map((expectation, index) => (
            <Card 
              key={index} 
              className={`p-6 border-l-4 ${
                expectation.type === 'success' ? 'border-l-green-500' :
                expectation.type === 'warning' ? 'border-l-yellow-500' :
                'border-l-blue-500'
              }`}
            >
              <div className="flex gap-4">
                <expectation.icon className={`w-6 h-6 shrink-0 ${
                  expectation.type === 'success' ? 'text-green-500' :
                  expectation.type === 'warning' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <h3 className="mb-2">{expectation.title}</h3>
                  <p className="text-sm text-muted-foreground">{expectation.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <Card className="p-8 bg-accent border-0 text-center">
        <h2 className="mb-4">Ready to Start Your Transformation?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          By proceeding, you understand that results take time and commitment. Follow the routine, be patient, and watch your hair transform over the next 8 weeks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={onBack}>
            Review Products
          </Button>
          <Button onClick={onProceedToCheckout} size="lg" className="px-8">
            I Understand, Proceed to Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}
