// Netlify serverless function for Stripe payment intent creation
// Set STRIPE_SECRET_KEY in Netlify environment variables (Site Settings > Environment Variables)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ 
      error: 'Payment system not configured',
      message: 'Please set STRIPE_SECRET_KEY in environment variables'
    });
  }

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const { amount, currency = 'eur' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // Add metadata here if needed
      metadata: {
        orderId: `order_${Date.now()}`,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      message: error.message
    });
  }
}