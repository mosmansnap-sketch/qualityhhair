import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { ShoppingBag, ArrowLeft, Plus, Minus, Trash2, CreditCard, Package, Truck, Tag, Check, X, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "./ProductRecommendations";
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface DiscountInfo {
  code: string;
  amount: number;
  expiresAt: string;
}

interface ShoppingCartProps {
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClose: () => void;
  onCheckout: (discount?: DiscountInfo) => void;
}


export function ShoppingCart({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClose,
  onCheckout,
}: ShoppingCartProps) {
  // Enhanced cart with quantity support
  const [cartItems, setCartItems] = useState(() =>
    items.map(item => ({ ...item, quantity: 1 }))
  );

  // Discount code state
  const [discountCode, setDiscountCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountInfo | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);

  // Update local state when props change
  useEffect(() => {
    setCartItems(items.map(item => ({ ...item, quantity: 1 })));
  }, [items]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    onRemoveItem(productId);
  };

  // Validate discount code
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Please enter a discount code");
      return;
    }

    setIsValidating(true);
    setDiscountError(null);

    try {
      const response = await fetch('/api/validate-discount-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode.trim() }),
      });

      const data = await response.json();

      if (data.valid) {
        setAppliedDiscount(data.discount);
        setDiscountError(null);
        toast.success(`Discount applied! €${data.discount.amount} off your order`);
      } else {
        setDiscountError(data.error || "Invalid discount code");
        setAppliedDiscount(null);
      }
    } catch (error) {
      console.error('Error validating discount code:', error);
      setDiscountError("Failed to validate code. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  // Remove applied discount
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountError(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal >= 500 ? 0 : 12; // Free shipping over €500 (Sweden rate as estimate)
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const total = Math.max(0, subtotal + tax + shipping - discountAmount);

  if (items.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Card className="p-12">
          <div className="text-center">
            <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Button onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onClose} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        <h2>Shopping Cart</h2>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
            >
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-base mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        {item.recommended && (
                          <Badge variant="secondary" className="mt-1">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item.id)}
                        className="flex-shrink-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-medium">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            €{item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Order Summary</h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping === 0 ? (
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Free shipping on orders over €500
                </div>
              ) : (
                <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  Estimate for Sweden • Final cost at checkout based on your country
                </div>
              )}

              {/* Discount Code Section */}
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Discount Code</span>
                </div>

                <AnimatePresence mode="wait">
                  {appliedDiscount ? (
                    <motion.div
                      key="applied"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                          {appliedDiscount.code}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Enter code"
                        value={discountCode}
                        onChange={(e) => {
                          setDiscountCode(e.target.value.toUpperCase());
                          setDiscountError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyDiscount();
                          }
                        }}
                        className={`flex-1 uppercase ${discountError ? 'border-red-300' : ''}`}
                        disabled={isValidating}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleApplyDiscount}
                        disabled={isValidating || !discountCode.trim()}
                        className="px-3"
                      >
                        {isValidating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {discountError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500"
                  >
                    {discountError}
                  </motion.p>
                )}

                <p className="text-xs text-muted-foreground">
                  Had a consultation? Enter your discount code here.
                </p>
              </div>

              {/* Discount Applied */}
              {appliedDiscount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex justify-between text-sm text-green-600"
                >
                  <span>Consultation Discount</span>
                  <span>-€{appliedDiscount.amount.toFixed(2)}</span>
                </motion.div>
              )}

              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <div className="text-right">
                  {appliedDiscount && (
                    <span className="text-sm text-muted-foreground line-through mr-2">
                      €{(subtotal + tax + shipping).toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={() => onCheckout(appliedDiscount || undefined)}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-3 w-3" />
                <span>Fast delivery within 2-3 business days</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-green-600">✓</span>
                <span>Secure checkout with multiple payment options</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
