import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { HairType } from "./HairTypeSelector";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  recommended: boolean;
}

interface ProductRecommendationsProps {
  hairType: HairType;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  cartItems: string[];
}

const productsByHairType: Record<HairType, Product[]> = {
  curly: [
    {
      id: "curl-1",
      name: "Curl Defining Cream",
      description: "Enhanced curl definition with long-lasting hold and moisture",
      price: 28.99,
      stock: 3,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: true,
    },
    {
      id: "curl-2",
      name: "Hydrating Hair Mask",
      description: "Deep conditioning treatment for soft, bouncy curls",
      price: 34.99,
      stock: 5,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: true,
    },
    {
      id: "curl-3",
      name: "Leave-In Conditioner",
      description: "Lightweight moisture and frizz control for curly hair",
      price: 24.99,
      stock: 0,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: false,
    },
  ],
  straight: [
    {
      id: "straight-1",
      name: "Volume Boost Shampoo",
      description: "Adds body and lift to fine, straight hair",
      price: 26.99,
      stock: 4,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: true,
    },
    {
      id: "straight-2",
      name: "Shine Serum",
      description: "Lightweight formula for glossy, healthy-looking hair",
      price: 32.99,
      stock: 2,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: true,
    },
    {
      id: "straight-3",
      name: "Root Lifter Spray",
      description: "Creates volume and texture at the roots",
      price: 22.99,
      stock: 6,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: false,
    },
  ],
  frizzy: [
    {
      id: "frizz-1",
      name: "Anti-Frizz Smoothing Cream",
      description: "Controls frizz and flyaways for up to 72 hours",
      price: 29.99,
      stock: 3,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: true,
    },
    {
      id: "frizz-2",
      name: "Keratin Treatment Mask",
      description: "Professional-grade smoothing treatment for salon results",
      price: 38.99,
      stock: 1,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: true,
    },
    {
      id: "frizz-3",
      name: "Heat Protection Spray",
      description: "Shields hair from heat damage while reducing frizz",
      price: 24.99,
      stock: 5,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: false,
    },
  ],
  afro: [
    {
      id: "afro-1",
      name: "Deep Moisture Butter",
      description: "Rich, nourishing formula for textured and coily hair",
      price: 31.99,
      stock: 2,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: true,
    },
    {
      id: "afro-2",
      name: "Coil Enhancing Gel",
      description: "Defines and holds natural coils without flaking",
      price: 27.99,
      stock: 4,
      image: "https://images.unsplash.com/photo-1646457417210-ec6afe2fa124?w=400",
      recommended: true,
    },
    {
      id: "afro-3",
      name: "Protective Oil Blend",
      description: "Seals in moisture and adds natural shine",
      price: 25.99,
      stock: 0,
      image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      recommended: false,
    },
  ],
};

export function ProductRecommendations({
  hairType,
  onAddToCart,
  onBack,
  cartItems,
}: ProductRecommendationsProps) {
  const products = productsByHairType[hairType];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">Personalized for your hair type</span>
        </div>
        <h2 className="mb-2">Your Recommended Products</h2>
        <p className="text-muted-foreground">
          Based on your hair type, here are our expert recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => {
          const isInCart = cartItems.includes(product.id);
          const isOutOfStock = product.stock === 0;
          const isLowStock = product.stock > 0 && product.stock <= 3;

          return (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.recommended && (
                  <Badge className="absolute top-3 left-3 bg-primary">
                    Recommended
                  </Badge>
                )}
                {isLowStock && !isOutOfStock && (
                  <Badge
                    variant="destructive"
                    className="absolute top-3 right-3"
                  >
                    Only {product.stock} left!
                  </Badge>
                )}
                {isOutOfStock && (
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3"
                  >
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg">${product.price}</span>
                  <Button
                    onClick={() => onAddToCart(product)}
                    disabled={isOutOfStock || isInCart}
                    size="sm"
                  >
                    {isInCart ? (
                      "Added"
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
