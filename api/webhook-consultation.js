// Netlify serverless function for Stripe Webhook - Consultation Payment
// Handles successful consultation payments
// Note: Discount code generation and email sending happens after Calendly booking (via Calendly webhook)

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  try {
    // Verify webhook signature
    if (webhookSecret) {
      const sig = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // For testing without signature verification
      event = req.body;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Only process consultation payments
    if (session.metadata?.type !== 'consultation') {
      return res.status(200).json({ received: true, message: 'Not a consultation payment' });
    }

    try {
      // Initialize Supabase
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Create consultation record - consultation_date will be NULL until Calendly booking happens
      // Discount code and email will be generated after Calendly booking (via Calendly webhook)
      const { data: consultation, error: consultationError } = await supabase
        .from('consultations')
        .insert({
          customer_name: session.metadata.customerName,
          customer_email: session.customer_email,
          customer_phone: session.metadata.customerPhone,
          consultation_date: null, // Will be set when Calendly booking happens
          hair_type: session.metadata.hairType || '',
          concerns: session.metadata.concerns || '',
          notes: session.metadata.additionalNotes || '',
          stripe_payment_id: session.payment_intent,
          stripe_session_id: session.id,
          status: 'paid', // Payment received, but booking pending
        })
        .select()
        .single();

      if (consultationError) {
        console.error('Error creating consultation:', consultationError);
        throw consultationError;
      }

      console.log('Consultation payment received:', consultation.id, 'Waiting for Calendly booking...');

      return res.status(200).json({ 
        received: true, 
        consultationId: consultation.id,
        message: 'Payment received. Waiting for Calendly booking to generate discount code.',
      });

    } catch (error) {
      console.error('Error processing consultation payment:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Return 200 for other event types
  return res.status(200).json({ received: true });
}
