import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { PricingSection } from "./components/PricingSection";
import { SocialProofSection } from "./components/SocialProofSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
// ConsultationBooking removed - functionality merged into PricingSection
import { FAQSection } from "./components/FAQSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { CheckoutForm } from "./components/CheckoutForm";
import { HairAnalysisFlow } from "./components/HairAnalysisFlow";
import { WhatsAppChat } from "./components/WhatsAppChat";
import { AboutSection } from "./components/AboutSection";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AnimatedBackground } from "./components/AnimatedBackground";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  inStock: boolean;
  imageUrl?: string;
  image?: string;
  recommended: boolean;
}

export default function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnalysisFlow, setShowAnalysisFlow] = useState(false);

  const handleAddToCart = (product: Product) => {
    // Check if product already in cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      toast.info("This item is already in your cart");
      setShowCart(true);
      return;
    }

    setCartItems([...cartItems, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleCheckoutComplete = (orderData: any) => {
    console.log('Order completed:', orderData);
    // Store order data in localStorage for now
    // In a real app, this would be handled by the backend
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: 1, // Default quantity since Product interface doesn't have quantity
      price: item.price
    }));

    const order = {
      id: `order-${Date.now()}`,
      orderNumber: `QH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
      date: new Date(),
      status: 'processing' as const,
      total: orderData.orderTotal,
      items: orderItems,
      customerInfo: orderData.customerInfo,
      shippingAddress: orderData.shippingAddress,
      carrier: 'Postnode.se' as const,
      trackingHistory: [{
        id: `event-${Date.now()}`,
        timestamp: new Date(),
        status: 'order-placed' as const,
        description: 'Order placed successfully'
      }],
      paymentIntentId: orderData.paymentIntentId,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    };

    // Store in localStorage for demo purposes
    const existingOrders = JSON.parse(localStorage.getItem('quality-hair-orders') || '[]');
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('quality-hair-orders', JSON.stringify(updatedOrders));

    // Clear cart and show success
    setCartItems([]);
    setShowCheckout(false);
    setShowSuccess(true);
    toast.success(`Order ${order.orderNumber} created successfully!`);
  };

  const handleReset = () => {
    setShowSuccess(false);
    setShowAnalysisFlow(false);
    setCartItems([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAnalysisFlow = () => {
    setShowAnalysisFlow(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const navHeight = 80;
      const elementPosition = pricingSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Reset all flows and go back to main page
  const handleNavigate = () => {
    setShowAnalysisFlow(false);
    setShowCheckout(false);
    setShowSuccess(false);
  };

  // Show Success Page
  if (showSuccess) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <CheckoutSuccess onReset={handleReset} />
          <Toaster />
        </div>
      </LanguageProvider>
    );
  }

  // Show Analysis Flow
  if (showAnalysisFlow) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-background relative">
          <AnimatedBackground />

          <Header
            cartCount={cartItems.length}
            onCartClick={() => setShowCart(true)}
            onNavigate={handleNavigate}
          />

          <main className="pb-12">
            <HairAnalysisFlow
              onComplete={(results) => {
                // Convert analysis results to product and add to cart
                const product: Product = {
                  id: "analysis-product-" + Date.now(),
                  name: results.bottleSize,
                  price: parseFloat(results.price.replace('€', '').replace('$', '')),
                  description: results.description,
                  stock: 5,
                  inStock: true,
                  imageUrl: "https://images.unsplash.com/photo-1739949154765-f2a23bdfa3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjA4MDExMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                  recommended: true
                };
                handleAddToCart(product);
                setShowAnalysisFlow(false);
                setShowCart(true);
              }}
            />
          </main>

          {showCart && (
            <ShoppingCart
              items={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
            />
          )}

          <Toaster />
        </div>
      </LanguageProvider>
    );
  }

  // Show Checkout Flow
  if (showCheckout) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-background relative">
          <AnimatedBackground />

          <Header
            cartCount={cartItems.length}
            onCartClick={() => setShowCart(true)}
            onNavigate={handleNavigate}
          />

          <main className="pb-12">
            <CheckoutForm
              items={cartItems.map(item => ({ ...item, quantity: 1 }))}
              onBack={() => {
                setShowCheckout(false);
                setShowCart(true);
              }}
              onComplete={handleCheckoutComplete}
            />
          </main>

          <Toaster />
        </div>
      </LanguageProvider>
    );
  }

  // Main scrolling page
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />

        <Header
          cartCount={cartItems.length}
          onCartClick={() => setShowCart(true)}
          onNavigate={handleNavigate}
        />

        <main>
          <HeroSection onGetStarted={startAnalysisFlow} onViewPricing={scrollToPricing} />
          <ProblemSolutionSection />
          <HowItWorksSection />
          <BenefitsSection />
          <ComparisonSection />
          <PricingSection onAddToCart={handleAddToCart} />
          <SocialProofSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTASection onGetStarted={startAnalysisFlow} onViewPricing={scrollToPricing} />
          <AboutSection />
          <Footer />
        </main>

        {/* WhatsApp Chat Widget - Replace with your actual WhatsApp number */}
        <WhatsAppChat phoneNumber="31612345678" />

        {showCart && (
          <ShoppingCart
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setShowCart(false)}
            onCheckout={handleCheckout}
          />
        )}

        <Toaster />
      </div>
    </LanguageProvider>
  );
}