// Netlify serverless function for Calendly Webhook
// Handles Calendly booking confirmations, generates discount codes, sends emails

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

  // Verify Calendly webhook (optional - you can add signature verification)
  // For now, we'll trust the webhook if it comes from Calendly
  const calendlyWebhookSecret = process.env.CALENDLY_WEBHOOK_SECRET;

  try {
    const event = req.body;

    // Calendly sends different event types: invitee.created, invitee.canceled, etc.
    // We only care about invitee.created (booking confirmed)
    if (event.event !== 'invitee.created') {
      return res.status(200).json({ received: true, message: 'Event type not handled' });
    }

    const invitee = event.payload?.invitee;
    const eventDetails = event.payload?.event_type;
    const scheduledEvent = event.payload?.scheduled_event;

    if (!invitee || !scheduledEvent) {
      return res.status(400).json({ error: 'Missing required Calendly data' });
    }

    const customerEmail = invitee.email;
    const consultationDate = new Date(scheduledEvent.start_time);
    const expiresAt = new Date(consultationDate.getTime() + 48 * 60 * 60 * 1000); // +48 hours

    // Initialize Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Find consultation by email (most recent paid consultation without a date)
    const { data: consultation, error: consultationError } = await supabase
      .from('consultations')
      .select('*')
      .eq('customer_email', customerEmail)
      .eq('status', 'paid')
      .is('consultation_date', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (consultationError || !consultation) {
      console.error('Error finding consultation:', consultationError);
      // If no consultation found, log but don't fail (might be a direct Calendly booking)
      return res.status(200).json({ 
        received: true, 
        message: 'No matching consultation found for this email',
        email: customerEmail 
      });
    }

    // Update consultation with actual booking date
    const { error: updateError } = await supabase
      .from('consultations')
      .update({
        consultation_date: consultationDate.toISOString(),
        status: 'completed', // or keep as 'paid' and add 'booked' status
        notes: consultation.notes 
          ? `${consultation.notes}\n\nCalendly booking confirmed: ${scheduledEvent.name || 'Consultation'}`
          : `Calendly booking confirmed: ${scheduledEvent.name || 'Consultation'}`,
      })
      .eq('id', consultation.id);

    if (updateError) {
      console.error('Error updating consultation:', updateError);
      throw updateError;
    }

    // Check if discount code already exists for this consultation
    const { data: existingCode } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('consultation_id', consultation.id)
      .single();

    let discountCode;

    if (existingCode) {
      // Use existing code
      discountCode = existingCode.code;
    } else {
      // Generate unique discount code
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
    }

    // Send confirmation email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Quality Hair <noreply@qualityhhair.com>',
          to: customerEmail,
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
                  <h2>Hi ${consultation.customer_name}! 👋</h2>
                  <p>Thank you for booking your hair consultation! We're excited to help you on your hair journey.</p>
                  
                  <div class="details">
                    <h3 style="margin-top: 0;">📅 Appointment Details</h3>
                    <p><strong>Date:</strong> ${consultationDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Time:</strong> ${consultationDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p><strong>Duration:</strong> 10 minutes video call</p>
                    ${scheduledEvent.location?.location ? `<p><strong>Location:</strong> ${scheduledEvent.location.location}</p>` : ''}
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

                  ${scheduledEvent.location?.location && scheduledEvent.location.location.includes('zoom') ? 
                    `<p><strong>Video Call Link:</strong> You'll receive the Zoom link in a separate email from Calendly.</p>` :
                    `<p>We'll send you a video call link closer to your appointment date.</p>`
                  }
                  
                  <p>Questions? Reply to this email or message us on WhatsApp.</p>
                  
                  <p>See you soon! 💛<br>The Quality Hair Team</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Quality Hair. All rights reserved.</p>
                  <p>This email was sent to ${customerEmail}</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        
        console.log('Confirmation email sent to:', customerEmail);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the webhook if email fails
      }
    }

    console.log('Calendly booking processed:', consultation.id, 'Code:', discountCode);

    return res.status(200).json({ 
      received: true, 
      consultationId: consultation.id,
      discountCode,
      consultationDate: consultationDate.toISOString(),
    });

  } catch (error) {
    console.error('Error processing Calendly webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}
