// Netlify serverless function for Consultation Checkout Session
// Creates a Stripe Checkout session for €10 consultation fee

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const { 
      customerName, 
      customerEmail, 
      customerPhone,
      hairType,
      concerns,
      additionalNotes,
      successUrl,
      cancelUrl 
    } = req.body;

    if (!customerEmail || !customerName) {
      return res.status(400).json({ error: 'Missing required fields: email and name are required' });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Hair Consultation - €10',
              description: '10-minute video consultation with our hair expert. You will book your preferred time slot after payment.',
              images: ['https://qualityhhair.com/images/consultation.png'],
            },
            unit_amount: 1000, // €10.00 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'consultation',
        customerName,
        customerPhone: customerPhone || '',
        hairType: hairType || '',
        concerns: concerns || '',
        additionalNotes: additionalNotes || '',
        // consultationDate will be set when Calendly booking happens
      },
      success_url: successUrl || `${req.headers.origin}/consultation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/#consultation`,
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating consultation checkout:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message
    });
  }
}
