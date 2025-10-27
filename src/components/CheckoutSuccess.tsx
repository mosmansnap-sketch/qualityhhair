import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

interface CheckoutSuccessProps {
  onReset: () => void;
}

export function CheckoutSuccess({ onReset }: CheckoutSuccessProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Card className="p-12">
        <div className="text-center">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
          </div>
          <h2 className="mb-3">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. Our hair care advisors will review your photos and confirm your personalized recommendations within 24 hours.
          </p>
          <div className="bg-accent/50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-base mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>You'll receive an email confirmation shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Our advisors will analyze your hair photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Your order will ship within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Track your package with the link in your email</span>
              </li>
            </ul>
          </div>
          <Button onClick={onReset} size="lg">
            Start New Order
          </Button>
        </div>
      </Card>
    </div>
  );
}
