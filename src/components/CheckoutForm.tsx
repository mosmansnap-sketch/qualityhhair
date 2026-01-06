import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Lock, User, CreditCard, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from './ProductRecommendations';
import { StripePayment } from './StripePayment';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: (orderData: OrderData) => void;
}

// Initialize Stripe with environment variable
// Set VITE_STRIPE_PUBLISHABLE_KEY in Netlify environment variables
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

interface OrderData {
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    sameAsShipping: boolean;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderTotal: number;
  paymentIntentId?: string;
}

export function CheckoutForm({ items, onBack, onComplete }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderData>({
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    billingAddress: {
      sameAsShipping: true,
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    orderTotal: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 600 ? 0 : 9.99; // Free shipping over €600
  const total = subtotal + tax + shipping;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Customer info validation
      if (!formData.customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.customerInfo.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerInfo.email)) newErrors.email = 'Invalid email format';
      if (!formData.customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      // Shipping address validation
      if (!formData.shippingAddress.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.shippingAddress.city.trim()) newErrors.city = 'City is required';
      if (!formData.shippingAddress.state.trim()) newErrors.state = 'State is required';
      if (!formData.shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (!/^\d{5}(-\d{4})?$/.test(formData.shippingAddress.zipCode)) newErrors.zipCode = 'Invalid ZIP code format';
    }

    if (step === 3) {
      // Payment validation handled by Stripe
      return true; // Validation is handled by Stripe component
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: keyof OrderData, field: string, value: any) => {
    if (section === 'customerInfo') {
      setFormData(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [field]: value
        }
      }));
    } else if (section === 'shippingAddress') {
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else if (section === 'billingAddress') {
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        // For payment step, we don't complete here - Stripe handles it
        return;
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };


  const renderCustomerInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Customer Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.customerInfo.firstName}
              onChange={(e) => handleInputChange('customerInfo', 'firstName', e.target.value)}
              placeholder="John"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.customerInfo.lastName}
              onChange={(e) => handleInputChange('customerInfo', 'lastName', e.target.value)}
              placeholder="Doe"
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.customerInfo.email}
            onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
            placeholder="john.doe@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.customerInfo.phone}
            onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
            placeholder="(555) 123-4567"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </motion.div>
  );

  const renderShippingAddress = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-4 flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Shipping Address
        </h3>
        <div>
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            value={formData.shippingAddress.street}
            onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
            placeholder="123 Main Street"
            className={errors.street ? 'border-red-500' : ''}
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.shippingAddress.city}
              onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
              placeholder="New York"
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={formData.shippingAddress.state}
              onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
              placeholder="NY"
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            value={formData.shippingAddress.zipCode}
            onChange={(e) => handleInputChange('shippingAddress', 'zipCode', e.target.value)}
            placeholder="10001"
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
        <div className="mt-4">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.shippingAddress.country}
            onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
            placeholder="United States"
            disabled
          />
        </div>
      </div>
    </motion.div>
  );

  const handleStripePaymentSuccess = (paymentIntentId: string) => {
    // Complete the order with payment intent ID
    onComplete({
      ...formData,
      orderTotal: total,
      paymentIntentId
    });
  };

  const handleStripePaymentError = (error: string) => {
    // Handle payment error - could show toast or error state
    console.error('Payment failed:', error);
  };

  const renderPaymentInfo = () => (
    <Elements stripe={stripePromise}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Information
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-green-800 text-sm font-medium">Secure Payment - SSL Encrypted</span>
            </div>
          </div>

          <StripePayment
            amount={total}
            onSuccess={handleStripePaymentSuccess}
            onError={handleStripePaymentError}
          />
        </div>
      </motion.div>
    </Elements>
  );

  const renderOrderSummary = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (10%)</span>
          <span>€{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={handlePreviousStep} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? 'Back to Cart' : 'Previous Step'}
        </Button>
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${currentStep > step ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>Customer Info</span>
          <span>Shipping</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            {currentStep === 1 && renderCustomerInfo()}
            {currentStep === 2 && renderShippingAddress()}
            {currentStep === 3 && renderPaymentInfo()}
          </Card>
        </div>

        <div className="lg:col-span-1">
          {renderOrderSummary()}

          <div className="mt-6 space-y-4">
            {currentStep !== 3 && (
              <Button
                onClick={handleNextStep}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            )}

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}