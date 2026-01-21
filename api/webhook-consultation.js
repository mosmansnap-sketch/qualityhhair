// Netlify serverless function for Stripe Webhook - Consultation Payment
// Handles successful consultation payments, creates discount codes, sends emails

import { createClient } from '@supabase/supabase-js';

// Generate unique discount code
function generateDiscountCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'QH-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

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

      const consultationDate = new Date(session.metadata.consultationDate);
      const expiresAt = new Date(consultationDate.getTime() + 48 * 60 * 60 * 1000); // +48 hours

      // Create consultation record
      const { data: consultation, error: consultationError } = await supabase
        .from('consultations')
        .insert({
          customer_name: session.metadata.customerName,
          customer_email: session.customer_email,
          customer_phone: session.metadata.customerPhone,
          consultation_date: consultationDate.toISOString(),
          hair_type: session.metadata.hairType,
          concerns: session.metadata.concerns,
          stripe_payment_id: session.payment_intent,
          stripe_session_id: session.id,
          status: 'paid',
        })
        .select()
        .single();

      if (consultationError) {
        console.error('Error creating consultation:', consultationError);
        throw consultationError;
      }

      // Generate unique discount code
      let discountCode;
      let codeExists = true;
      let attempts = 0;
      
      while (codeExists && attempts < 10) {
        discountCode = generateDiscountCode();
        const { data: existing } = await supabase
          .from('discount_codes')
          .select('code')
          .eq('code', discountCode)
          .single();
        codeExists = !!existing;
        attempts++;
      }

      // Create discount code
      const { error: codeError } = await supabase
        .from('discount_codes')
        .insert({
          code: discountCode,
          consultation_id: consultation.id,
          amount: 10.00,
          activation_date: consultationDate.toISOString(),
          expires_at: expiresAt.toISOString(),
          used: false,
        });

      if (codeError) {
        console.error('Error creating discount code:', codeError);
        throw codeError;
      }

      // Send confirmation email via Resend
      if (process.env.RESEND_API_KEY) {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Quality Hair <noreply@qualityhhair.com>',
            to: session.customer_email,
            subject: 'Your Hair Consultation is Confirmed! 🎉',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #C8A97E, #A67C52); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .header h1 { color: white; margin: 0; }
                  .content { background: #fff; padding: 30px; border: 1px solid #eee; }
                  .code-box { background: #f8f5f0; border: 2px dashed #C8A97E; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
                  .code { font-size: 32px; font-weight: bold; color: #A67C52; letter-spacing: 3px; }
                  .details { background: #fafafa; padding: 15px; border-radius: 8px; margin: 20px 0; }
                  .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
                  .button { display: inline-block; background: #C8A97E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 10px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Quality Hair</h1>
                    <p style="color: white; margin: 10px 0 0 0;">Consultation Confirmed</p>
                  </div>
                  <div class="content">
                    <h2>Hi ${session.metadata.customerName}! 👋</h2>
                    <p>Thank you for booking your hair consultation! We're excited to help you on your hair journey.</p>
                    
                    <div class="details">
                      <h3 style="margin-top: 0;">📅 Appointment Details</h3>
                      <p><strong>Date:</strong> ${consultationDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><strong>Time:</strong> ${consultationDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                      <p><strong>Duration:</strong> 10 minutes video call</p>
                    </div>

                    <div class="code-box">
                      <p style="margin: 0 0 10px 0; font-size: 14px;">Your €10 Discount Code</p>
                      <div class="code">${discountCode}</div>
                      <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
                        Valid from ${consultationDate.toLocaleDateString('en-GB')} until ${expiresAt.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <p><strong>💡 How to use your code:</strong></p>
                    <ol>
                      <li>Complete your consultation with our expert</li>
                      <li>If you decide to purchase, enter the code at checkout</li>
                      <li>Get €10 off your order!</li>
                    </ol>

                    <p style="color: #888; font-size: 13px;">
                      <em>Note: This code is valid for 48 hours after your consultation starts and can only be used once.</em>
                    </p>

                    <p>We'll send you a video call link closer to your appointment date.</p>
                    
                    <p>Questions? Reply to this email or message us on WhatsApp.</p>
                    
                    <p>See you soon! 💛<br>The Quality Hair Team</p>
                  </div>
                  <div class="footer">
                    <p>© ${new Date().getFullYear()} Quality Hair. All rights reserved.</p>
                    <p>This email was sent to ${session.customer_email}</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });
          
          console.log('Confirmation email sent to:', session.customer_email);
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          // Don't fail the webhook if email fails
        }
      }

      console.log('Consultation created:', consultation.id, 'Code:', discountCode);

      return res.status(200).json({ 
        received: true, 
        consultationId: consultation.id,
        discountCode,
      });

    } catch (error) {
      console.error('Error processing consultation payment:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Return 200 for other event types
  return res.status(200).json({ received: true });
}
