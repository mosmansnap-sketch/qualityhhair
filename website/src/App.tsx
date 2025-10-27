import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { ProblemSolutionSection } from "./sections/ProblemSolutionSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { ComparisonSection } from "./sections/ComparisonSection";
import { PricingSection } from "./sections/PricingSection";
import { SocialProofSection } from "./sections/SocialProofSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ConsultationBooking } from "./components/ConsultationBooking";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";
import { Footer } from "./components/Footer";
import { ShoppingCart } from "./components/ShoppingCart";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { HairAnalysisFlow } from "./components/HairAnalysisFlow";
import { WhatsAppChat } from "./components/WhatsAppChat";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AnimatedBackground } from "./components/AnimatedBackground";
import "./styles/globals.css";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  inStock: boolean;
  imageUrl?: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
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

  const handleCheckout = () => {
    setShowCart(false);
    setShowSuccess(true);
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
            onCartClick={() => {
              if (cartItems.length === 0) {
                toast.error("Your cart is empty!");
                return;
              }
              setShowCart(true);
            }} 
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
                  imageUrl: "https://images.unsplash.com/photo-1739949154765-f2a23bdfa3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGFpciUyMGNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjA4MDExMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
            />
          )}

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
          onCartClick={() => {
            if (cartItems.length === 0) {
              toast.error("Your cart is empty!");
              return;
            }
            setShowCart(true);
          }} 
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
          <ConsultationBooking />
          <FAQSection />
          <FinalCTASection onGetStarted={startAnalysisFlow} onViewPricing={scrollToPricing} />
          <Footer />
        </main>

        {/* WhatsApp Chat Widget - Replace with your actual WhatsApp number */}
        <WhatsAppChat phoneNumber="31612345678" />

        {showCart && (
          <ShoppingCart
            items={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onClose={() => setShowCart(false)}
            onCheckout={handleCheckout}
          />
        )}

        <Toaster />
      </div>
    </LanguageProvider>
  );
}
