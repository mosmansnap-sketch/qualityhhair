# Stripe Payment Integration Setup

This guide explains how to set up Stripe payment processing for the Quality Hair e-commerce website.

## Prerequisites

1. **Stripe Account**: Sign up at https://stripe.com if you don't have one
2. **API Keys**: Get your publishable and secret keys from the Stripe Dashboard

## Installation

The Stripe packages are already installed:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Configuration

### 1. Environment Variables

Copy `.env.example` to `.env` and add your Stripe keys:

```bash
cp .env.example .env
```

Edit `.env` and replace with your actual Stripe keys:
```
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 2. Update CheckoutForm Component

In `src/components/CheckoutForm.tsx`, update the Stripe initialization:

```typescript
// Replace this line with your actual publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key_here');
```

Change to:
```typescript
const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');
```

### 3. Backend API Setup

For production, you need a backend API endpoint. The `api/create-payment-intent.js` file shows the basic structure.

For Vercel deployment, create `api/create-payment-intent.ts`:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: {
        orderId: `order_${Date.now()}`,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error.message
    });
  }
}
```

## Testing

### Test Cards

Use these test card numbers in development:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`
- **Insufficient Funds**: `4000 0000 0000 9995`

Use any future expiry date and any 3-digit CVC.

### Test Flow

1. Add products to cart
2. Click "Proceed to Checkout"
3. Fill in customer information
4. Enter shipping address
5. Enter payment details using test card
6. Complete order

## Features Implemented

✅ **Shopping Cart Enhancements**
- Quantity controls with +/- buttons
- Real-time price calculations
- Shipping cost calculation (free over $100)
- Tax calculation (10%)
- Order summary with detailed breakdown

✅ **Checkout Form**
- Multi-step checkout process
- Customer information validation
- Shipping address validation
- Stripe payment integration
- Responsive design

✅ **Stripe Integration**
- Secure payment processing
- Payment intent creation
- Error handling
- Loading states
- SSL encryption indicators

## Security Features

- All card details are handled by Stripe (PCI compliant)
- SSL encryption indicators
- Input validation on all forms
- Error handling for payment failures

## Production Deployment

1. **Set up your backend API** with proper CORS configuration
2. **Configure environment variables** in your hosting platform
3. **Test with real cards** (not test cards) in production
4. **Set up Stripe webhooks** for order fulfillment
5. **Configure email notifications** for order confirmations

## Troubleshooting

### Common Issues

1. **"No such payment_intent"**: Check your Stripe secret key configuration
2. **CORS errors**: Ensure your backend allows requests from your frontend domain
3. **Payment failures**: Check Stripe dashboard for detailed error logs

### Debug Mode

Enable Stripe debug logging by adding this to your checkout component:
```typescript
const stripePromise = loadStripe(publishableKey, {
  betas: ['payment_intent_beta_3'],
  apiVersion: '2020-08-27',
});
```

## Next Steps

1. **Add order confirmation emails** using Stripe webhooks
2. **Implement inventory management** to prevent overselling
3. **Add customer accounts** for order history
4. **Set up shipping calculations** based on location
5. **Add discount codes** and promotional features

## Support

For Stripe-specific issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Stripe Discord: https://stripe.com/go/developer-chat

For this implementation:
- Check the browser console for detailed error messages
- Verify all environment variables are set correctly
- Ensure your backend API is accessible from the frontend